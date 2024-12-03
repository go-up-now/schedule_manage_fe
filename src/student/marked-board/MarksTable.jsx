import React, { useState, useEffect } from "react";
import Table from "../../component/Table";
import { getMarkDetail } from "../../api/StudyResult.js";

function MarkedTable({ clazzId, subjectId }) {
  const headers = ["Tên đầu điểm", "Trọng số", "Điểm", "Ghi chú"];

  const renderRow = (item) => [
    <td key={`item-markColumnName-${item.id}`} className="px-6 py-4">
      {item.markColumnName}
    </td>,
    <td key={`item-percentage-${item.id}`} className="px-6 py-4">
      {item.percentage}
    </td>,
    <td key={`item-mark-${item.id}`} className="px-6 py-4">
      {item.mark}
    </td>,
    <td key={`item-note-${item.id}`} className="px-6 py-4"></td>,
  ];

  const [markDetail, setMarkDetail] = useState([]);
  const [number, setNumber] = useState(20);
  useEffect(() => {
    if (clazzId && subjectId) {
      getMarkDetail(clazzId, subjectId)
        .then((response) => {
          setMarkDetail(response);
          setNumber(response.length);
        })
        .catch((error) => {
          console.error("Error fetching clazz:", error);
        });
    }
  }, [clazzId, subjectId, number]);
  //setNumber(markDetail.length);
  if (!markDetail) return <p>Loading...</p>;
  console.log(number);

  return (
    <>
      <Table
        DefaultTable={true}
        showTurnPage={false}
        headers={headers}
        renderRow={renderRow}
        data={markDetail}
        maxRow={number}
      />
    </>
  );
}

export default MarkedTable;
