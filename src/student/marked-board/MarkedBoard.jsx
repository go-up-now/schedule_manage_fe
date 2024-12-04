import React, { useState, useEffect } from "react";
import Container from "../../component/Container.tsx";
import TitleHeader from "../../component/TitleHeader.tsx";
import { getAllStudyResult } from "../../api/StudyResult.js";
import Accordion from "../../component/Accordion.jsx";
import Button from "../../component/Button.jsx";
import MarkedTable from "./MarksTable.jsx";
import "./style.css";
function MarkedBoard() {
  //call api
  const [studyResult, setStudyResult] = useState([]);
  useEffect(() => {
    getAllStudyResult()
      .then((data) => {
        setStudyResult(data);
      })
      .catch((error) => {
        console.error("Error fetching exam:", error);
      });
  }, []);
  console.log(studyResult);

  return (
    <>
      <Container>
        <TitleHeader title={"BẢNG ĐIỂM"} />
        <div className="mb-4"></div>
        <Accordion
          items={studyResult.map((item) => ({
            title: (
              <>
                <table className="style text-sm">
                  <tbody>
                    <tr>
                      <th>Mã môn</th>
                      <th>Tên môn</th>
                      <th>Trung bình</th>
                      <th>Trạng thái</th>
                    </tr>
                    <tr>
                      <td>{item.subject_code}</td>
                      <td>{item.subject_name}</td>
                      <td>{Math.round(item.marked_avg * 10) / 10}</td>
                      <td>
                        {item.marked_avg < 5 ? (
                          <p className="text-red-500 font-bold">Failed</p>
                        ) : (
                          <p className="text-green-500 font-bold">Passed</p>
                        )}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </>
            ),
            content: (
              <>
                <MarkedTable
                  clazzId={item.clazz_id}
                  subjectId={item.subject_id}
                />
                <div className="flex justify-between h-[40px]">
                  <div className="w-6/12 flex items-center justify-center border-l border-b">
                    <p className="font-medium text-sm">Điểm Trung Bình</p>
                  </div>
                  <div className="w-6/12 flex items-center border-b border-l border-r">
                    <div className="w-full  text-center">
                      <p className="font-medium text-sm">
                        {Math.round(item.marked_avg * 10) / 10}
                      </p>
                    </div>
                  </div>
                </div>
              </>
            ),
          }))}
          maxRow={5}
        />
      </Container>
    </>
  );
}
export default MarkedBoard;
