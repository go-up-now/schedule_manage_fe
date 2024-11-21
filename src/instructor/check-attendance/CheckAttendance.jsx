import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import Table from "../../component/Table";
import Button from "../../component/Button";
import "./checkAttendance.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

function CheckAttendance() {
  const location = useLocation();
  const { item } = location.state || {};

  const headers = ["Mã sinh viên", "Tên sinh viên", "Avatar", "Điểm danh"];
  const students = [
    {
      id: 1,
      code: "PS27456",
      name: "Liêu Vinh Phát",
      avatar:
        "https://th.bing.com/th/id/OIP.aVtwt9w8L6NUC38XQ3HaSgHaHa?rs=1&pid=ImgDetMain",
    },
    {
      id: 2,
      code: "PS27430",
      name: "Ngô Thị Đức Nhu",
      avatar:
        "https://img.freepik.com/premium-vector/flat-design-enterpreneur-business-woman_990404-7747.jpg",
      coMat: false,
    },
    {
      id: 3,
      code: "PS27619",
      name: "Nguyễn Trung Hiếu",
      avatar:
        "https://th.bing.com/th/id/OIP.aVtwt9w8L6NUC38XQ3HaSgHaHa?rs=1&pid=ImgDetMain",
      coMat: false,
    },
    {
      id: 4,
      code: "PS27423",
      name: "Nguyễn Tiến Học",
      avatar:
        "https://th.bing.com/th/id/OIP.aVtwt9w8L6NUC38XQ3HaSgHaHa?rs=1&pid=ImgDetMain",
      coMat: false,
    },
    {
      id: 5,
      code: "PS27617",
      name: "Nguyễn Xuân Trường",
      avatar:
        "https://th.bing.com/th/id/OIP.aVtwt9w8L6NUC38XQ3HaSgHaHa?rs=1&pid=ImgDetMain",
      coMat: false,
    },
    {
      id: 6,
      code: "PS27623",
      name: "Nguyễn Hữu Nghĩa",
      avatar:
        "https://th.bing.com/th/id/OIP.aVtwt9w8L6NUC38XQ3HaSgHaHa?rs=1&pid=ImgDetMain",
      coMat: false,
    },
  ];

  const [studentsState, setStudents] = useState(students);

  const handleToggle = (id) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) => {
        if (student.id === id) {
          console.log(`id: ${id}, coMat: ${!student.coMat}`);
          return { ...student, coMat: !student.coMat };
        }
        return student;
      })
    );
  };

  const renderRow = (item) => [
    <td key={`item-code-${item.id}`} className="p-2 text-lg font-medium">
      {item.code}
    </td>,
    <td key={`item-name-${item.id}`} className="p-2 text-lg font-medium">
      {item.name}
    </td>,
    <td
      key={`item-shift-${item.id}`}
      className="p-2 px-0 flex items-center justify-center"
    >
      <img
        className="w-[150px] object-cover"
        src={`${item.avatar}`}
        alt={item.name}
      />
    </td>,
    <td key={`item-date-${item.id}`} className="">
      <div className="flex items-center justify-center min-h-[50px]">
        <div className="relative inline-block w-[80px] mr-2 align-middle select-none">
          <input
            type="checkbox"
            name="toggle"
            id={`coMat-${item.id}`}
            className="toggle-checkbox absolute block w-9 h-9 rounded-full bg-white border-4 appearance-none cursor-pointer"
            checked={item.coMat}
            onChange={() => handleToggle(item.id)}
          />
          <label
            htmlFor={`toggle-${item.id}`}
            className="toggle-label block overflow-hidden h-9 rounded-full bg-red-500 cursor-pointer"
          ></label>
        </div>
      </div>
    </td>,
  ];

  return (
    <div className="py-4">
      <div className="border rounded-md mb-2 h-10 ">
        {item ? (
          <div className="h-full px-4 flex items-center justify-between font-medium text-lg text-blue-700">
            <p>Class id: {item.clazzId}</p>
            <p>Class Code: {item.code}</p>
            <p>Subject: {item.subjectName}</p>
            <p>Subject Code: {item.subjectCode}</p>
          </div>
        ) : (
          <p>No item data available</p>
        )}
      </div>

      <Table
        DefaultTable={true}
        showOptions={true}
        showSearch={true}
        headers={headers}
        renderRow={renderRow}
        data={studentsState}
        maxRow={students.length}
        showTurnPage={false}
      />

      <div className="flex justify-center">
        <Button
          label={
            <>
              <FontAwesomeIcon icon={faFloppyDisk} className="mr-2" /> Lưu
            </>
          }
          className="w-full md:w-1/2 h-10 text-white font-medium text-lg justify-center items-center my-6"
        />
      </div>
    </div>
  );
}

export default CheckAttendance;
