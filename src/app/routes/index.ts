import express from 'express';
import { AcademicDepartmentRoutes } from '../modules/academicDepartment/academicDepartment.route';
import { AcademicFacultyRoutes } from '../modules/academicFaculty/academicFaculty.route';
import { AcademicSemesterRoutes } from '../modules/academicSemester/academicSemester.route';
import { AdminRoutes } from '../modules/admin/admin.route';
import { FacultyRoutes } from '../modules/faculty/faculty.route';
import { StudentRoutes } from '../modules/student/student.route';
import { UserRoutes } from '../modules/user/user.route';
import { AuthRoutes } from '../modules/auth/auth.route';
const router = express.Router();

const moduleRoutes = [
  {
    path: '/users/',
    route: UserRoutes,
  },
  {
    path: '/academic-semester/',
    route: AcademicSemesterRoutes,
  },
  {
    path: '/academic-faculty/',
    route: AcademicFacultyRoutes,
  },
  {
    path: '/academic-department/',
    route: AcademicDepartmentRoutes,
  },
  {
    path: '/students/',
    route: StudentRoutes,
  },
  {
    path: '/faculties/',
    route: FacultyRoutes,
  },
  {
    path: '/admins/',
    route: AdminRoutes,
  },
  {
    path: '/auth/',
    route: AuthRoutes,
  },
];
moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
