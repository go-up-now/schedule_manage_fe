import React, { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { clazz } from "./Teachingdays";
import Table from "../../component/Table";
import Button from "../../component/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

function OffedReplace() {
  const navigate = useNavigate();
  //Biến responsive
  const [desktop, setDesktop] = useState(true);
  const [mobile, setMobile] = useState(false);

  const headers = ["Clazz", "Mã Môn", "Tên Môn", "Ngày", ""];

  const renderRow = (item) => [
    <td key={`item-code-${item.id}`} className="px-6 py-4">
      {item.clazz.code}
    </td>,
    <td key={`item-subjectCode-${item.id}`} className="px-6 py-4">
      {item.clazz.subject.code}
    </td>,
    <td key={`item-subjectName-${item.id}`} className="px-6 py-4">
      {item.clazz.subject.name}
    </td>,
    <td key={`item-date-${item.id}`} className="px-6 py-4">
      {item.date}
    </td>,
    <td
      key={`item-option-${item.id}`}
      className="px-6 py-4 flex justify-center"
    >
      <Button
        label={
          <>
            <FontAwesomeIcon icon={faCheck} className="mr-2" />
            Đặt Lịch
          </>
        }
        className="p-3 w-2/3 text-white text-[16px] justify-center"
        onClick={() => handleStudentListClick(item)}
      />
    </td>,
  ];

  const header1s = ["Clazz", "Tên Môn", "Ngày", ""];

  const renderRow1 = (item) => [
    <td key={`item-code-${item.id}`} className="px-6 py-4">
      {item.clazz.code}
    </td>,
    <td key={`item-subjectName-${item.id}`} className="px-6 py-4">
      {item.clazz.subject.name}
    </td>,
    <td key={`item-date-${item.id}`} className="px-6 py-4">
      {item.date}
    </td>,
    <td
      key={`item-option-${item.id}`}
      className="px-6 py-4 flex justify-center"
    >
      <Button
        label={
          <>
            <FontAwesomeIcon icon={faCheck} className="mr-2" />
            Đặt Lịch
          </>
        }
        className="p-3 w-1/3 text-white text-[16px] justify-center"
        onClick={() => handleStudentListClick(item)}
      />
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

  const numberSelectBox = [
    {
      name: "Năm",
      title: "Năm",
      options: [
        { value: "2024", label: "2024" },
        { value: "2023", label: "2023" },
      ],
    },
    {
      name: "Học kỳ",
      title: "Học kỳ",
      options: [
        { value: 1, label: "1" },
        { value: 1, label: "2" },
      ],
    },
    {
      name: "Block",
      title: "Block",
      options: [
        { value: 1, label: "1" },
        { value: 2, label: "2" },
      ],
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 783) {
        setDesktop(false);
        setMobile(true);
      } else {
        setDesktop(true);
        setMobile(false);
      }
    };
    window.addEventListener("resize", handleResize);
    // Kiểm tra kích thước màn hình khi component được mount
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [desktop, mobile]);

  return (
    <div className="py-4">
      {desktop && (
        <Table
          DefaultTable={true}
          showOptions={true}
          showSearch={true}
          showSelectBoxes={true}
          numberSelectBox={numberSelectBox}
          headers={headers}
          renderRow={renderRow}
          data={clazz}
          maxRow={5}
        />
      )}
      {mobile && (
        <Table
          DefaultTable={true}
          showOptions={true}
          showSearch={true}
          showSelectBoxes={true}
          numberSelectBox={numberSelectBox}
          headers={header1s}
          renderRow={renderRow1}
          data={clazz}
          maxRow={5}
        />
      )}
    </div>
  );
}

export default OffedReplace;
