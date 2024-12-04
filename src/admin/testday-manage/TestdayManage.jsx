import React, { useState, useEffect, useCallback } from "react";
import MiniMenu from "../../component/MiniMenu";
import Table from "../../component/Table";
import Button from "../../component/Button";
import Modal from "../../component/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faFileImport } from "@fortawesome/free-solid-svg-icons";
import FontGroup from "./FontGroup";
import TextFieldGroup from "./TextFieldGroup";
import { major, semester, block, year } from "./DataSelect";
import { getAllExambyBlockSemesterYearMajorID } from "../../api/examSchedule";
import Container from "../../component/Container.tsx";
import TitleHeader from "../../component/TitleHeader.tsx";
function TestdayManage() {
  const headers = ["Mã môn", "Mã lớp", "Ca", "Phòng", ""];
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
    <td key={`item-subject_code-${item.id}`} className="border-b">
      {item.subject_code}
    </td>,
    <td key={`item-instructor_code-${item.id}`} className="border-b">
      {item.instructor_code}
    </td>,
    <td key={`item-shift_id-${item.id}`} className="border-b">
      {item.shift_id}
    </td>,
    <td key={`item-room_name-${item.id}`} className="border-b">
      {item.room_name}
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

  // API Call
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMajor, setSelectedMajor] = useState(null);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [exams, setExams] = useState([]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };
  const handleMajorChange = (event) => {
    setSelectedMajor(event.target.value);
  };
  const handleBlockChange = (event) => {
    setSelectedBlock(event.target.value);
  };
  const handleSemesterChange = (event) => {
    setSelectedSemester(event.target.value);
  };

  useEffect(() => {
    if (selectedYear && selectedMajor && selectedBlock && selectedSemester) {
      getAllExambyBlockSemesterYearMajorID(
        selectedBlock,
        selectedSemester,
        selectedYear,
        selectedMajor // Ensure this parameter matches "specializationId" in the API call
      )
        .then((data) => {
          console.log("Fetched Exams: ", data); // Log the fetched data
          setExams(data);
        })
        .catch((error) => {
          console.error("Error fetching exam schedules:", error);
        });
    }
  }, [selectedYear, selectedMajor, selectedBlock, selectedSemester]);

  const selectBoxs = [
    {
      options: year,
      nameSelect: "Năm",
      onChange: handleYearChange,
      value: selectedYear,
      className: "mr-1 w-full pt-4 md:pt-4",
    },
    {
      options: block,
      nameSelect: "Block",
      onChange: handleBlockChange,
      value: selectedBlock,
      className: "w-full mr-1 pt-4 md:pt-4",
    },
    {
      options: semester,
      nameSelect: "Học kỳ",
      onChange: handleSemesterChange,
      value: selectedSemester,
      className: "w-full pt-4 md:pt-4",
    },
    {
      options: major,
      nameSelect: "Ngành",
      onChange: handleMajorChange,
      value: selectedMajor,
      className: "w-full ml-1 pt-4 md:pt-4",
    },
  ];

  return (
    <Container>
      <TitleHeader title="QUẢN LÝ LỊCH THI" />
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
            cbWidth="w-8/12"
          />
          {selectedExam && (
            <Modal isOpen={true} onClose={closeModal} className="">
              <h2 className="text-xl font-bold">
                {selectedExam.name} - {selectedExam.code}
              </h2>
              <div>
                <div className="w-[700px] h-[380px] border-t border-t-gray-500 mt-5 py-2">
                  <TextFieldGroup
                  // major={selectedExam.major}
                  // email={selectedExam.email}
                  // perEmail={selectedExam.perEmail}
                  // clazz={selectedExam.clazz}
                  // phone={selectedExam.phone}
                  // address={selectedExam.address}
                  // credit={selectedExam.credit}
                  // ownCredit={selectedExam.ownCredit}
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
            />
          </div>
          <FontGroup exam={editExam} isEditDisabled={isEditDisabled} />
        </div>
      </div>
    </Container>
  );
}
export default TestdayManage;
