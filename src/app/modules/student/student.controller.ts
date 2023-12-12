import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import { paginationField } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { studentFilterableFields } from './student.constant';
import { IStudent } from './student.interface';
import { StudentService } from './student.service';

const getAllStudents = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const filters = pick(req.query, studentFilterableFields);

    const paginationOptions = pick(req.query, paginationField);

    const result = await StudentService.getAllStudents(
      filters,
      paginationOptions
    );
    sendResponse<IStudent[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Students Retrieved Successfully ',
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleStudentById = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await StudentService.getSingleStudentById(id);
  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Students Retrieved Successfully ',
    data: result,
  });
});

const updateStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updatedData = req.body;

  const result = await StudentService.updateStudent(id, updatedData);

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student updated successfully !',
    data: result,
  });
});
const deleteStudent = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await StudentService.deleteStudent(id);

  sendResponse<IStudent>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted successfully !',
    data: result,
  });
});

export const StudentController = {
  getAllStudents,
  getSingleStudentById,
  updateStudent,
  deleteStudent,
};
