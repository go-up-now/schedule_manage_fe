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

function StudentManage() {
  const options = [
    { value: "", label: "-Khoá-" },
    { value: "18.1", label: "18.1" },
    { value: "18.2", label: "18.2" },
    { value: "18.3", label: "18.3" },
  ];

  const options1 = [
    { value: "", label: "-Ngành-" },
    { value: "CNTT", label: "CNTT" },
    { value: "KT", label: "Kinh tế" },
  ];

  const headers = ["Mã lớp", "Mã SV", "Mã SV", "Số tín chỉ", ""];

  const [selectedStudent, setSelectedStudent] = useState(null);
  const openModal = (dates) => setSelectedStudent(dates);
  const closeModal = () => setSelectedStudent(null);

  const renderRow = (item) => [
    <td key={`item-clazz-${item.id}`} className="px-6 py-4">
      {item.clazz}
    </td>,
    <td key={`item-code-${item.id}`} className="px-6 py-4">
      {item.code}
    </td>,
    <td key={`item-name-${item.id}`} className="px-6 py-4">
      {item.name}
    </td>,
    <td key={`item-ownCredit-${item.id}`} className="px-6 py-4">
      {item.ownCredit}
    </td>,
    <td key={`item-case-${item.id}`} className="px-6 py-4">
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
          advanced={false} // Ẩn Search bar
          showSelectBox={false} // Ẩn Select box
          headers={headers}
          renderRow={renderRow}
          data={dates}
          maxRow={10}
        />
        {selectedStudent && (
          <Modal isOpen={true} onClose={closeModal} className="">
            <h2 className="text-xl font-bold">
              {selectedStudent.name} - {selectedStudent.code}
            </h2>
            <div>
              <div className="w-[700px] h-[380px] border-t border-t-gray-500 mt-5 py-2">
                <TextFieldGroup
                  major={selectedStudent.major}
                  email={selectedStudent.email}
                  perEmail={selectedStudent.perEmail}
                  clazz={selectedStudent.clazz}
                  phone={selectedStudent.phone}
                  address={selectedStudent.address}
                  credit={selectedStudent.credit}
                  ownCredit={selectedStudent.ownCredit}
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
export default StudentManage;
