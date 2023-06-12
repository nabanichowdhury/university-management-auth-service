import { z } from 'zod';
import {
  academicSemesterCode,
  academicSemesterMonth,
  academicSemesterTitle,
} from './academicSemester.constants';

const academicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum([...academicSemesterTitle] as [string, ...string[]], {
      required_error: 'title is required',
    }),
    year: z.number({
      required_error: 'year is required',
    }),
    code: z.enum([...academicSemesterCode] as [string, ...string[]], {
      required_error: 'code is required',
    }),
    startMonth: z.enum([...academicSemesterMonth] as [string, ...string[]], {
      required_error: 'startMonth is required',
    }),
    endMonth: z.enum([...academicSemesterMonth] as [string, ...string[]], {
      required_error: 'endMonth is required',
    }),
  }),
});

export const AcademicSemesterValidation = {
  academicSemesterZodSchema,
};
