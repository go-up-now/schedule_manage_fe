import React, { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clazz } from "./Teachingdays";
import Table from "../../component/Table";
import MiniMenu from "../../component/MiniMenu";
import Accordion from "../../component/Accordion";
import Button from "../../component/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faClipboardList,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";

function TeachManage({ user }) {
  const navigate = useNavigate();
  //Biến responsive
  const [desktop, setDesktop] = useState(true);
  const [mobile, setMobile] = useState(false);

  const headers = ["Clazz", "Mã Môn", "Tên Môn", ""];

  const renderRow = (item) => [
    <td key={`item-code-${item.id}`} className="px-6 py-4">
      {item.code}
    </td>,
    <td key={`item-subjectCode-${item.id}`} className="px-6 py-4">
      {item.subject.code}
    </td>,
    <td key={`item-subjectName-${item.id}`} className="px-6 py-4">
      {item.subject.name}
    </td>,
    <td key={`item-option-${item.id}`} className="px-6 py-4">
      <div className="flex justify-center w-full">
        <Button
          label={
            <>
              <FontAwesomeIcon icon={faClipboardList} className="mr-2" /> Danh
              sách
            </>
          }
          className="w-full md:w-1/3 flex items-center justify-center p-3 text-white"
          onClick={() => handleStudentListClick(item)}
        />
      </div>
    </td>,
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

  // Call API
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [selectedBlock, setSelectedBlock] = useState(1);
  const [clazzTeaching, setClazzTeaching] = useState([]);

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };
  const handleSemesterChange = (event) => {
    setSelectedSemester(event.target.value);
  };
  const handleBlockChange = (event) => {
    setSelectedBlock(event.target.value);
  };

  // Fetch students whenever course or major is selected
  // useEffect(() => {
  //   if (selectedCourse && selectedMajor) {
  //     getAllStudentbyCourseAndMajor(selectedCourse, selectedMajor)
  //       .then((data) => {
  //         setStudents(data);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching students:", error);
  //       });
  //   }
  // }, [selectedCourse, selectedMajor]);

  const selectBoxs = [
    {
      options: [
        { value: 2023, label: "2023" },
        { value: 2022, label: "2022" },
      ],
      nameSelect: "2024",
      onChange: handleYearChange,
      value: selectedYear,
      className: "mr-1 w-full pt-4 md:pt-4",
    },
    {
      options: [{ value: 2, label: "Học kỳ II" }],
      nameSelect: "Học kỳ I",
      onChange: handleSemesterChange,
      value: selectedSemester,
      className: "mr-1 w-full pt-4 md:pt-4",
    },
    {
      options: [{ value: 2, label: "Block II" }],
      nameSelect: "Block I",
      onChange: handleBlockChange,
      value: selectedBlock,
      className: "mr-1 w-full pt-4 md:pt-4",
    },
  ];

  return (
    <div className="py-4">
      <Table
        DefaultTable={true}
        showOptions={true}
        showSearch={true}
        showSelectBoxes={true}
        numberSelectBox={selectBoxs}
        headers={headers}
        renderRow={renderRow}
        data={clazz}
        maxRow={5}
      />
    </div>
  );
}

export default TeachManage;
