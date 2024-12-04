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

function Statistic() {
  const boxInfos = [
    {
      name: "Số lượng lớp đã mở",
      icon: faSchool,
      value: 5690,
    },
    {
      name: "Số lượng giảng viên",
      icon: faChalkboardUser,
      value: 1250,
    },
    {
      name: "Số lượng học viên",
      icon: faPeopleGroup,
      value: 76190,
    },
    {
      name: "Học viên pass môn",
      icon: faGraduationCap,
      value: 66320,
    },
    {
      name: "Học viên fail môn",
      icon: faF,
      value: 9870,
    },
  ];

  const [flexCol, setFlexCol] = useState("");
  const [flexWrap, setFlexWrap] = useState("w-full justify-between");

  const [desktop, setDesktop] = useState(true);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1024) {
        setFlexCol("flex-col items-center");
        setFlexWrap("w-full flex-col");
        setDesktop(false);
        setMobile(true);
      } else {
        setFlexCol("");
        setFlexWrap("w-full justify-between");
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
  }, [flexCol, flexWrap, desktop, mobile]);

  return (
    <Container>
      <TitleHeader title="THỐNG KÊ" />
      <div className="w-full">
        <div className={`p-2 ${flexCol}`}>
          {desktop && (
            <div className="flex justify-between">
              {boxInfos.map((box, index) => (
                <div
                  key={index}
                  style={{ width: `calc(100% / ${boxInfos.length})` }}
                  className={`flex-1 p-4`}
                >
                  <div className="border rounded-md">
                    <div className="flex items-center p-6 justify-between my-2">
                      <FontAwesomeIcon
                        className="w-14 h-14"
                        icon={box.icon}
                        size="xl"
                      />
                      <span className="text-lg font-medium">{box.value}</span>
                    </div>
                    <div className="font-medium flex justify-center p-2 my-2">
                      {box.name}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {mobile && (
            <div className="">
              {boxInfos.map((box, index) => (
                <div key={index} className={`mb-1`}>
                  <div className="border rounded-md w-full flex items-center justify-between p-2">
                    <FontAwesomeIcon
                      className="w-12 h-12"
                      icon={box.icon}
                      size="xl"
                    />
                    <span className="text-lg font-medium">{box.value}</span>
                    {box.name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={`flex h-full items-end ${flexCol}`}>
          <LineChart className="flex-1 h-full items-end" />

          <div className="flex-col flex-1">
            <div className="p-2">
              <div className="">
                <PieChartTeacher className="w-2/6" />
              </div>
              <div>
                <BarCharts className="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
export default Statistic;
