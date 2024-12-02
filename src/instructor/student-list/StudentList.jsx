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
import Container from "../../component/Container.tsx";
import TitleHeader from "../../component/TitleHeader.tsx";
import TextFieldGroup from "./TextFieldGroup.jsx";
import { getAllStudentbyClazzId } from "../../api/Student.js";
function StudentList() {
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

  const [studentList, setStudentList] = useState([]);
  // Fetch student list on component mount
  useEffect(() => {
    if (item.clazz_id) {
      getAllStudentbyClazzId(item.clazz_id)
        .then((data) => {
          const updatedStudents = data.map((student) => ({
            ...student,
            condition: true,
          }));

          const filteredStudents = updatedStudents.filter(
            (student) => student.condition === true
          );

          setStudentList(filteredStudents);
        })
        .catch((error) => {
          console.error("Error fetching student list:", error);
        });
    }
  }, [item.clazz_id]);

  console.log("studentListCallAPI");
  console.log(studentList);

  // handleExamClick function
  const handleExamClick = useCallback(
    (item) => {
      navigate(
        `/xep-dot-thi/${encodeURIComponent(
          item.subject_code
        )}/${encodeURIComponent(item.clazz_code)}`,
        {
          state: { item, studentList }, // Pass both item and studentList in the state
        }
      );
    },
    [navigate, studentList] // Include studentList in the dependency array
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

  const [className, setClassName] = useState("w-7/12 h-[620px]");
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 985) {
        setClassName("w-[95%] h-[95%] overflow-auto relative");
      } else {
        setClassName("w-7/12 h-[620px]");
      }
    };
    window.addEventListener("resize", handleResize);
    // Kiểm tra kích thước màn hình khi component được mount
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [className]);

  const handleFieldChange = (field, value) => {
    setSelectedStudent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // CALL API

  return (
    <Container>
      <TitleHeader
        title={`DANH SÁCH SINH VIÊN ${item.clazz_code} - MÔN ${item.subject_name}`}
        titleClassName="uppercase text-[1.25rem] font-medium"
      />

      <div className="min-h-[800px]">
        {/* <div className="border rounded-md mb-2 h-10 ">
          {item ? (
            <div className="h-full px-4 flex items-center justify-between font-medium text-lg text-blue-700">
              <p>idClazz: {item.clazzId}</p>
              <p>codeClazz: {item.clazz}</p>
              <p>codeSubject: {item.subjectCode}</p>
              <p>nameSubject: {item.subjectName}</p>
            </div>
          ) : (
            <p>No item data available</p>
          )}
        </div> */}
        <Table
          DefaultTable={true}
          showOptions={true}
          showSearch={true}
          showBtnEnd={true}
          showSelectBox={true}
          btnEnd={btnEnd}
          headers={headers}
          renderRow={renderRow}
          data={student}
          maxRow={student.length}
          showTurnPage={false}
        />
        {selectedStudent && (
          <Modal
            isOpen={true}
            onClose={closeModal}
            className={`${className}`}
            label={`${selectedStudent.name} - ${selectedStudent.code}`}
          >
            <div>
              <TextFieldGroup
                thisStudent={selectedStudent}
                onFieldChange={handleFieldChange}
              />
            </div>
          </Modal>
        )}
      </div>
    </Container>
  );
}

export default StudentList;
