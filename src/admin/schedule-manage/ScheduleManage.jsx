import MiniMenu from "../../component/MiniMenu";
import React, { useState, useEffect } from "react";
import Table from "../../component/Table";
import Button from "../../component/Button";
import Modal from "../../component/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faFileImport } from "@fortawesome/free-solid-svg-icons";
import FontGroup from "./FontGroup";

import { dates } from "./dates";
import TextFieldGroup from "./TextFieldGroup";

function ScheduleManage() {
  const options = [
    { value: "", label: "-Năm học-" },
    { value: "2024", label: "2024" },
    { value: "2023", label: "2023" },
    { value: "2022", label: "2022" },
  ];

  const options1 = [
    { value: "", label: "-Học kỳ-" },
    { value: "1", label: "Học kỳ 1" },
    { value: "2", label: "Học kỳ 2" },
  ];

  const options2 = [
    { value: "", label: "-Block-" },
    { value: "1", label: "Block 1" },
    { value: "2", label: "Block 2" },
  ];
  const headers = ["Mã lớp", "Mã môn", "Mã GV", "Ngày", "Ca", "Phòng", ""];

  const [selectedDate, setSelectedDate] = useState(null);
  const openModal = (dates) => setSelectedDate(dates);
  const closeModal = () => setSelectedDate(null);

  const renderRow = (item) => [
    <td key={`item-codeSubject-${item.id}`} className="px-6 py-4">
      {item.codeClass}
    </td>,
    <td key={`item-codeClass-${item.id}`} className="px-6 py-4">
      {item.codeSubject}
    </td>,
    <td key={`item-nameSubject-${item.id}`} className="px-6 py-4">
      {item.codeInstructor}
    </td>,
    <td key={`item-date-${item.id}`} className="px-6 py-4">
      {item.date}
    </td>,
    <td key={`item-ca-${item.id}`} className="px-6 py-4">
      {item.ca}
    </td>,
    <td key={`item-day-${item.id}`} className="px-6 py-4">
      {item.day}
    </td>,
    <td key={`item-mini-${item.id}`} className="px-6 py-4">
      <MiniMenu
        className="text-xs p-4 "
        iconMenu={faCaretDown}
        menuItems={[
          {
            text: "Chi tiết",
            onClick: () => {
              openModal(item);
              console.log(item);
            },
          },
          {
            text: "Sửa đổi",
            isDanger: false,
          },
        ]}
      />
    </td>,
  ];

  // const [flexCol, setFlexCol] = useState("");
  // const [flex1, setFlex1] = useState("w-[300px]");

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth <= 783) {
  //       setFlexCol("flex-col");
  //       setFlex1("flex-1");
  //     } else {
  //       setFlexCol("");
  //       setFlex1("w-[300px]");
  //     }
  //   };
  //   window.addEventListener("resize", handleResize);
  //   // Kiểm tra kích thước màn hình khi component được mount
  //   handleResize();
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, [flexCol, flex1]);

  return (
    <div className={`flex flex-col md:flex-row`}>
      <div className="p-2 flex-1">
        <Table
          showSearchWithManyCbo={true}
          optionsValue={options}
          showOption1={true}
          optionsValue1={options1}
          showOption2={true}
          optionsValue2={options2}
          advanced={false} // Ẩn Search bar
          showSelectBox={false} // Ẩn Select box
          headers={headers}
          renderRow={renderRow}
          data={dates}
          maxRow={10}
        />
        {selectedDate && (
          <Modal isOpen={true} onClose={closeModal} className="">
            <h2 className="text-xl font-bold">
              {selectedDate.codeClass} - {selectedDate.codeSubject}
            </h2>
            <div>
              <div className="w-[700px] h-[380px] border-t border-t-gray-500 mt-5 py-2">
                <TextFieldGroup
                  major={selectedDate.major}
                  codeClass={selectedDate.codeClass}
                  codeSubject={selectedDate.codeSubject}
                  codeInstructor={selectedDate.codeInstructor}
                  date={selectedDate.date}
                  ca={selectedDate.ca}
                  day={selectedDate.day}
                />
              </div>
            </div>
          </Modal>
        )}
      </div>
      <div className={`p-2 w-full md:w-[300px]`}>
        <div className="px-2">
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
        <FontGroup />
      </div>
    </div>
  );
}
export default ScheduleManage;
