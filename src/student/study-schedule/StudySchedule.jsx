import React, { useState, useEffect } from "react";
import Table from "../../component/Table";
import Accordion from "../../component/Accordion";
import Button from "../../component/Button";
import { subjects } from "./clazz";

function StudySchedule() {
  const headers = [
    "Ngày",
    "Phòng",
    "Mã môn",
    "Môn",
    "Lớp",
    "Giảng viên",
    "Ca",
    "Thời Gian",
    "Link học trực tuyến",
  ];

  const header1s = ["Ngày", "Phòng", "Môn", "Ca", "Link học trực tuyến"];

  const subjects = [
    {
      id: 1,
      date: "Thứ Hai 27/10/2024",
      room: "T804 (Nhà T)",
      code: "SOFT306",
      name: "Java6",
      clazz: "SD18301",
      instructor: "liemht6",
      shift: 1,
      time: "07:15:00 - 09:15:00",
      link: "",
    },
    {
      id: 2,
      date: "Thứ Ba 28/10/2024",
      room: "T804 (Nhà T)",
      code: "PDP201",
      name: "Phát triển cá nhân 2",
      clazz: "SD18301",
      instructor: "lynk18",
      shift: 1,
      time: "07:15:00 - 09:15:00",
      link: "",
    },
    {
      id: 3,
      date: "Thứ Tư 29/10/2024",
      room: "Online",
      code: "SOFT306",
      name: "Java6",
      clazz: "SD18301",
      instructor: "liemht6",
      shift: 10,
      time: "22:00:00 - 00:00:00",
      link: "",
    },
    {
      id: 4,
      date: "Thứ Năm 30/10/2024",
      room: "T804 (Nhà T)",
      code: "PDP201",
      name: "Phát triển cá nhân 2",
      clazz: "SD18301",
      instructor: "lynk18",
      shift: 1,
      time: "07:15:00 - 09:15:00",
      link: "",
    },
    {
      id: 5,
      date: "Thứ Sáu 01/11/2024",
      room: "Online",
      code: "SOFT306",
      name: "Java6",
      clazz: "SD18301",
      instructor: "liemht6",
      shift: 10,
      time: "22:00:00 - 00:00:00",
      link: "",
    },
    {
      id: 6,
      date: "Thứ Bảy 02/11/2024",
      room: "T804 (Nhà T)",
      code: "PDP201",
      name: "Phát triển cá nhân 2",
      clazz: "SD18301",
      instructor: "lynk18",
      shift: 1,
      time: "07:15:00 - 09:15:00",
      link: "",
    },
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
    <td key={`item-link-${item.id}`} className="px-6 py-4">
      <a href={`${item.link}`}></a>
    </td>,
  ];

  const renderRow1 = (item) => [
    <td key={`item-date-${item.id}`} className="px-6 py-4">
      {item.date}
    </td>,
    <td key={`item-room-${item.id}`} className="px-6 py-4">
      {item.room}
    </td>,
    <td key={`item-name-${item.id}`} className="px-6 py-4">
      {item.name}
    </td>,
    <td key={`item-shift-${item.id}`} className="px-6 py-4">
      {item.shift}
    </td>,
    <td key={`item-link-${item.id}`} className="px-6 py-4">
      <a href={`${item.link}`}></a>
    </td>,
  ];

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

  const [desktop, setDesktop] = useState(true);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 783) {
        setMobile(true);
        setDesktop(false);
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

  // const items = subjects.map((item) => ({
  //   title: `${item.date}`,
  //   content: (
  //     <div>
  //       {item.Ca.map((ca) => (
  //         <div className="flex items-center justify-between border py-3 px-2 my-2">
  //           <div className="flex flex-col">
  //             <div>
  //               <span className="text-[18px] font-medium">Ca {ca.id}</span> -
  //               <span className="text-[18px] font-medium">{ca.clazz.room}</span>
  //             </div>
  //             <h3 className="text-[16px]">{ca.clazz.code}</h3>
  //             <h3 className="text-[16px] truncate">{ca.clazz.subject.name}</h3>
  //           </div>
  //           <div className="flex ">
  //             <Button
  //               key={ca.id}
  //               label="Link Onl"
  //               className="text-white p-1 mx-1 text-[16px]"
  //             />
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   ),
  // }));

  return (
    <div className="py-4">
      {desktop && (
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
      )}
      {mobile && (
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
      )}
      {/* {mobile && <Accordion items={items} maxRow={7} />} */}
    </div>
  );
}
export default StudySchedule;
