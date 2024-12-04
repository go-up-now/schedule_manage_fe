import Table from "../../../component/Table";
import Button from "../../../component/Button";
import React, { useState, useEffect } from "react";
import Container from "../../../component/Container.tsx";
function PlanSubject() {
  const headers = [
    "Mã môn",
    "Môn",
    "Số tín chỉ",
    "Lớp",
    "Số lượng",
    "Còn lại",
    "Ca",
    "Thứ",
    "Thời gian",
    " ",
  ];

  const header1s = ["Mã môn", "Môn", "Lớp", "Ca", "Thứ", " "];

  const subjects = [
    {
      id: 1,
      code: "COM107",
      name: "Tin học",
      credit: 3,
      clazz: "SD18301",
      amount: 40,
      available: 30,
      shift: 1,
      day_of_week: "2, 4, 6",
      time: "07:15:00 - 09:15:00",
    },
    {
      id: 2,
      code: "SKI105",
      name: "Kỹ năng học tập",
      credit: 3,
      clazz: "SD18301",
      amount: 40,
      available: 19,
      shift: 1,
      day_of_week: "3, 5, 7",
      time: "07:15:00 - 09:15:00",
    },
  ];

  const renderRow = (item) => [
    <td key={`item-code-${item.id}`} className="px-6 py-4">
      {item.code}
    </td>,
    <td key={`item-name-${item.id}`} className="px-4 py-4">
      {item.name}
    </td>,
    <td key={`item-credit-${item.id}`} className="px-6 py-4">
      {item.credit}
    </td>,
    <td key={`item-clazz-${item.id}`} className="px-6 py-4">
      {item.clazz}
    </td>,
    <td key={`item-amount-${item.id}`} className="px-6 py-4">
      {item.amount}
    </td>,
    <td key={`item-available-${item.id}`} className="px-6 py-4">
      {item.available}
    </td>,
    <td key={`item-shift-${item.id}`} className="px-6 py-4">
      {item.shift}
    </td>,
    <td key={`item-day_of_week-${item.id}`} className="px-4 py-4">
      {item.day_of_week}
    </td>,
    <td key={`item-time-${item.id}`} className="px-6 py-4">
      {item.time}
    </td>,
    <td key={`item-menu-${item.id}`} className="px-6 py-4">
      <Button
        label="Huỷ"
        className="bg-white font-bold text-red-600 hover:bg-white hover:text-red-700"
      />
    </td>,
  ];

  const renderRow1 = (item) => [
    <td key={`item-code-${item.id}`} className="px-6 py-4">
      {item.code}
    </td>,
    <td key={`item-name-${item.id}`} className="px-4 py-4">
      {item.name}
    </td>,
    <td key={`item-clazz-${item.id}`} className="px-6 py-4">
      {item.clazz}
    </td>,
    <td key={`item-shift-${item.id}`} className="px-6 py-4">
      {item.shift}
    </td>,
    <td key={`item-day_of_week-${item.id}`} className="px-4 py-4">
      {item.day_of_week}
    </td>,
    <td key={`item-menu-${item.id}`} className="px-6 py-4">
      <Button
        label="Huỷ"
        className="bg-white font-bold text-red-600 hover:bg-white hover:text-red-700"
      />
    </td>,
  ];

  const [selectedMajor, setSelectedMajor] = useState(null);

  const handleMajorChange = (event) => {
    setSelectedMajor(event.target.value);
  };

  const selectBoxs = [
    {
      options: [
        { value: 1, label: "Công nghệ thông tin" },
        { value: 2, label: "Lập trình web" },
      ],
      nameSelect: "Bộ môn",
      onChange: handleMajorChange,
      value: selectedMajor,
      className: "mr-1 w-[200px] pt-4 md:pt-4",
    },
  ];

  const [desktop, setDesktop] = useState(true);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 783) {
        setMobile(true);
        setDesktop(false);
      } else {
        setMobile(false);
        setDesktop(true);
      }
    };
    window.addEventListener("resize", handleResize);
    // Kiểm tra kích thước màn hình khi component được mount
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mobile, desktop]);

  return (
    <div className="">
      {desktop && (
        <>
          <Table
            DefaultTable={true}
            showOptions={true}
            showSearch={true}
            showSelectBoxes={true}
            numberSelectBox={selectBoxs}
            showBtnEnd={true}
            headers={headers}
            renderRow={renderRow}
            data={subjects}
            maxRow={5}
          />
        </>
      )}
      {mobile && (
        <>
          <Table
            DefaultTable={true}
            showOptions={true}
            showSearch={true}
            searchClass="pr-20"
            showSelectBoxes={true}
            numberSelectBox={selectBoxs}
            headers={header1s}
            renderRow={renderRow1}
            data={subjects}
            maxRow={5}
          />
        </>
      )}
    </div>
  );
}
export default PlanSubject;
