import Table from "../../../component/Table";
import Button from "../../../component/Button";
import React, { useState, useEffect } from "react";
import Container from "../../../component/Container.tsx";
import { toast } from "react-toastify";
const subjects = [
  {
    code_subject: "COM107",
    name_subject: "Tin học",
    credit_subject: 3,
    code_clazz: "SD18301",
    shift: 1,
    day_of_week: "Monday, Wednesday, Friday",
    status: false,
  },
  {
    code_subject: "SKI101",
    name_subject: "Lập trình cơ bản",
    credit_subject: 3,
    code_clazz: "SD18302",
    shift: 2,
    day_of_week: "Tuesday, Thursday, Saturday",
    status: true,
  },
];

function PlanSubject() {
  const headers = [
    "Mã môn",
    "Môn",
    "Số tín chỉ",
    "Lớp",
    "Ca",
    "Thứ",
    "Trạng thái",
    "",
    "",
  ];

  const header1s = ["Môn", "Lớp", "Ca", "Thứ", "", ""];

  const renderRow = (item) => [
    <td key={`item-code_subject-${item.id}`} className="px-4 py-4">
      {item.code_subject}
    </td>,
    <td key={`item-name_subject-${item.id}`} className="px-4 py-4">
      {item.name_subject}
    </td>,
    <td key={`item-credit_subject-${item.id}`} className="px-6 py-4">
      {item.credit_subject}
    </td>,
    <td key={`item-code_clazz-${item.id}`} className="px-6 py-4">
      {item.code_clazz}
    </td>,
    <td key={`item-shift-${item.id}`} className="px-6 py-4">
      {item.shift}
    </td>,

    <td key={`item-day_of_week-${item.id}`} className="px-4 py-4">
      {item.day_of_week}
    </td>,
    <td key={`item-status-${item.id}`} className="px-6 py-4">
      {item.status ? (
        <>
          <p className="text-green-500">Đã Thanh toán</p>
        </>
      ) : (
        <>
          <p className="text-red-500">Chưa thanh toán</p>
        </>
      )}
    </td>,
    <td key={`item-paid-${item.id}`} className="px-0 py-4">
      <Button
        label="Thanh toán"
        className=" text-white justify-center p-2"
        disabled={item.status}
        onClick={() => handlePaid(item)}
      />
    </td>,
    <td key={`item-menu-${item.id}`} className="px-4 py-4">
      {item.status ? (
        <></>
      ) : (
        <>
          <Button
            label="Huỷ"
            className="bg-white font-bold text-red-500 hover:bg-white "
            onClick={() => handleDelete(item)}
          />
        </>
      )}
    </td>,
  ];

  const renderRow1 = (item) => [
    <td key={`item-name_subject-${item.id}`} className="px-1 py-4">
      {item.name_subject}
    </td>,
    <td key={`item-code_clazz-${item.id}`} className="px-1 py-4">
      {item.code_clazz}
    </td>,
    <td key={`item-shift-${item.id}`} className="px-1 py-4">
      {item.shift}
    </td>,

    <td key={`item-day_of_week-${item.id}`} className="px-1 py-4">
      {item.day_of_week}
    </td>,
    <td key={`item-paid-${item.id}`} className="px-4 py-4">
      <Button
        label="Thanh toán"
        className=" text-white justify-center p-1"
        disabled={item.status}
        onClick={() => handlePaid(item)}
      />
    </td>,
    <td key={`item-menu-${item.id}`} className="px-6 py-4">
      <Button
        label="Huỷ"
        className="bg-white font-bold text-red-500 hover:bg-white "
        disabled={item.status}
        onClick={() => handleDelete(item)}
      />
    </td>,
  ];

  const [selectedMajor, setSelectedMajor] = useState(null);

  const handleMajorChange = (event) => {
    setSelectedMajor(event.target.value);
  };

  // RESPONSIVE
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

  // THAO TÁC THANH TOÁN VÀ HUỶ ĐĂNG KÝ
  const handlePaid = (item) => {
    try {
      toast.success("Thanh toán thành công!");
      //console.log("Registration successful:", response);
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1500);
    } catch (error) {
      toast.error("Thanh toán không thành công!");
      //console.error("Registration error:", error);
    }
  };

  const handleDelete = (item) => {
    try {
      toast.success("Huỷ đăng ký thành công!");
      //console.log("Registration successful:", response);
      // setTimeout(() => {
      //   window.location.reload();
      // }, 1500);
    } catch (error) {
      toast.error("Huỷ đăng ký không thành công!");
      //console.error("Registration error:", error);
    }
  };
  return (
    <div className="">
      {desktop && (
        <>
          <Table
            DefaultTable={true}
            showOptions={true}
            showSearch={true}
            showSelectBox={true}
            showBtnEnd={true}
            headers={headers}
            renderRow={renderRow}
            data={subjects}
            maxRow={10}
          />
        </>
      )}
      {mobile && (
        <>
          <Table
            DefaultTable={true}
            showOptions={true}
            showSearch={true}
            showSelectBox={true}
            headers={header1s}
            renderRow={renderRow1}
            data={subjects}
            maxRow={10}
          />
        </>
      )}
    </div>
  );
}
export default PlanSubject;
