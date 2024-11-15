import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";
import "./App.css";
import SideBar from "./component/SideBar";
import Header from "./component/Header";
import Footer from "./component/Footer.jsx";

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

const userAccount = {
  id: 1,
  code: "ps27456",
  name: "Tiểu Bạc Liêu",
  codeUser: "lieutbps27456",
  email: "lieutbps27456@fpt.edu.vn",
  ownEmail: "lieu123@gmail.com",
  gender: "Nam",
  birthday: "22/02/1998",
  phone: "0902888888",
  address: "23 AAABBBCCCC, Q1,P9",
  Specialization: "Công nghệ thông tin",
  major: "Phát triển phần mềm",
  avatar:
    "https://static.vecteezy.com/system/resources/previews/011/459/666/original/people-avatar-icon-png.png",
  role: "student",
};

function App() {
  const userRole = userAccount.role;

  // const [padding, setPadding] = useState("");
  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth <= 783) {
  //       setPadding("pt-[69px]");
  //     } else {
  //       setPadding("");
  //     }
  //   };
  //   window.addEventListener("resize", handleResize);
  //   // Kiểm tra kích thước màn hình khi component được mount
  //   handleResize();
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, [padding]);

  return (
    <BrowserRouter>
      <div className="flex">
        {/* <Route path="/" element={<HomePage />} /> */}
        <SideBar userRole={userRole} user={userAccount} />

        <div className="flex-1 h-full">
          <Header userRole={userRole} user={userAccount} />

          <div className={`mt-1 pt-[69px] px-4 md:pt-0`}>
            <Routes>
              {/* Common */}
              <Route path="/" element={<Login />} />
              <Route path="/event/:title" element={<EventDescription />} />
              <Route
                path="/person-info/:code/:name"
                element={<PersonalInformation user={userAccount} />}
              />

              {/* Student */}

              <Route path="/student/home" element={<HomePage />} />
              <Route
                path="/student/study-schedule"
                element={<StudySchedule user={userAccount} />}
              />
              <Route
                path="/student/exam-schedule"
                element={<ExamSchedule user={userAccount} />}
              />
              <Route
                path="/student/current-subject"
                element={<CurrentSubject user={userAccount} />}
              />
              <Route
                path="/student/change-schedule"
                element={<ChangeSchedule user={userAccount} />}
              />
              <Route
                path="/student/register-subject"
                element={<RegisterSubject user={userAccount} />}
              />
              <Route
                path="/student/study-history"
                element={<StudyHistory user={userAccount} />}
              />
              <Route
                path="/student/calendar"
                element={<Calendar user={userAccount} />}
              />
              <Route
                path="/student/find-subject"
                element={<FindSubject user={userAccount} />}
              />

              {/* Instructor */}
              <Route path="/instructor/home" element={<HomePageInstructor />} />
              <Route
                path="/instructor/teach-day"
                element={<TeachDay user={userAccount} />}
              />
              <Route
                path="/instructor/check-attendance/:code/:clazz"
                element={<CheckAttendance user={userAccount} />}
              />
              <Route
                path="/instructor/student-list/:code/:clazz"
                element={<StudentList user={userAccount} />}
              />
              <Route
                path="/instructor/find-subject"
                element={<FindSubjectInstructor user={userAccount} />}
              />
              <Route
                path="/instructor/teach-manage"
                element={<TeachManage user={userAccount} />}
              />
              <Route
                path="/instructor/offed-replace"
                element={<OffedReplace user={userAccount} />}
              />
              <Route
                path="/instructor/exam-arrange/:code/:clazz"
                element={<ExamArrange user={userAccount} />}
              />

              {/* Admin */}
              <Route path="/admin/statistics" element={<Statistic />} />
              <Route
                path="/admin/class-manage"
                element={<ClassManage user={userAccount} />}
              />
              <Route
                path="/admin/testday-manage"
                element={<TestdayManage user={userAccount} />}
              />
              <Route
                path="/admin/student-manage"
                element={<StudentManage user={userAccount} />}
              />
              <Route
                path="/admin/schedule-manage"
                element={<ScheduleManage user={userAccount} />}
              />
              <Route
                path="/admin/semester-manage"
                element={<SemesterManage user={userAccount} />}
              />
            </Routes>
          </div>

          <Footer />
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
