import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationField } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { academicDepartmentsFilterableField } from './academicDepartment.constants';
import { IAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartmentService } from './academicDepartment.service';

const createAcademicDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...academicDepartment } = req.body;
    const result = await AcademicDepartmentService.createAcademicDepartment(
      academicDepartment
    );

    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'AcademicDepartment is created',
      data: result,
    });
  }
);

const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicDepartmentsFilterableField);

  const paginationOptions = pick(req.query, paginationField);

  const result = await AcademicDepartmentService.getAllDepartments(
    filters,
    paginationOptions
  );
  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Departments Retrieved Successfully ',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleDepartmentById = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const result = await AcademicDepartmentService.getSingleDepartmentById(id);
    sendResponse<IAcademicDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Department Retrieved Successfully ',
      data: result,
    });
  }
);

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await AcademicDepartmentService.updateDepartment(
    id,
    updatedData
  );

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department updated successfully !',
    data: result,
  });
});
const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await AcademicDepartmentService.deleteDepartment(id);

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department deleted successfully !',
    data: result,
  });
});

export const AcademicDepartmentController = {
  createAcademicDepartment,
  getAllDepartments,
  getSingleDepartmentById,
  updateDepartment,
  deleteDepartment,
};
