import Table from "../../component/Table";
import React, { useState, useEffect } from "react";
import Container from "../../component/Container.tsx";
import TitleHeader from "../../component/TitleHeader.tsx";

function StudyHistory() {
  const headers = [
    "Kỳ thứ",
    "Mã Môn Học",
    "Tên môn học",
    "Số Tín Chỉ",
    "Điểm",
    "Giảng viên",
    "Kết Quả",
  ];

  const header1s = ["Kỳ thứ", "Mã Môn Học", "Tên môn học", "Điểm", "Kết Quả"];

  const subjects = [
    {
      id: 1,
      study_semester: 1,
      code: "SOF301",
      name: "Java1",
      credit: 3,
      mark: 9,
      instructor: "vyta2",
    },
    {
      id: 2,
      study_semester: 1,
      code: "SOF302",
      name: "Java2",
      credit: 3,
      mark: 7,
      instructor: "binhtq4",
    },
  ];

  const renderRow = (item) => [
    <td key={`item-semester-${item.id}`} className="px-6 py-4">
      {item.study_semester}
    </td>,
    <td key={`item-code-${item.id}`} className="px-6 py-4">
      {item.code}
    </td>,
    <td key={`item-name-${item.id}`} className="px-6 py-4">
      {item.name}
    </td>,
    <td key={`item-credit-${item.id}`} className="px-6 py-4">
      {item.credit}
    </td>,
    <td key={`item-mark-${item.id}`} className="px-6 py-4">
      {item.mark}
    </td>,
    <td key={`item-instrutor-${item.id}`} className="px-6 py-4">
      {item.instructor}
    </td>,
    <td key={`item-result-${item.id}`} className="px-6 py-4">
      {item.mark < 5 ? (
        <p className="text-red-500">Failed</p>
      ) : (
        <p className="text-green-500">Passed</p>
      )}
    </td>,
  ];

  const renderRow1 = (item) => [
    <td key={`item-semester-${item.id}`} className="px-6 py-4">
      {item.study_semester}
    </td>,
    <td key={`item-code-${item.id}`} className="px-6 py-4">
      {item.code}
    </td>,
    <td key={`item-name-${item.id}`} className="px-6 py-4">
      {item.name}
    </td>,
    <td key={`item-mark-${item.id}`} className="px-6 py-4">
      {item.mark}
    </td>,
    <td key={`item-result-${item.id}`} className="px-6 py-4">
      {item.mark < 5 ? (
        <p className="text-red-500">Failed</p>
      ) : (
        <p className="text-green-500">Passed</p>
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

  return (
    <>
    <Container>
    <TitleHeader title={'LỊCH SỬ HỌC TẬP'}/>
      <div className="py-4">
        {desktop && (
          <>
            <Table
              DefaultTable={true}
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
              headers={header1s}
              renderRow={renderRow1}
              data={subjects}
              maxRow={5}
            />
          </>
        )}
      </div>

      <div className="flex flex-col text-sm">
        <p className="px-6 py-2">Điểm trung bình: </p>
        <p className="px-6 py-2">Số tín chỉ: </p>
      </div>
      </Container>
    </>
  );
}
export default StudyHistory;
