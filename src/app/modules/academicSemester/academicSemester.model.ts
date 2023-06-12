import status from 'http-status';
import { Schema, model } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { academicSemesterMonth } from './academicSemester.constants';
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academicSemester.interface';

const academicSemesterSchema = new Schema<
  IAcademicSemester,
  AcademicSemesterModel
>(
  {
    title: { type: String, required: true, enum: ['Spring', 'Autumn', 'Fall'] },
    year: { type: Number, required: true },
    code: { type: String, required: true, enum: ['01', '02', '03'] },
    startMonth: { type: String, required: true, enum: academicSemesterMonth },
    endMonth: { type: String, required: true, enum: academicSemesterMonth },
  },
  {
    timestamps: true,
  }
);
//handling same year and same semester

academicSemesterSchema.pre('save', async function (next) {
  const isExist = await AcademicSemester.findOne({
    title: this.title,
    year: this.year,
  });
  if (isExist) {
    throw new ApiError(status.CONFLICT, 'Academic semester already exist');
  }
  next();
});

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
);
