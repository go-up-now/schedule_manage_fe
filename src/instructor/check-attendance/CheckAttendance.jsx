import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Table from "../../component/Table";
import Button from "../../component/Button";
import "./checkAttendance.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { getAllStudentbyClazzId } from "../../api/Student";
import Container from "../../component/Container.tsx";
import TitleHeader from "../../component/TitleHeader.tsx";
import {
  markAttendance,
  getAttendanceByClazzId,
  updateAttendance,
} from "../../api/Attendance.js";
import avatar from "../../images/avatarUser.jpg";
import { toast } from "react-toastify";

function CheckAttendance() {
  const location = useLocation();
  const { item } = location.state || {};

  const headers = ["Mã sinh viên", "Tên sinh viên", "Avatar", "Điểm danh"];
  const baseUrl =
    "https://res.cloudinary.com/dc06mgef2/image/upload/v1731903390/";

  // State for student list and attendance status
  const [studentList, setStudentList] = useState([]);
  const [listNull, setListNull] = useState(false);
  const [listNotNull, setListNotNull] = useState(true);

  // get danh sách khi đã có dữ liệu attenced
  useEffect(() => {
    if (item && item.clazzId && item.scheculeId) {
      getAttendanceByClazzId(item.clazzId, item.scheculeId)
        .then((data) => {
          if (data && data.length > 0) {
            const initializedData = data.map((student) => ({
              ...student,
              isPresent: student.isPresent,
            }));
            setStudentList(initializedData);
          } else {
            setListNull(true);
            setListNotNull(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching attendance:", error);
          setListNull(true);
        });
    }
  }, [item]);

  //get dữ liệu khi chưa có dữ liệu trong attencedance
  useEffect(() => {
    if (listNull && item && item.clazzId) {
      getAllStudentbyClazzId(item.clazzId)
        .then((data) => {
          const initializedData = data.map((student) => ({
            ...student,
            isPresent: false,
          }));
          setStudentList(initializedData);
        })
        .catch((error) => {
          console.error("Error fetching students:", error);
        });
    }
  }, [listNull, item]);

  // Handle checkbox toggle
  const handleToggle = (id) => {
    setStudentList((prevStudents) =>
      prevStudents.map((student) => {
        if (student.studentId === id) {
          return { ...student, isPresent: !student.isPresent };
        }
        return student;
      })
    );
  };

  // Table row rendering function
  const renderRow = (item) => [
    <td key={`item-code-${item.studentId}`} className="p-2 text-lg font-medium">
      {item.studentCode}
    </td>,
    <td key={`item-name-${item.studentId}`} className="p-2 text-lg font-medium">
      {item.studentName || item.fullName}
    </td>,
    <td
      key={`item-avatar-${item.studentId}`}
      className="p-2 px-0 flex items-center justify-center"
    >
      <img
        className="w-[150px] object-cover"
        src={item ? (item.avatar ? baseUrl + item.avatar : avatar) : avatar}
        alt={item.studentName || item.fullName}
      />
    </td>,
    <td key={`item-attendance-${item.studentId}`} className="">
      <div className="flex items-center justify-center min-h-[50px]">
        <div className="relative inline-block w-[80px] mr-2 align-middle select-none">
          <input
            type="checkbox"
            name="toggle"
            id={`item-isPresent-${item.studentId}`}
            className="toggle-checkbox absolute block w-9 h-9 rounded-full bg-white border-4 appearance-none cursor-pointer"
            checked={item.isPresent}
            onChange={() => handleToggle(item.studentId)}
          />
          <label
            htmlFor={`toggle-${item.studentId}`}
            className="toggle-label block overflow-hidden h-9 rounded-full bg-red-500 cursor-pointer"
          ></label>
        </div>
      </div>
    </td>,
  ];

  // Handle attendance submission
  const handleMarkAttendance = () => {
    const attendanceList = studentList.map((student) => ({
      studentId: student.studentId,
      scheduleId: item.scheculeId,
      present: student.isPresent,
    }));

    console.log("Payload to be sent:", attendanceList);

    markAttendance(attendanceList)
      .then((response) => {
        console.log("Attendance marked successfully:", response);
        toast.success("LƯU THÀNH CÔNG");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch((error) => {
        console.error("Error marking attendance:", error);
        toast.error("LƯU THẤT BẠI");
      });
  };

  const handleUpdateAttendance = () => {
    const attendanceList = studentList.map((student) => ({
      studentId: student.studentId,
      scheduleId: item.scheculeId,
      present: student.isPresent,
    }));
    console.log("Payload to be sent:", attendanceList);

    updateAttendance(attendanceList)
      .then((response) => {
        console.log("Attendance updated successfully:", response);
        toast.success("CẬP NHẬT THÀNH CÔNG");
      })
      .catch((error) => {
        console.error("Error updating attendance:", error);
        toast.error("CẬP NHẬT THẤT BẠI");
      });
  };

  return (
    <Container>
      <TitleHeader
        title={`Danh sách lớp id:${item.clazzId} - ${item.code} -${item.scheculeId}`}
      />
      <div className="min-h-[600px]">
        <Table
          DefaultTable={true}
          showOptions={true}
          showSearch={true}
          searchClass="pr-20"
          showSelectBox={true}
          headers={headers}
          renderRow={renderRow}
          data={studentList}
          maxRow={100}
          showTurnPage={false}
        />
        <div className="flex justify-end">
          {listNull && (
            <>
              <Button
                label={
                  <>
                    <FontAwesomeIcon icon={faFloppyDisk} className="mr-2" /> Lưu
                  </>
                }
                className="w-full md:w-[150px] mr-0 md:mr-[60px] bg-blue-400 h-10 p-1 text-white flex justify-center font-medium mt-4"
                onClick={handleMarkAttendance}
              />
            </>
          )}
          {listNotNull && (
            <>
              <Button
                label={
                  <>
                    <FontAwesomeIcon icon={faPenToSquare} className="mr-2" />
                    Cập nhật
                  </>
                }
                className="w-full md:w-[150px] mr-0 md:mr-[60px] bg-blue-400 h-10 p-1 text-white flex justify-center font-medium mt-4"
                onClick={handleUpdateAttendance}
              />
            </>
          )}
        </div>
      </div>
    </Container>
  );
}

export default CheckAttendance;
