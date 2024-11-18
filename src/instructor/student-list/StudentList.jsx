import React, { useState, useCallback, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import Table from "../../component/Table";
import Button from "../../component/Button";
import Modal from "../../component/Modal";
import TextField from "../../component/TextField";
import { student } from "./student";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faLayerGroup } from "@fortawesome/free-solid-svg-icons";

function StudentList() {
  const { code, clazz } = useParams();
  const location = useLocation();
  const { item } = location.state || {};
  const navigate = useNavigate();

  const headers = [
    "Mã sinh viên",
    "Tên sinh viên",
    "Lab 1",
    "Lab 2",
    "Lab 3",
    "Lab 4",
    "ASM 1",
    "Lab 5",
    "Lab 6",
    "Lab 7",
    "Lab 8",
    "ASM 2",
    "ASM final",
    "Cập nhật",
  ];

  const [selectedStudent, setSelectedStudent] = useState(null);

  const openModal = (student) => setSelectedStudent(student);
  const closeModal = () => setSelectedStudent(null);

  const renderRow = (item) => [
    <td key={`item-code-${item.id}`} className="">
      {item.code}
    </td>,
    <td key={`item-name-${item.id}`} className="">
      {item.name}
    </td>,
    <td key={`item-lab1-${item.id}`} className="">
      {item.lab1}
    </td>,
    <td key={`item-lab2-${item.id}`} className="">
      {item.lab2}
    </td>,
    <td key={`item-lab3-${item.id}`} className="">
      {item.lab3}
    </td>,
    <td key={`item-lab4-${item.id}`} className="">
      {item.lab4}
    </td>,
    <td key={`item-asm1-${item.id}`} className="">
      {item.asm1}
    </td>,
    <td key={`item-lab5-${item.id}`} className="">
      {item.lab5}
    </td>,
    <td key={`item-lab6-${item.id}`} className="">
      {item.lab6}
    </td>,
    <td key={`item-lab7-${item.id}`} className="">
      {item.lab7}
    </td>,
    <td key={`item-lab8-${item.id}`} className="">
      {item.lab8}
    </td>,
    <td key={`item-asm2-${item.id}`} className="">
      {item.asm2}
    </td>,
    <td key={`item-asmFinal-${item.id}`} className="">
      {item.asmFinal}
    </td>,
    <td key={`item-capnhat-${item.id}`} className="flex justify-center p-1  ">
      <div className="w-full h-full flex items-center justify-center">
        <Button
          onClick={() => {
            openModal(item);
            console.log(item);
          }}
          label={
            <>
              <FontAwesomeIcon icon={faPenToSquare} />
            </>
          }
          className="w-full md:w-1/2 p-4 justify-center text-white "
        />
      </div>
    </td>,
  ];

  const btnStart = [
    {
      id: 1,
      name: "In Excel",
      onclick: {},
    },
  ];

  const handleExamClick = useCallback(
    (item) => {
      navigate(
        `/instructor/exam-arrange/${encodeURIComponent(
          item.code
        )}/${encodeURIComponent(item.subject.code)}`,
        {
          state: { item },
        }
      );
    },
    [navigate]
  );

  const btnEnd = [
    {
      id: 1,
      name: (
        <>
          <FontAwesomeIcon icon={faLayerGroup} className="mr-2" />
          Xếp lịch thi
        </>
      ),
      onClick: () => handleExamClick(item),
    },
  ];

  const [className, setClassName] = useState("w-7/12 h-[600px]");
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 985) {
        setClassName("w-full h-[550px]");
      } else {
        setClassName("w-7/12 h-[550px]");
      }
    };
    window.addEventListener("resize", handleResize);
    // Kiểm tra kích thước màn hình khi component được mount
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [className]);

  return (
    <div className="py-4">
      <div className="border rounded-md mb-2 h-10 ">
        {item ? (
          <div className="h-full px-4 flex items-center justify-between font-medium text-lg text-blue-700">
            <p>idClazz: {item.id}</p>
            <p>codeClazz: {item.code}</p>
            <p>codeSubject: {item.subject.code}</p>
            <p>nameSubject: {item.subject.name}</p>
          </div>
        ) : (
          <p>No item data available</p>
        )}
      </div>
      <Table
        DefaultTable={true}
        showOptions={true}
        showSearch={true}
        showBtnEnd={true}
        btnEnd={btnEnd}
        headers={headers}
        renderRow={renderRow}
        data={student}
        maxRow={student.length}
        showTurnPage={false}
      />
      {selectedStudent && (
        <Modal isOpen={true} onClose={closeModal} className={`${className}`}>
          <h2 className="text-xl font-bold">
            {selectedStudent.name} - {selectedStudent.code}
          </h2>
          <div>
            <div className="w-full flex flex-col flex-wrap h-[380px] border-t border-t-gray-500 mt-5 py-5`">
              {headers.slice(2, -2).map((header, index) => (
                <div key={index} className="my-1 p-1">
                  <TextField
                    sideField={true}
                    label={header}
                    value={
                      selectedStudent[`lab${index + 1}`] ||
                      selectedStudent[`asm${index + 1}`] ||
                      selectedStudent[header.toLowerCase().replace(/\s/g, "")]
                    }
                    placeholder={`Enter ${header.toLowerCase()}`}
                    className={"p-1"}
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between px-2 border-t border-t-black pt-6">
              <TextField
                sideField={true}
                label="ASM Final:"
                value={selectedStudent.asmFinal}
                className="flex-1 items-center mr-10"
              />
              <Button
                label="LƯU"
                className="flex-1 items-center justify-center p-2"
              ></Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default StudentList;
