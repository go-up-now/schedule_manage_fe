import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChalkboardUser,
  faF,
  faGraduationCap,
  faPeopleGroup,
  faSchool,
} from "@fortawesome/free-solid-svg-icons";
import Container from "../../component/Container.tsx";
import TitleHeader from "../../component/TitleHeader.tsx";
import CustomLineChart from "./CustomLineChart.jsx";

//line chart

const data = [
  { name: "2019", student: 4000, pass: 2400, fail: 2400 },
  { name: "2020", student: 3000, pass: 1398, fail: 2210 },
  { name: "2021", student: 2000, pass: 9800, fail: 2290 },
  { name: "2022", student: 2780, pass: 3908, fail: 2000 },
  { name: "2023", student: 1890, pass: 4800, fail: 2181 },
  { name: "2024", student: 2390, pass: 3800, fail: 2500 },
];

const lines = [
  {
    dataKey: "student",
    stroke: "#8884d8",
    strokeWidth: 3,
    activeDot: { r: 8, fill: "#8884d8" },
    gradientId: "colorStudent",
  },
  {
    dataKey: "pass",
    stroke: "#82ca9d",
    strokeWidth: 3,
    activeDot: { r: 8, fill: "#82ca9d" },
    gradientId: "colorPass",
  },
  {
    dataKey: "fail",
    stroke: "#CA1D20",
    strokeWidth: 3,
    activeDot: { r: 8, fill: "#CA1D20" },
    gradientId: "colorFail",
  },
];

const gradients = [
  {
    id: "colorStudent",
    stops: [
      { offset: "5%", stopColor: "#8884d8", stopOpacity: 0.9 },
      { offset: "45%", stopColor: "#8884d8", stopOpacity: 0.5 },
      { offset: "95%", stopColor: "#8884d8", stopOpacity: 0.1 },
    ],
  },
];

//

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
  ];

  const stat = statistics[0];

  return (
    <Container>
      <TitleHeader title="THỐNG KÊ" />
      <div className="w-full mt-6 flex md:flex-row flex-col min-h-[500px]">
        <div className="w-3/12 flex flex-col items-center justify-between">
          <div className="w-full flex border items-center rounded-md">
            <FontAwesomeIcon icon={faPeopleGroup} className="w-3/12 text-3xl" />
            <div className="w-9/12 flex flex-col p-4">
              <p className="text-lg font-medium text-blue-500">
                Số lượng học viên
              </p>
              <p>{stat.student} học viên</p>
            </div>
          </div>
          <div className="w-full flex border items-center rounded-md">
            <FontAwesomeIcon
              icon={faChalkboardUser}
              className="w-3/12 text-3xl"
            />
            <div className="w-9/12 flex flex-col p-4">
              <p className="text-lg font-medium text-blue-500">
                Số lượng giảng viên
              </p>
              <p>{stat.instructor} giảng viên</p>
            </div>
          </div>
          <div className="w-full flex border items-center rounded-md">
            <FontAwesomeIcon icon={faSchool} className="w-3/12 text-3xl" />
            <div className="w-9/12 flex flex-col p-4">
              <p className="text-lg font-medium text-blue-500">
                Số lượng lớp hiện có
              </p>
              <p>{stat.clazz} lớp</p>
            </div>
          </div>
          <div className="w-full flex border items-center rounded-md">
            <FontAwesomeIcon
              icon={faGraduationCap}
              className="w-3/12 text-3xl"
            />
            <div className="w-9/12 flex flex-col p-4">
              <p className="text-lg font-medium text-blue-500">
                Học viên pass môn
              </p>
              <p>{stat.pass} học viên</p>
            </div>
          </div>
          <div className="w-full flex border items-center rounded-md">
            <FontAwesomeIcon icon={faF} className="w-3/12 text-3xl" />
            <div className="w-9/12 flex flex-col p-4">
              <p className="text-lg font-medium text-blue-500">
                Học viên fail môn
              </p>
              <p>{stat.fail} học viên</p>
            </div>
          </div>
        </div>

        <div className={`w-9/12 flex items-center`}>
          <CustomLineChart data={data} lines={lines} gradients={gradients} />
        </div>
      </div>
    </Container>
  );
}
export default Statistic;
