import React, { useState, useEffect, useCallback } from "react";
import MiniMenu from "../../component/MiniMenu";
import Table from "../../component/Table";
import Button from "../../component/Button";
import Modal from "../../component/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faFileImport } from "@fortawesome/free-solid-svg-icons";
import FontGroup from "./FontGroup";
import TextFieldGroup from "./TextFieldGroup";
import { getAllExambyBlockSemesterYearSpecialization } from "../../api/examSchedule";
import Container from "../../component/Container.tsx";
import TitleHeader from "../../component/TitleHeader.tsx";
import { getAllYearAPI } from "../../api/years.js";
import { getAllBlocksAPI } from "../../api/Block.js";
import { getAllSemesterAPI } from "../../api/Semester.js";
import { getAllSpecializationsAPI } from "../../api/Specialization.js";

function TestdayManage() {
  const headers = ["Mã môn", "Mã lớp", "Ngày", "Đợt", "Trạng thái", ""];

  const [selectedExamSchedule, setSelectedExamSchedule] = useState(null);
  const [editExamSchedule, setEditExamSchedule] = useState(null);
  const [isEditDisabled, setIsEditDisabled] = useState(false);

  const handleEditClick = useCallback((exam) => {
    setEditExamSchedule(exam);
    setIsEditDisabled(true);
  }, []);

  const openModal = (exam) => setSelectedExamSchedule(exam);
  const closeModal = () => setSelectedExamSchedule(null);

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
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [selectedSpecialization, setSelectedSpecialization] = useState(null);
  const [selectedBlock, setSelectedBlock] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const [exams, setExams] = useState([]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };
  const handleSpecializationChange = (event) => {
    setSelectedSpecialization(event.target.value);
  };
  const handleBlockChange = (event) => {
    setSelectedBlock(event.target.value);
  };
  const handleSemesterChange = (event) => {
    setSelectedSemester(event.target.value);
  };

  useEffect(() => {
    if (
      selectedYear &&
      selectedSpecialization &&
      selectedBlock &&
      selectedSemester
    ) {
      getAllExambyBlockSemesterYearSpecialization(
        selectedBlock,
        selectedSemester,
        selectedYear,
        selectedSpecialization // Ensure this parameter matches "specializationId" in the API call
      )
        .then((data) => {
          console.log("Fetched Exams: ", data); // Log the fetched data
          setExams(data);
        })
        .catch((error) => {
          console.error("Error fetching exam schedules:", error);
        });
    }
  }, [selectedYear, selectedSpecialization, selectedBlock, selectedSemester]);
  console.log(exams);
  // GET API VALUE CB BLOCK
  const [blocks, setBlocks] = useState([]);
  useEffect(() => {
    const fetchBlocks = async () => {
      const data = await getAllBlocksAPI();
      const formattedBlocks = data.map((block) => ({
        value: block.block,
        label: block.block,
      })); // Format data with value and label
      setBlocks(formattedBlocks);
    };

    fetchBlocks(); // Call the API function
  }, []);

  // GET API VALUE CB SEMESTER
  const [semesters, setSemesters] = useState([]);
  useEffect(() => {
    const fetchSemesters = async () => {
      const data = await getAllSemesterAPI();
      const formattedSemesters = data.map((semester) => ({
        value: semester.semester,
        label: semester.semester,
      })); // Format data with value and label
      setSemesters(formattedSemesters);
    };

    fetchSemesters(); // Call the API function
  }, []);

  // GET API VALUE CB YEAR
  const [years, setYears] = useState([]);
  useEffect(() => {
    const fetchYears = async () => {
      try {
        const response = await getAllYearAPI();
        const formattedYears = response.data
          .map((year) => ({
            value: year.year,
            label: year.year.toString(),
          }))
          .reverse();
        setYears(formattedYears);
      } catch (error) {
        console.error("Failed to fetch years:", error);
      }
    };

    fetchYears();
  }, []);

  //GET API VALUE CB SPECIALIZATION
  const [specializations, setSpecializations] = useState([]);
  useEffect(() => {
    const fetchSpecializations = async () => {
      const data = await getAllSpecializationsAPI(); // Fetch the specializations
      const formattedSpecializations = data.map((specialization) => ({
        value: specialization.id,
        label: specialization.name,
      })); // Format data with value and label
      setSpecializations(formattedSpecializations);
    };

    fetchSpecializations(); // Call the API function
  }, []);

  const selectBoxs = [
    {
      options: blocks,
      nameSelect: "Block",
      onChange: handleBlockChange,
      value: selectedBlock,
      className: "w-full md:w-[150px] mr-1 pt-4 md:pt-4",
    },
    {
      options: semesters,
      nameSelect: "Học kỳ",
      onChange: handleSemesterChange,
      value: selectedSemester,
      className: "w-full mr-1 md:w-[150px] pt-4 md:pt-4",
    },
    {
      options: years,
      nameSelect: "Năm",
      onChange: handleYearChange,
      value: selectedYear,
      className: "mr-1 w-full md:w-[150px] pt-4 md:pt-4",
    },
    {
      options: specializations,
      nameSelect: "Bộ môn",
      onChange: handleSpecializationChange,
      value: selectedSpecialization,
      className: "w-full md:w-[150px] pt-4 md:pt-4",
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
          {selectedExamSchedule && (
            <Modal isOpen={true} onClose={closeModal} className="">
              <h2 className="text-xl font-bold">
                {selectedExamSchedule.name} - {selectedExamSchedule.code}
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
          <FontGroup exam={editExamSchedule} isEditDisabled={isEditDisabled} />
        </div>
      </div>
    </Container>
  );
}
export default TestdayManage;
