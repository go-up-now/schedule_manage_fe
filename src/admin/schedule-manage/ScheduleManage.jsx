import MiniMenu from "../../component/MiniMenu";
import React, { useState, useEffect, useCallback } from "react";
import Table from "../../component/Table";
import Button from "../../component/Button";
import Modal from "../../component/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faFileImport } from "@fortawesome/free-solid-svg-icons";
import FontGroup from "./FontGroup";

import { dates } from "./dates";
import TextFieldGroup from "./TextFieldGroup";

import { major, course } from "./DataSelect";
import { getAllStudentbyCourseAndMajor } from "../../api/Student";

function ScheduleManage() {
  //const headers = ["Mã lớp", "Mã môn", "Mã GV", "Ngày", "Ca", "Phòng", ""];

  const headers = ["Code", "Name", "Gender", ""];
  const [selectedExam, setSelectedExam] = useState(null);
  const [editExam, setEditExam] = useState(null);
  const [isEditDisabled, setIsEditDisabled] = useState(false);

  const handleEditClick = useCallback((exam) => {
    setEditExam(exam);
    setIsEditDisabled(true);
  }, []);

  const openModal = (exam) => setSelectedExam(exam);
  const closeModal = () => setSelectedExam(null);

  const renderRow = (item) => [
    <td key={`item-code-${item.id}`} className=" border-b">
      {item.code}
    </td>,
    <td key={`item-name-${item.id}`} className=" border-b">
      {item.lastName} {item.firstName}
    </td>,
    <td key={`item-gender-${item.id}`} className=" border-b">
      {item.gender ? "Nam" : "Nữ"}
    </td>,
    <td key={`item-case-${item.id}`}>
      <div className="flex justify-center items-center">
        <MiniMenu
          className="text-xs p-4"
          iconMenu={faCaretDown}
          menuItems={[
            {
              text: "Chi tiết",
              onClick: () => openModal(item),
            },
            {
              text: "Sửa đổi",
              onClick: () => handleEditClick(item),
            },
          ]}
        />
      </div>
    </td>,
  ];

  // Call API
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [exams, setExams] = useState([]);

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  const handleMajorChange = (event) => {
    setSelectedMajor(event.target.value);
  };

  // Fetch exam whenever course or major is selected
  useEffect(() => {
    if (selectedCourse && selectedMajor) {
      getAllStudentbyCourseAndMajor(selectedCourse, selectedMajor)
        .then((data) => {
          setExams(data);
        })
        .catch((error) => {
          console.error("Error fetching exam:", error);
        });
    }
  }, [selectedCourse, selectedMajor]);

  const selectBoxs = [
    {
      options: course,
      nameSelect: "Khoá",
      onChange: handleCourseChange,
      value: selectedCourse,
      className: "mr-1 w-full md:w-[200px] pt-4 md:pt-4",
    },
    {
      options: major,
      nameSelect: "Chuyên ngành",
      onChange: handleMajorChange,
      value: selectedMajor,
      className: "w-full md:w-[200px] ml-1 mr-1 pt-4 md:pt-4",
    },
    {
      options: major,
      nameSelect: "Chuyên ngành",
      onChange: handleMajorChange,
      value: selectedMajor,
      className: "w-full md:w-[200px] ml-1 pt-4 md:pt-4",
    },
  ];

  return (
    <div className={`flex flex-col md:flex-row min-h-svh`}>
      <div className="p-2 flex-1">
        <Table
          DefaultTable={true}
          showOptions={true}
          showSearch={true}
          showSelectBoxes={true}
          numberSelectBox={selectBoxs}
          headers={headers}
          renderRow={renderRow}
          data={exams} // Pass the fetched exam data
          maxRow={10}
        />
        {selectedExam && (
          <Modal isOpen={true} onClose={closeModal} className="">
            <h2 className="text-xl font-bold">
              {selectedExam.name} - {selectedExam.code}
            </h2>
            <div>
              <div className="w-[700px] h-[380px] border-t border-t-gray-500 mt-5 py-2">
                <TextFieldGroup
                  major={selectedExam.major}
                  email={selectedExam.email}
                  perEmail={selectedExam.perEmail}
                  clazz={selectedExam.clazz}
                  phone={selectedExam.phone}
                  address={selectedExam.address}
                  credit={selectedExam.credit}
                  ownCredit={selectedExam.ownCredit}
                />
              </div>
            </div>
          </Modal>
        )}
      </div>
      <div className={`p-2 w-full md:w-[300px]`}>
        <div className="px-2 pt-4 mb-5">
          <Button
            className="w-full p-2 text-white justify-center"
            label={
              <>
                <FontAwesomeIcon icon={faFileImport} className="mr-2" />
                Import excel
              </>
            }
          ></Button>
        </div>
        <FontGroup exam={editExam} isEditDisabled={isEditDisabled} />
      </div>
    </div>
  );
}
export default ScheduleManage;
