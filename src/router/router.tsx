import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from '../component/ProtectedRoute.tsx';
import App from "../App.js";
import IF from '../component/IF.tsx';
import { getUserScope } from '../utils/authUtils.ts'
import ErrorPage from "../common/ErrorPage.tsx";
import Login from "../common/login/Login.tsx";
import LogoutPage from '../common/LogoutPage.tsx';
import UnAuthorizedPage from '../common/UnAuthorizedPage.tsx';
import { ROLE } from '../enum/Role.tsx';
import HomePage from "../student/home-page/HomePage";
import HomePageInstructor from "../instructor/home-page/HomePageInstructor";
import EventDescription from "../common/event-description/EventDescription";
import PersonalInformation from "../common/personal-information/PersonalInformation";
import StudySchedule from "../student/study-schedule/StudySchedule";
import ExamSchedule from "../student/exam-schedule/ExamSchedule";
import CurrentSubject from "../student/current-subject/CurrentSubject";
import ChangeSchedule from "../student/current-subject/ChangeSchedule";
import RegisterSubject from "../student/register-subject/RegisterSubject";
import StudyHistory from "../student/study-history/StudyHistory";
import Calendar from "../student/calendar/Calendar";
import FindSubject from "../student/find-subject/FindSubject";
import TeachDay from "../instructor/teach-day/TeachDay";
import CheckAttendance from "../instructor/check-attendance/CheckAttendance";
import StudentList from "../instructor/student-list/StudentList";
import FindSubjectInstructor from "../instructor/find-subject/FindSubjectInstructor";
import TeachManage from "../instructor/teach-manage/TeachManage";
import OffedReplace from "../instructor/offed-replace/OffedReplace";
import ExamArrange from "../instructor/exam-arrange/ExamArrange";
import Statistic from "../admin/statistics/Statistic";
import ClassManage from "../admin/class-manage/ClassManage";
import TestdayManage from "../admin/testday-manage/TestdayManage";
import StudentManage from "../admin/student-manage/StudentManage";
import ScheduleManage from "../admin/schedule-manage/ScheduleManage";
import SemesterManage from "../admin/semester-manage/SemesterManage";

const role = getUserScope();

