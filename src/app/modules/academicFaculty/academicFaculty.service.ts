import { paginationHelper } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { academicFacultiesFilterableField } from './academicFaculty.constants';
import {
  IAcademicFaculty,
  IAcademicFacultyFilters,
} from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

const createAcademicFaculty = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllFaculties = async (
  filters: IAcademicFacultyFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  const { searchTerm, ...filteredData } = filters;

  const regex = new RegExp(searchTerm, 'i');
  //   const andConditions=[
  //     {
  //       $or:[
  //         {
  //           title:{
  //             $regex:regex,
  //
  //           },
  //         },
  //         {
  //           code:{
  //             $regex:regex,
  //
  //           },
  //
  //         },
  //         {
  //           year:{
  //             $regex:regex,
  //
  //           },
  //
  //         }
  //       ]
  //     }
  //   ]

  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: academicFacultiesFilterableField.map(field => ({
        [field]: {
          $regex: regex,
        },
      })),
    });
  }
  const whereCondition =
    andConditions.length > 0 ? { $and: andConditions } : {};
  if (Object.keys(filteredData).length) {
    andConditions.push({
      $and: Object.entries(filteredData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const { page, limit, skip } =
    paginationHelper.calculatePagination(paginationOptions);

  //   const sortConditions:{[key:string]:SortOrder}={}
  //   if(sortBy && sortOrder){
  //     sortConditions[sortBy]=sortOrder;
  //   }

  const result = await AcademicFaculty.find(whereCondition)
    .skip(skip)
    .limit(limit);
  const total = await AcademicFaculty.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleFacultyById = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(id);
  return result;
};
const updateFaculty = async (
  id: string,
  payload: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {
  //1st=>if u have to update then give both(code and title)=>route level validation
  //2nd=>u have to run a mapper to see whather the mapping of the code and title is valid or not
  // if (payload.title && payload.code && academicFacultyTitleCodeMapper[payload.title] !== payload.code) {
  //   throw new ApiError(status.BAD_REQUEST, 'Invalid Faculty Code');
  // }
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};
const deleteFaculty = async (id: string): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findByIdAndDelete(id);
  return result;
};

export const AcademicFacultyService = {
  createAcademicFaculty,
  getAllFaculties,
  getSingleFacultyById,
  updateFaculty,
  deleteFaculty,
};
