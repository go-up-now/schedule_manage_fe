import Table from "../../component/Table";
import React, { useState, useEffect } from "react";
import Container from "../../component/Container.tsx";
import TitleHeader from "../../component/TitleHeader.tsx";
import { getAllStudyResult } from "../../api/StudyResult.js";
function StudyHistory() {
  const headers = [
    "Lớp học",
    "Mã Môn Học",
    "Tên môn học",
    "Số tín chỉ",
    "Block",
    "Semester",
    "Year",
    "Điểm",
    "Kết Quả",
  ];

  const header1s = [
    "Lớp học",
    "Mã Môn Học",
    "Tên môn học",
    "Số tín chỉ",
    "Block",
    "Semester",
    "Year",
    "Điểm",
    "Kết Quả",
  ];

  // const subjects = [
  //   {
  //     id: 1,
  //     study_semester: 1,
  //     code: "SOF301",
  //     name: "Java1",
  //     credit: 3,
  //     mark: 9,
  //     instructor: "vyta2",
  //   },
  //   {
  //     id: 2,
  //     study_semester: 1,
  //     code: "SOF302",
  //     name: "Java2",
  //     credit: 3,
  //     mark: 7,
  //     instructor: "binhtq4",
  //   },
  // ];

  const renderRow = (item) => [
    <td key={`item-clazzCode-${item.id}`} className="px-6 py-4">
      {item.clazz_code}
    </td>,
    <td key={`item-subjectCode-${item.id}`} className="px-6 py-4">
      {item.subject_code}
    </td>,
    <td key={`item-subjectName-${item.id}`} className="px-6 py-4">
      {item.subject_name}
    </td>,
    <td key={`item-credit-${item.id}`} className="px-6 py-4">
      {item.subject_credits}
    </td>,
    <td key={`item-block-${item.id}`} className="px-6 py-4">
      {item.block}
    </td>,
    <td key={`item-semester-${item.id}`} className="px-6 py-4">
      {item.semester}
    </td>,
    <td key={`item-year-${item.id}`} className="px-6 py-4">
      {item.year}
    </td>,
    <td key={`item-mark-${item.id}`} className="px-6 py-4">
      {Math.round(item.marked_avg * 10) / 10}
    </td>,
    <td key={`item-result-${item.id}`} className="px-6 py-4 font">
      {item.marked_avg < 5 ? (
        <p className="text-red-500 font-bold">Failed</p>
      ) : (
        <p className="text-green-500 font-bold">Passed</p>
      )}
    </td>,
  ];

  const renderRow1 = (item) => [
    <td key={`item-clazzCode-${item.id}`} className="px-6 py-4">
      {item.clazz_code}
    </td>,
    <td key={`item-subjectCode-${item.id}`} className="px-6 py-4">
      {item.subject_code}
    </td>,
    <td key={`item-subjectName-${item.id}`} className="px-6 py-4">
      {item.subject_name}
    </td>,
    <td key={`item-credit-${item.id}`} className="px-6 py-4">
      {item.subject_credits}
    </td>,
    <td key={`item-block-${item.id}`} className="px-6 py-4">
      {item.block}
    </td>,
    <td key={`item-semester-${item.id}`} className="px-6 py-4">
      {item.semester}
    </td>,
    <td key={`item-year-${item.id}`} className="px-6 py-4">
      {item.year}
    </td>,
    <td key={`item-mark-${item.id}`} className="px-6 py-4">
      {Math.round(item.marked_avg * 10) / 10}
    </td>,
    <td key={`item-result-${item.id}`} className="px-6 py-4 font">
      {item.marked_avg < 5 ? (
        <p className="text-red-500 font-bold">Failed</p>
      ) : (
        <p className="text-green-500 font-bold">Passed</p>
      )}
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

  const [mark, setMark] = useState([]);
  const [averageMark, setAverageMark] = useState(0);
  const [credit, setCredists] = useState(0);
  useEffect(() => {
    const marks = studyResult.map((item) => item.marked_avg); // Tạo mảng chứa các giá trị marked_avg
    setMark(marks);

    // Tính tổng và trung bình
    const total = marks.reduce((sum, value) => sum + value, 0); // Tổng các giá trị
    const average = marks.length > 0 ? total / marks.length : 0; // Trung bình
    setAverageMark(Math.round(average * 10) / 10); // Cập nhật giá trị trung bình

    const credits = studyResult.map((item) => item.subject_credits); // Tạo mảng chứa các giá trị marked_avg
    setCredists(credits);

    // Tính tổng và trung bình
    const totalCredits = credits.reduce((sum, value) => sum + value, 0); // Tổng các giá trị// Trung bình
    setCredists(totalCredits); // Cập nhật giá trị trung bình
  }, [studyResult]);
  return (
    <>
      <Container>
        <TitleHeader title={"LỊCH SỬ HỌC TẬP"} />
        <div className="py-4">
          {desktop && (
            <>
              <Table
                DefaultTable={true}
                headers={headers}
                renderRow={renderRow}
                data={studyResult}
                maxRow={10}
              />
            </>
          )}
          {mobile && (
            <>
              <Table
                DefaultTable={true}
                headers={header1s}
                renderRow={renderRow1}
                data={studyResult}
                maxRow={10}
              />
            </>
          )}
        </div>

        <div className="flex flex-col text-sm w-full">
          <div className="h-10">
            <span className="px-6 py-2 mr-1 text-base">Điểm trung bình</span>
            <span className="font-medium text-base">{` ${averageMark}`}</span>
          </div>
          <div className="h-10">
            <span className="px-6 py-2 mr-14 text-base">Số tín chỉ </span>
            <span className="font-medium text-base">{` ${credit}`}</span>
          </div>
        </div>
      </Container>
    </>
  );
}
export default StudyHistory;
