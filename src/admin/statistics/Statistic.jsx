import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardUser,
  faF,
  faGraduationCap,
  faPeopleGroup,
  faSchool,
} from "@fortawesome/free-solid-svg-icons";
import BarCharts from "./BarCharts";
import PieChartTeacher from "./PieChartTeacher";
import LineChart from "./LineChart";
import Container from "../../component/Container.tsx";
import TitleHeader from "../../component/TitleHeader.tsx";
import Table from "../../component/Table.jsx";
import BiaxialLineChart from "./BiaxialLineChart.jsx";
function Statistic() {
  const statistics = [
    {
      year: 2024,
      student: 12345,
      instructor: 12345,
      clazz: 123,
      pass: 1234,
      fail: 987,
    },
    {
      year: 2024,
      student: 12345,
      instructor: 12345,
      clazz: 123,
      pass: 1234,
      fail: 987,
    },
    {
      year: 2024,
      student: 12345,
      instructor: 12345,
      clazz: 123,
      pass: 1234,
      fail: 987,
    },
    {
      year: 2024,
      student: 12345,
      instructor: 12345,
      clazz: 123,
      pass: 1234,
      fail: 987,
    },
    {
      year: 2024,
      student: 12345,
      instructor: 12345,
      clazz: 123,
      pass: 1234,
      fail: 987,
    },
    {
      year: 2024,
      student: 12345,
      instructor: 12345,
      clazz: 123,
      pass: 1234,
      fail: 987,
    },
  ];

  const headers = [
    "Năm",
    "Học viên",
    "Giảng viên",
    "Lớp",
    "Pass môn",
    "Fail môn",
  ];

  const renderRow = (item) => [
    <td key={`item-year-${item.id}`} className=" border-b">
      {item.year}
    </td>,
    <td key={`item-student-${item.id}`} className=" border-b">
      {item.student}
    </td>,
    <td key={`item-instructor-${item.id}`} className=" border-b">
      {item.instructor}
    </td>,
    <td key={`item-clazz-${item.id}`} className=" border-b">
      {item.clazz}
    </td>,
    <td key={`item-pass-${item.id}`} className=" border-b">
      {item.pass}
    </td>,
    <td key={`item-fail-${item.id}`} className=" border-b">
      {item.fail}
    </td>,
  ];

  const row = statistics.length;

  return (
    <Container>
      <TitleHeader title="THỐNG KÊ" />
      <div className="w-full mt-2">
        <div
          className={`max-h-[245px] overflow-y-scroll no-scrollbar relative`}
        >
          <Table
            DefaultTable={true}
            headers={headers}
            renderRow={renderRow}
            showTurnPage={false}
            data={statistics}
            maxRow={row}
            StickyHeader={true}
          />
        </div>

        <div className={`flex mt-4`}>
          <div className="w-7/12 h-full">
            <BiaxialLineChart />
          </div>

          <div className="w-5/12 flex items-center">
            <PieChartTeacher />
          </div>
        </div>
      </div>
    </Container>
  );
}
export default Statistic;
