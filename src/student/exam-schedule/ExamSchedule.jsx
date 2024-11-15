import Table from "../../component/Table";
import React, { useState, useEffect } from "react";
function ExamSchedule() {
  const numberSelectBox = [
    {
      name: "Thời gian",
      title: "Thời gian",
      options: [
        { value: "7", label: "7 ngày tới" },
        { value: "14", label: "14 ngày tới" },
        { value: "30", label: "30 ngày tới" },
      ],
    },
  ];

  const headers = [
    "Ngày",
    "Phòng",
    "Mã môn học",
    "Tên môn học",
    "Lớp",
    "Giảng viên",
    "Ca",
    "Thời Gian",
    "Lý do cấm thi",
  ];

  const header1s = [
    "Ngày",
    "Phòng",
    "Mã môn học",
    "Lớp",
    "Ca",
    "Lý do cấm thi",
  ];

  const subjects = [
    // { id: 1, date: "Thứ Hai 25/10/2024", room: "T804 (Nhà T)", code: "PTCN2", name: "Phát triển cá nhân 2", clazz: "SD18301", instructor: "liemht6", shift: 1, time: "07:15:00 - 09:15:00", reason:"" },
  ];

  const renderRow = (item) => [
    <td key={`item-date-${item.id}`} className="px-6 py-4">
      {item.date}
    </td>,
    <td key={`item-room-${item.id}`} className="px-6 py-4">
      {item.room}
    </td>,
    <td key={`item-code-${item.id}`} className="px-6 py-4">
      {item.code}
    </td>,
    <td key={`item-name-${item.id}`} className="px-6 py-4">
      {item.name}
    </td>,
    <td key={`item-clazz-${item.id}`} className="px-6 py-4">
      {item.clazz}
    </td>,
    <td key={`item-instructor-${item.id}`} className="px-6 py-4">
      {item.instructor}
    </td>,
    <td key={`item-shift-${item.id}`} className="px-6 py-4">
      {item.shift}
    </td>,
    <td key={`item-time-${item.id}`} className="px-6 py-4">
      {item.time}
    </td>,
  ];

  const renderRow1 = (item) => [
    <td key={`item-date-${item.id}`} className="px-6 py-4">
      {item.date}
    </td>,
    <td key={`item-room-${item.id}`} className="px-6 py-4">
      {item.room}
    </td>,
    <td key={`item-code-${item.id}`} className="px-6 py-4">
      {item.code}
    </td>,
    <td key={`item-clazz-${item.id}`} className="px-6 py-4">
      {item.clazz}
    </td>,
    <td key={`item-shift-${item.id}`} className="px-6 py-4">
      {item.shift}
    </td>,
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
    <div className="py-4">
      {desktop && (
        <>
          <Table
            DefaultTable={true}
            showOptions={true}
            showSelectBox={true}
            optionsValue={numberSelectBox}
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
            showSelectBox={true}
            optionsValue={numberSelectBox}
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
export default ExamSchedule;
