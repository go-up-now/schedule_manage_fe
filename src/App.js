import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate , useLocation } from "react-router-dom";
import "./App.css";
import SideBar from "./component/SideBar";
import Header from "./component/Header";
import Footer from "./component/Footer.jsx";
import { getRoleFromToken } from "./api/DecodeToken.js"; 
import { introspect } from "./api/Authentication.js";

import Login from "./common/login/Login.jsx";
import EventDescription from "./common/event-description/EventDescription.jsx";
import PersonalInformation from "./common/personal-information/PersonalInformation.jsx";

import StudySchedule from "./student/study-schedule/StudySchedule.jsx";
import ExamSchedule from "./student/exam-schedule/ExamSchedule.jsx";
import CurrentSubject from "./student/current-subject/CurrentSubject.jsx";
import ChangeSchedule from "./student/current-subject/ChangeSchedule.jsx";
import RegisterSubject from "./student/register-subject/RegisterSubject.jsx";
import HomePage from "./student/home-page/HomePage.jsx";
import StudyHistory from "./student/study-history/StudyHistory.jsx";
import FindSubject from "./student/find-subject/FindSubject.jsx";
import Calendar from "./student/calendar/Calendar.jsx";

import HomePageInstructor from "./instructor/home-page/HomePageInstructor.jsx";
import TeachDay from "./instructor/teach-day/TeachDay.jsx";
import CheckAttendance from "./instructor/check-attendance/CheckAttendance.jsx";
import StudentList from "./instructor/student-list/StudentList.jsx";
import FindSubjectInstructor from "./instructor/find-subject/FindSubjectInstructor.jsx";
import OffedReplace from "./instructor/offed-replace/OffedReplace.jsx";
import TeachManage from "./instructor/teach-manage/TeachManage.jsx";
import ExamArrange from "./instructor/exam-arrange/ExamArrange.jsx";

import Statistic from "./admin/statistics/Statistic.jsx";
import ClassManage from "./admin/class-manage/ClassManage.jsx";
import TestdayManage from "./admin/testday-manage/TestdayManage.jsx";
import StudentManage from "./admin/student-manage/StudentManage.jsx";
import ScheduleManage from "./admin/schedule-manage/ScheduleManage.jsx";
import SemesterManage from "./admin/semester-manage/SemesterManage.jsx";


function App() {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location.pathname === "/login") return;
    const checkToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Vui lòng đăng nhập.");
        navigate("/login");
        return;
      }
      const introspectResponse = await introspect(token);
        if (!introspectResponse?.data?.valid) {
          alert("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }
        const role = getRoleFromToken();
        setUserRole(role);
    };

    checkToken(); 
  }, [navigate,location.pathname]); 

  return (
      <div className="flex">
        <SideBar userRole={userRole} />
        <div className="flex-1 h-full">
          <Header userRole={userRole} />
          <div className="mt-1 pt-[69px] px-4 md:pt-0">
            <Routes>
               {/* Redirect mặc định sang login */}
               <Route path="/" element={<Navigate to="/login" />} />
              {/* Common */}
              <Route path="/login" element={<Login />} />           

              {/* Student */}
              {userRole === "ROLE_STUDENT" && (
                <>
                  <Route path="/student/home" element={<HomePage />} />
                  <Route path="/event/:title" element={<EventDescription />} />
                  <Route path="/person-info/" element={<PersonalInformation />} />
                  <Route path="/student/study-schedule" element={<StudySchedule />} />
                  <Route path="/student/exam-schedule" element={<ExamSchedule />} />
                  <Route path="/student/current-subject" element={<CurrentSubject />} />
                  <Route path="/student/change-schedule" element={<ChangeSchedule />} />
                  <Route path="/student/register-subject" element={<RegisterSubject />} />
                  <Route path="/student/study-history" element={<StudyHistory />} />
                  <Route path="/student/calendar" element={<Calendar />} />
                  <Route path="/student/find-subject" element={<FindSubject />} />
                </>
              )}

              {/* Instructor */}
              {userRole === "ROLE_INSTRUCTOR" && (
                <>
                  <Route path="/instructor/home" element={<HomePageInstructor />} />
                  <Route path="/event/:title" element={<EventDescription />} />
                  <Route path="/instructor/teach-day" element={<TeachDay />} />
                  <Route path="/instructor/check-attendance/:code/:clazz" element={<CheckAttendance />} />
                  <Route path="/instructor/student-list/:code/:clazz" element={<StudentList />} />
                  <Route path="/instructor/find-subject" element={<FindSubjectInstructor />} />
                  <Route path="/instructor/teach-manage" element={<TeachManage />} />
                  <Route path="/instructor/offed-replace" element={<OffedReplace />} />
                  <Route path="/instructor/exam-arrange/:code/:clazz" element={<ExamArrange />} />
                </>
              )}

              {/* Admin */}
              {userRole === "ROLE_ADMIN" && (
                <>
                  <Route path="/admin/statistics" element={<Statistic />} />
                  <Route path="/admin/class-manage" element={<ClassManage />} />
                  <Route path="/admin/testday-manage" element={<TestdayManage />} />
                  <Route path="/admin/student-manage" element={<StudentManage />} />
                  <Route path="/admin/schedule-manage" element={<ScheduleManage />} />
                  <Route path="/admin/semester-manage" element={<SemesterManage />} />
                </>
              )}
            </Routes>
          </div>
          <Footer />
        </div>
      </div>
  );
}

export default App;
