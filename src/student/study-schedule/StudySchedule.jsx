import React, { useState, useEffect } from "react";
import Table from "../../component/Table";
import Button from "../../component/Button";
import { getSchedule, calculateDates } from "../../api/ScheduleStudent";
import Container from "../../component/Container.tsx";
import TitleHeader from "../../component/TitleHeader.tsx";

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

  const [selectedDay, setSelectedDay] = useState(7);
  const [desktop, setDesktop] = useState(true);
  const [mobile, setMobile] = useState(false);
  const [scheduleData, setScheduleData] = useState([]);

  const handleDayChange = (event) => {
    const newSelectedDay = Number(event.target.value);
    if (isNaN(newSelectedDay)) {
      return;
    }
    setSelectedDay(newSelectedDay);
  };

  const numberSelectBox = [
    {
      options: [
        { value: 7, label: "7 ngày tới" },
        { value: 14, label: "14 ngày tới" },
        { value: 30, label: "30 ngày tới" },
      ],
      onChange: handleDayChange,
      value: selectedDay,
      className: "mr-1 w-full pt-4 md:pt-4",
      nameSelect: "Chọn thời gian",
      nameSelectValue: 7,
    },
  ];

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
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const { startTime, endTime } = calculateDates(selectedDay);
        const response = await getSchedule(startTime, endTime);
        if (response && response.data) {
          setScheduleData(response.data);
        }
      } catch (error) {
        console.error("Error fetching schedule data:", error);
      }
    };

    fetchSchedule();
  }, [selectedDay]);

  const renderRow = (item) => [
    <td key={`item-date-${item.id}`} className="px-6 py-4">
      {item.studyDate}
    </td>,
    <td key={`item-room-${item.id}`} className="px-6 py-4">
      {item.roomName}
    </td>,
    <td key={`item-code-${item.id}`} className="px-6 py-4">
      {item.subjectCode}
    </td>,
    <td key={`item-name-${item.id}`} className="px-6 py-4">
      {item.subjectName}
    </td>,
    <td key={`item-clazz-${item.id}`} className="px-6 py-4">
      {item.clazzCode}
    </td>,
    <td key={`item-instructor-${item.id}`} className="px-6 py-4">
      {item.instructorCode}
    </td>,
    <td key={`item-shift-${item.id}`} className="px-6 py-4">
      {item.shiftId}
    </td>,
    <td key={`item-time-${item.id}`} className="px-6 py-4">
      {item.start_time} - {item.end_time}
    </td>,
    <td key={`item-link-${item.id}`} className="px-6 py-4">
      <a href={item.link}>{item.link ? "Link" : "No Link"}</a>
    </td>,
  ];


  const renderRow1 = (item) => [
    <td key={`item-date-${item.id}`} className="px-6 py-4">
      {item.studyDate}
    </td>,
    <td key={`item-room-${item.id}`} className="px-6 py-4">
      {item.roomName}
    </td>,
    <td key={`item-name-${item.id}`} className="px-6 py-4">
      {item.subjectName}
    </td>,
    <td key={`item-shift-${item.id}`} className="px-6 py-4">
      {item.shiftId}
    </td>,
    <td key={`item-link-${item.id}`} className="px-6 py-4">
      <a href={item.link}>{item.link ? "Link" : "No Link"}</a>
    </td>,
  ];

  return (
    <Container>
    <TitleHeader title={"LỊCH HỌC"}/>
      <div className="py-4">
        {desktop && (
          <Table
            DefaultTable={true}
            showOptions={true}
            showSelectBox={true}
            optionsValue={numberSelectBox}
            headers={headers}
            renderRow={renderRow}
            data={scheduleData} 
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
            data={scheduleData} 
            maxRow={5}
          />
        )}
      </div>
    </Container>
  );
}

export default StudySchedule;
