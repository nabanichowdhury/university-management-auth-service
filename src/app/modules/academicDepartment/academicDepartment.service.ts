import { paginationHelper } from '../../../helper/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import { academicDepartmentsFilterableField } from './academicDepartment.constants';
import {
  IAcademicDepartment,
  IAcademicDepartmentFilters,
} from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartment = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment> => {
  const result = (await AcademicDepartment.create(payload)).populate(
    'academicFaculty'
  );
  return result;
};

const getAllDepartments = async (
  filters: IAcademicDepartmentFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
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
      $or: academicDepartmentsFilterableField.map(field => ({
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

  const result = await AcademicDepartment.find(whereCondition)
    .populate('academicFaulty')
    .skip(skip)
    .limit(limit);
  const total = await AcademicDepartment.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleDepartmentById = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findById(id);
  return result;
};
const updateDepartment = async (
  id: string,
  payload: Partial<IAcademicDepartment>
): Promise<IAcademicDepartment | null> => {
  //1st=>if u have to update then give both(code and title)=>route level validation
  //2nd=>u have to run a mapper to see whather the mapping of the code and title is valid or not
  // if (payload.title && payload.code && academicDepartmentTitleCodeMapper[payload.title] !== payload.code) {
  //   throw new ApiError(status.BAD_REQUEST, 'Invalid Department Code');
  // }
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  );
  return result;
};
const deleteDepartment = async (
  id: string
): Promise<IAcademicDepartment | null> => {
  const result = await AcademicDepartment.findByIdAndDelete(id);
  return result;
};

export const AcademicDepartmentService = {
  createAcademicDepartment,
  getAllDepartments,
  getSingleDepartmentById,
  updateDepartment,
  deleteDepartment,
};
