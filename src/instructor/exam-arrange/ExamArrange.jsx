import React, { useState, useCallback } from "react";
import { useParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import DragDrop, { listExam } from "../../component/DragDrop";
import Button from "../../component/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleLeft, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

function ExamArrange() {
  const location = useLocation();
  const { item } = location.state || {};
  const navigate = useNavigate();

  const numberBoard = Array.from({ length: 3 }, (_, index) => index + 1);

  const students = [
    { id: 1, code: "ps27456", name: "Lieu Vinh Phat", condition: true },
    { id: 2, code: "ps27430", name: "Ngo Thi Duc Nhu", condition: true },
    { id: 3, code: "ps27619", name: "Nguyen Trung Hieu", condition: false },
    { id: 4, code: "ps27519", name: "Nguyen Tien Hoc", condition: false },
    { id: 5, code: "ps27601", name: "Nguyen Xuan Truong", condition: true },
    { id: 6, code: "ps27090", name: "Nguyen Huu Nghia", condition: false },
  ];

  const handleStudentListClick = useCallback(
    (item) => {
      navigate(
        `/instructor/student-list/${encodeURIComponent(
          item.code
        )}/${encodeURIComponent(item.subject.code)}`,
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
          <FontAwesomeIcon
            icon={faCircleLeft}
            className="text-white mr-1 font-medium text-lg"
          />
          Trở về
        </>
      ),
      onClick: () => handleStudentListClick(item),
    },
  ];

  const saveList = () => {
    console.log("danh sach thi cua idClazz: " + item.id + "|" + listExam);
  };

  return (
    <div className="py-4">
      {/* <div className="border rounded-md h-10 ">
        {item ? (
          <div className="h-full px-4 flex items-center justify-between font-medium text-lg text-blue-700">
            <p>Phòng: {item.room}</p>
            <p>Lớp: {item.clazz}</p>
            <p>Mã môn: {item.code}</p>
            <p>Tên môn: {item.name}</p>
          </div>
        ) : (
          <p>No item data available</p>
        )}
      </div> */}

      <div className="h-[500px]">
        <DragDrop
          numberBoard={numberBoard}
          initialStudents={students}
          showOptions={true}
          showSearchItem={true}
          showRandomBtn={true}
          showOtherBtn={true}
          otherBtns={getbackBtn}
        />
      </div>

      <div className="flex md:mt-10 mt-36 justify-center">
        <Button
          label={
            <>
              <FontAwesomeIcon icon={faFloppyDisk} className="mr-2" /> Lưu
            </>
          }
          className="w-full md:w-1/2 bg-blue-400 h-10 text-white flex justify-center font-medium"
          onClick={saveList}
        />
      </div>
    </div>
  );
}

export default ExamArrange;
