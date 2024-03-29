import { Model } from 'mongoose';

export type IAcademicFaculty = {
  title: string;
};
export type AcademicFacultyModel = Model<IAcademicFaculty>;
export type IAcademicFacultyFilters = {
  searchTerm?: string;
};
