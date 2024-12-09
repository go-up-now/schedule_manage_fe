import MiniMenu from "../../component/MiniMenu";
import React, { useState, useEffect, useCallback } from "react";
import Table from "../../component/Table";
import Button from "../../component/Button";
import Modal from "../../component/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faFileImport } from "@fortawesome/free-solid-svg-icons";
import FontGroup from "./FontGroup";
import Container from "../../component/Container.tsx";
import TitleHeader from "../../component/TitleHeader.tsx";
import TextFieldGroup from "./TextFieldGroup";
import { getAllYearAPI } from "../../api/years.js";
import { getAllByBlockAndSemesterAndYear } from "../../api/Schedule.js";
import { getAllBlocksAPI } from "../../api/Block.js";
import { getAllSemesterAPI } from "../../api/Semester.js";
import { format } from "date-fns";

function ScheduleManage() {
  const headers = ["Mã lớp", "Mã Môn", "Ngày", "Trạng thái", ""];

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
    <td key={`item-clazz_code-${item.id}`} className=" border-b">
      {item.clazz_code}
    </td>,
    <td key={`item-subject_code-${item.id}`} className=" border-b">
      {item.subject_code}
    </td>,
    <td key={`item-gender-${item.id}`} className=" border-b">
      {format(item.date_schedule, "dd-MM-yyyy")}
    </td>,
    <td key={`item-status-${item.id}`} className=" border-b">
      {item.status}
      <input type="checkbox" checked={item.status} />
    </td>,
    <td key={`item-case-${item.id}`}>
      <div className="flex justify-center items-center">
        <MiniMenu
          classNameBtn="text-xs p-4"
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

  // Call API useState<Number>(2024)

  const [selectedBlock, setSelectedBlock] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState(null);
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const [schedules, setSchedules] = useState([]);
  console.log(schedules);
  const handleBlockChange = (event) => {
    setSelectedBlock(event.target.value);
  };

  const handleSemesterChange = (event) => {
    setSelectedSemester(event.target.value);
  };
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  // Fetch exam whenever course or major is selected
  useEffect(() => {
    if (selectedBlock && selectedSemester && selectedYear) {
      getAllByBlockAndSemesterAndYear(
        selectedBlock,
        selectedSemester,
        selectedYear
      )
        .then((data) => {
          setSchedules(data);
        })
        .catch((error) => {
          console.error("Error fetching schedule:", error);
        });
    }
  }, [selectedBlock, selectedSemester, selectedYear]);

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

  const selectBoxs = [
    {
      options: blocks,
      nameSelect: "Block",
      onChange: handleBlockChange,
      value: selectedBlock,
      className: "mr-1 w-full md:w-[150px] pt-4 md:pt-4",
    },
    {
      options: semesters,
      nameSelect: "Kỳ",
      onChange: handleSemesterChange,
      value: selectedSemester,
      className: "w-full md:w-[150px] mr-1 pt-4 md:pt-4",
    },
    {
      options: years,
      nameSelect: "Năm",
      onChange: handleYearChange,
      value: selectedYear,
      className: "w-full md:w-[150px] pt-4 md:pt-4",
    },
  ];

  return (
    <Container>
      <TitleHeader title="QUẢN LÝ LỊCH HỌC" />
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
            data={schedules}
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
    </Container>
  );
}
export default ScheduleManage;
