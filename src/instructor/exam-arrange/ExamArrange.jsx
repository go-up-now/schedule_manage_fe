import React, { useState, useCallback, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DragDrop, { listExam } from "../../component/DragDrop";
import Button from "../../component/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import Container from "../../component/Container.tsx";
import TitleHeader from "../../component/TitleHeader.tsx";
import { getAllStudentbyClazzId } from "../../api/Student.js";

function ExamArrange() {
  const location = useLocation();
  const { item, studentList } = location.state || {};
  const navigate = useNavigate();
  console.log("studentListCallAPI at EXAM");
  console.log(studentList);
  const numberBoard = Array.from({ length: 3 }, (_, index) => index + 1);

  const handleStudentListClick = useCallback(
    (item) => {
      navigate(
        `/danh-sach-sinh-vien/${encodeURIComponent(
          item.subject_code
        )}/${encodeURIComponent(item.clazz_code)}`,
        { state: { item } }
      );
    },
    [navigate]
  );

  const getbackBtn = [
    {
      id: 1,
      name: (
        <>
          <FontAwesomeIcon icon={faCircleLeft} className="mr-2" />
          Trở về
        </>
      ),
      onClick: () => handleStudentListClick(item),
    },
  ];

  const saveList = () => {
    console.log("danh sach thi cua idClazz: " + item.id + "|" + listExam);
  };

  // call api

  // const students = [
  //   {
  //     studentId: 1,
  //     studentName: "Nguyễn Trung Hiếu",
  //     avatar: "student1.png",
  //     studentCode: "PS27619",
  //     studentEmail: "hieuntps27619@fpt.edu.vn",
  //     condition: true,
  //   },
  //   {
  //     studentId: 2,
  //     studentEmail: "nhuntdps27430@fpt.edu.vn",
  //     studentCode: "PS27430",
  //     studentName: "Ngô Thị Đức Nhu",
  //     condition: true,
  //     avatar: "student2.png",
  //   },
  //   {
  //     studentName: "Liêu Vinh Phát",
  //     condition: true,
  //     studentId: 3,
  //     studentCode: "PS27456",
  //     studentEmail: "phatlvps27456@fpt.edu.vn",
  //     avatar: "student3.png",
  //   },
  //   {
  //     studentId: 4,
  //     studentName: "Nguyễn Tiến Học",
  //     condition: true,
  //     studentEmail: "hocntps27837@fpt.edu.vn",
  //     avatar: "student4.png",
  //     studentCode: "PS27837",
  //   },
  //   {
  //     studentName: "Nguyễn Hưũ Nghĩa",
  //     studentCode: "PS27127",
  //     studentId: 5,
  //     avatar: "student5.png",
  //     condition: true,
  //     studentEmail: "nghianhps27127@fpt.edu.vn",
  //   },
  //   {
  //     studentName: "Nguyễn Hoàng Lệ Băng",
  //     avatar: "student7.png",
  //     condition: true,
  //     studentCode: "PS27457",
  //     studentId: 7,
  //     studentEmail: "bangnhlps27457@fpt.edu.vn",
  //   },
  //   {
  //     studentEmail: "bichnhnps27838@fpt.edu.vn",
  //     studentId: 8,
  //     studentName: "Nguyễn Hoàng Ngọc Bích",
  //     studentCode: "PS27838",
  //     condition: true,
  //     avatar: "student8.png",
  //   },
  // ];

  return (
    <Container>
      <TitleHeader
        title={`XẾP DANH SÁCH ĐỢT THI ${item.clazz_code} - MÔN ${item.subject_name}`}
        titleClassName="uppercase text-[1.25rem] font-medium"
      />
      <div className="min-h-[800px]">
        <div className="h-[700px]">
          <DragDrop
            numberBoard={numberBoard}
            initialStudents={studentList}
            showOptions={true}
            showSearchItem={true}
            showRandomBtn={true}
            showOtherBtn={true}
            otherBtns={getbackBtn}
          />
        </div>

        <div className="flex md:mt-10 mt-36 justify-end">
          <Button
            label={
              <>
                <FontAwesomeIcon icon={faFloppyDisk} className="mr-2" /> Lưu
              </>
            }
            className="w-full md:w-[150px] mr-0 md:mr-[60px] bg-blue-400 h-10 p-1 text-white flex justify-center font-medium"
            onClick={saveList}
          />
        </div>
      </div>
    </Container>
  );
}

export default ExamArrange;
