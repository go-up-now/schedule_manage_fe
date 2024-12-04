import React, { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../../component/Table";
import Button from "../../component/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClipboardList } from "@fortawesome/free-solid-svg-icons";
import Container from "../../component/Container.tsx";
import TitleHeader from "../../component/TitleHeader.tsx";
import { getClazzesByInstructor } from "../../api/clazzs.js";

function TeachManage() {
  const navigate = useNavigate();

  const headers = ["Ca", "Phòng", "Lớp", "Mã Môn", "Tên Môn", ""];

  const renderRow = (item) => [
    <td key={`item-shift-${item.id}`} className="px-6 py-4">
      Ca {item.shift}
    </td>,
    <td key={`item-room_name-${item.id}`} className="px-6 py-4">
      {item.room_name}
    </td>,
    <td key={`item-clazz_code-${item.id}`} className="px-6 py-4">
      {item.clazz_code}
    </td>,
    <td key={`item-subject_code-${item.id}`} className="px-6 py-4">
      {item.subject_code}
    </td>,
    <td key={`item-subject_name-${item.id}`} className="px-6 py-4">
      {item.subject_name}
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
          className="w-[150px] h-[40px] flex items-center justify-center text-white"
          onClick={() => handleStudentListClick(item)}
        />
      </div>
    </td>,
  ];

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

  // Call API
  const [selectedYear, setSelectedYear] = useState(2024);
  const [selectedSemester, setSelectedSemester] = useState("Spring");
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
  useEffect(() => {
    if (selectedBlock && selectedSemester && selectedYear) {
      getClazzesByInstructor(selectedBlock, selectedSemester, selectedYear)
        .then((data) => {
          setClazzTeaching(data);
        })
        .catch((error) => {
          console.error("Error fetching students:", error);
        });
    }
  }, [selectedBlock, selectedSemester, selectedYear]);

  const selectBoxs = [
    {
      options: [
        { value: 2023, label: "2023" },
        { value: 2022, label: "2022" },
      ],
      nameSelect: "2024",
      onChange: handleYearChange,
      value: selectedYear,
      className: "md:mr-1 w-full md:w-[200px] pt-4 md:pt-4",
    },
    {
      options: [
        { value: "Summer", label: "Summer" },
        { value: "Fall", label: "Fall" },
        { value: "Winter", label: "Winter" },
      ],
      nameSelect: "Spring",
      onChange: handleSemesterChange,
      value: selectedSemester,
      className: "md:mr-1 w-full md:w-[200px] pt-4 md:pt-4",
    },
    {
      options: [{ value: 2, label: "Block II" }],
      nameSelect: "Block I",
      onChange: handleBlockChange,
      value: selectedBlock,
      className: "md:mr-1 w-full md:w-[200px] pt-4 md:pt-4",
    },
  ];

  return (
    <Container>
      <TitleHeader title="Danh sách lớp phụ trách" />
      <div className="min-h-[800px]">
        <Table
          DefaultTable={true}
          showOptions={true}
          showSearch={true}
          showSelectBoxes={true}
          numberSelectBox={selectBoxs}
          showBtnEnd={true}
          headers={headers}
          renderRow={renderRow}
          data={clazzTeaching}
          maxRow={10}
        />
      </div>
    </Container>
  );
}

export default TeachManage;
