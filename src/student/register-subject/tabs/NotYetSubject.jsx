import Table from "../../../component/Table";
import Button from "../../../component/Button";
import React, { useState, useEffect } from "react";
import {
  getClazzByStudent,
  postClazzByStudent,
} from "../../../api/ClazzStudent";
import { toast } from "react-toastify";
function NotYetSubject() {
  const [getclazz, setGetClazz] = useState([]);

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

  useEffect(() => {
    const fetchClazzByStudent = async () => {
      try {
        const response = await getClazzByStudent();
        if (response) {
          setGetClazz(response.data);
          console.log("data", response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchClazzByStudent();
  }, []);

  const handleRegister = async (clazzId) => {
    try {
      const response = await postClazzByStudent(clazzId);
      toast.success("Đăng ký thành công!");
      const updatedClazzes = await getClazzByStudent();
      setGetClazz(updatedClazzes.data);
    } catch (error) {
      toast.error("Đăng ký thất bại!");
    }
  };
  const renderRow = (item) => [
    <td key={`item-code-${item.id}`} className="px-6 py-4">
      {item.subjectCode}
    </td>,
    <td key={`item-name-${item.id}`} className="px-4 py-4">
      {item.subject_name}
    </td>,
    <td key={`item-credit-${item.id}`} className="px-6 py-4">
      {item.credits}
    </td>,
    <td key={`item-clazz-${item.id}`} className="px-6 py-4">
      {item.code}
    </td>,
    <td key={`item-amount-${item.id}`} className="px-6 py-4">
      {item.quantity}
    </td>,
    <td key={`item-available-${item.id}`} className="px-6 py-4">
      {item.quantity - item.amout}
    </td>,
    <td key={`item-shift-${item.id}`} className="px-6 py-4">
      {item.shift}
    </td>,
    <td key={`item-day_of_week-${item.id}`} className="px-4 py-4">
      {item.study_day}
    </td>,
    <td key={`item-time-${item.id}`} className="px-6 py-4">
      {item.start_time} - {item.end_time}
    </td>,
    <td key={`item-menu-${item.id}`} className="px-6 py-4">
      <Button
        label="Đăng ký"
        onClick={() => handleRegister(item.id)}
        className="bg-white font-bold text-blue-600 hover:bg-white hover:text-blue-700"
      />
    </td>,
  ];

  const renderRow1 = (item) => [
    <td key={`subject-code-${item.id}`} className="px-6 py-4">
      {item.subjectCode}
    </td>,
    <td key={`subject-name-${item.id}`} className="px-4 py-4">
      {item.subject_name}
    </td>,
    <td key={`class-code-${item.id}`} className="px-6 py-4">
      {item.code}
    </td>,
    <td key={`shift-${item.id}`} className="px-6 py-4">
      {item.shift}
    </td>,
    <td key={`study-day-${item.id}`} className="px-4 py-4">
      {item.study_day}
    </td>,
    <td key={`action-${item.id}`} className="px-6 py-4">
      <Button
        label="Đăng ký"
        onClick={() => handleRegister(item.id)}
        className="bg-white font-bold text-blue-600 hover:bg-white hover:text-blue-700"
      />
    </td>,
  ];

  const numberSelectBox = [
    {
      name: "Ngành",
      title: "Ngành",
      options: [{ value: "CNTT", label: "Công nghệ thông tin" }],
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
            searchClass="pr-20"
            showSelectBox={true}
            optionsValue={numberSelectBox}
            headers={headers}
            renderRow={renderRow}
            data={getclazz}
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
            showSelectBox={true}
            optionsValue={numberSelectBox}
            headers={header1s}
            renderRow={renderRow1}
            data={getclazz}
            maxRow={5}
          />
        </>
      )}
    </div>
  );
}
export default NotYetSubject;
