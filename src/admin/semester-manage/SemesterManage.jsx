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
import CheckBox from "../../component/CheckBox";

function SemesterManage() {
  const headers = ["Block", "Semester", "Year", "Active", ""];

  const [selectedDate, setSelectedDate] = useState(null);
  const openModal = (dates) => setSelectedDate(dates);
  const closeModal = () => setSelectedDate(null);

  const [activeDates, setActiveDates] = useState(
    dates.reduce((acc, date) => {
      acc[date.id] = date.active || false;
      return acc;
    }, {})
  );
  const handleCheckboxChange = (name, checked) => {
    setActiveDates((prevStates) => ({ ...prevStates, [name]: checked }));
  };

  const renderRow = (item) => [
    <td key={`item-block-${item.id}`} className="px-6 py-4">
      {item.block}
    </td>,
    <td key={`item-semester-${item.id}`} className="px-6 py-4">
      {item.semester}
    </td>,
    <td key={`item-year-${item.id}`} className="px-6 py-4">
      {item.year}
    </td>,
    <td key={`item-active-${item.id}`} className="px-6 py-4">
      <CheckBox
        id={`active-${item.id}`}
        name={`active-${item.id}`}
        checked={activeDates[`active-${item.id}`]}
        onChange={handleCheckboxChange}
      />
    </td>,
    <td key={`item-menu-${item.id}`} className="px-6 py-4">
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
          showSearchOnly={true}
          advanced={true} // Ẩn Search bar
          showSelectBox={false} // Ẩn Select box
          headers={headers}
          renderRow={renderRow}
          data={dates}
          maxRow={10}
        />
        {selectedDate && (
          <Modal isOpen={true} onClose={closeModal} className="">
            <h2 className="text-xl font-bold">
              {selectedDate.semester} - {selectedDate.year} - Block:{" "}
              {selectedDate.block}
            </h2>
            <div>
              <div className="w-[700px] h-[380px] border-t border-t-gray-500 mt-5 py-2">
                <TextFieldGroup
                  dateStart={selectedDate.dateStart}
                  dateEnd={selectedDate.dateEnd}
                  dateStartReady={selectedDate.dateStartReady}
                  dateEndReady={selectedDate.dateEndReady}
                  periodStart1={selectedDate.periodStart1}
                  periodEnd1={selectedDate.periodEnd1}
                  periodStart2={selectedDate.periodStart2}
                  periodEnd2={selectedDate.periodEnd2}
                />
              </div>
            </div>
          </Modal>
        )}
      </div>
      <div className={`p-2 w-full md:w-[300px]`}>
        <div className="px-2">
          <Button
            className="w-full p-2 text-white justify-center "
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
export default SemesterManage;