const router = createBrowserRouter([
  {
    path: "/dang-nhap",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/dang-xuat",
    element: <LogoutPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/unauthorized",
    element: <UnAuthorizedPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/",
    element:
      <ProtectedRoute allowedRoles={[ROLE.ADMIN, ROLE.STUDENT, ROLE.INSTRUCTOR]}>
        <App />
      </ProtectedRoute>,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element:
          <>
            <IF condition={role === ROLE.STUDENT}>
              < ProtectedRoute allowedRoles={[ROLE.STUDENT]} >
                <HomePage />
              </ProtectedRoute>
            </IF>
            <IF condition={role === ROLE.INSTRUCTOR}>
              <ProtectedRoute allowedRoles={[ROLE.INSTRUCTOR]}>
                <HomePageInstructor />
              </ProtectedRoute>
            </IF>
            <IF condition={role === ROLE.ADMIN}>
              <ProtectedRoute allowedRoles={[ROLE.ADMIN]}>
                <Statistic />
              </ProtectedRoute>
            </IF>
          </>
      },
      // {
      //   path: "/thong-tin-ca-nhan",
      //   element:
      //     <>
      //       <IF condition={role === ROLE.STUDENT}>
      //         < ProtectedRoute allowedRoles={[ROLE.STUDENT]} >
      //           <PersonalInformation />
      //         </ProtectedRoute>
      //       </IF>
      //       <IF condition={role === ROLE.INSTRUCTOR}>
      //         <ProtectedRoute allowedRoles={[ROLE.INSTRUCTOR]}>
      //           <PersonalInformation />
      //         </ProtectedRoute>
      //       </IF>
      //       <IF condition={role === ROLE.ADMIN}>
      //         <ProtectedRoute allowedRoles={[ROLE.ADMIN]}>
      //           <PersonalInformation />
      //         </ProtectedRoute>
      //       </IF>
      //     </>
      // },

      // COMMON ROLE
      {
        path: "/event",
        element:
          <ProtectedRoute allowedRoles={[ROLE.STUDENT, ROLE.INSTRUCTOR]}>
            <EventDescription />
          </ProtectedRoute>,
      },

      // STUDENT ROLE
      {
        path: "/thong-tin-ca-nhan",
        element:
          <ProtectedRoute allowedRoles={[ROLE.STUDENT]}>
            <PersonalInformation />
          </ProtectedRoute>,
      },
      {
        path: "/lich-hoc",
        element:
          <ProtectedRoute allowedRoles={[ROLE.STUDENT]}>
            <StudySchedule />
          </ProtectedRoute>,
      },
      {
        path: "/lich-thi",
        element:
          <ProtectedRoute allowedRoles={[ROLE.STUDENT]}>
            <ExamSchedule />
          </ProtectedRoute>,
      },
      {
        path: "/mon-hoc-hien-tai",
        element:
          <ProtectedRoute allowedRoles={[ROLE.STUDENT]}>
            <CurrentSubject />
          </ProtectedRoute>,
      },
      {
        path: "/doi-lich-hoc",
        element:
          <ProtectedRoute allowedRoles={[ROLE.STUDENT]}>
            <ChangeSchedule />
          </ProtectedRoute>,
      },
      {
        path: "/dang-ky-mon-hoc",
        element:
          <ProtectedRoute allowedRoles={[ROLE.STUDENT]}>
            <RegisterSubject />
          </ProtectedRoute>,
      },

      {
        path: "/lich-su-hoc-tap",
        element:
          <ProtectedRoute allowedRoles={[ROLE.STUDENT]}>
            <StudyHistory />
          </ProtectedRoute>,
      },
      {
        path: "/lich",
        element:
          <ProtectedRoute allowedRoles={[ROLE.STUDENT]}>
            <Calendar />
          </ProtectedRoute>,
      },
      {
        path: "/tim-kiem-mon-hoc",
        element:
          <ProtectedRoute allowedRoles={[ROLE.STUDENT]}>
            <FindSubject />
          </ProtectedRoute>
      },

      // INSTRUCTOR ROLE
      {
        path: "/ngay-giang-day",
        element:
          <ProtectedRoute allowedRoles={[ROLE.INSTRUCTOR]}>
            <TeachDay />
          </ProtectedRoute>
      },
      {
        path: "/diem-danh",
        element:
          <ProtectedRoute allowedRoles={[ROLE.INSTRUCTOR]}>
            <CheckAttendance />
          </ProtectedRoute>
      },
      {
        path: "/danh-sach-sinh-vien",
        element:
          <ProtectedRoute allowedRoles={[ROLE.INSTRUCTOR]}>
            <StudentList />
          </ProtectedRoute>
      },
      {
        path: "/tim-mon-hoc",
        element:
          <ProtectedRoute allowedRoles={[ROLE.INSTRUCTOR]}>
            <FindSubjectInstructor />
          </ProtectedRoute>
      },
      {
        path: "/quan-ly-giang-day",
        element:
          <ProtectedRoute allowedRoles={[ROLE.INSTRUCTOR]}>
            <TeachManage />
          </ProtectedRoute>
      },
      {
        path: "/dat-lai-lich-nghi",
        element:
          <ProtectedRoute allowedRoles={[ROLE.INSTRUCTOR]}>
            <OffedReplace />
          </ProtectedRoute>
      },
      {
        path: "/thay-doi-lich-thi",
        element:
          <ProtectedRoute allowedRoles={[ROLE.INSTRUCTOR]}>
            <ExamArrange />
          </ProtectedRoute>
      },

      // ADMIN ROLE
      {
        path: "/quan-ly-lop-hoc",
        element:
          <ProtectedRoute allowedRoles={[ROLE.ADMIN]}>
            <ClassManage />
          </ProtectedRoute>
      },
      {
        path: "/quan-ly-ngay-kiem-tra",
        element:
          <ProtectedRoute allowedRoles={[ROLE.ADMIN]}>
            <TestdayManage />
          </ProtectedRoute>
      },
      {
        path: "/quan-ly-sinh-vien",
        element:
          <ProtectedRoute allowedRoles={[ROLE.ADMIN]}>
            <StudentManage />
          </ProtectedRoute>
      },
      {
        path: "/quan-ly-lich-hoc",
        element:
          <ProtectedRoute allowedRoles={[ROLE.ADMIN]}>
            <ScheduleManage />
          </ProtectedRoute>
      },
      {
        path: "/quan-ly-hoc-ky",
        element:
          <ProtectedRoute allowedRoles={[ROLE.ADMIN]}>
            <SemesterManage />
          </ProtectedRoute>
      },
    ],
  },
]);

export default router;