import Button from "../../component/Button";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Container from "../../component/Container.tsx";
import TitleHeader from "../../component/TitleHeader.tsx";

function ChangeSchedule() {
  const shifts = [1, 2, 3, 4, 5, 6];
  const location = useLocation();
  const { item } = location.state || {}; // Lấy item từ state

  const clazzs = [
    {
      code: "SD18302",
      week_days: "2",
      room: "T1110 (Tòa T)",
      start_date: "28/10/2024",
      count_student: 32,
      shift: 2,
    },
    {
      code: "SD18304",
      week_days: "3",
      room: "T1101 (Tòa T)",
      start_date: "29/10/2024",
      count_student: 38,
      shift: 3,
    },
    {
      code: "SD18306",
      week_days: "4",
      room: "T1102 (Tòa T)",
      start_date: "30/10/2024",
      count_student: 40,
      shift: 3,
    },
    {
      code: "SD18307",
      week_days: "6",
      room: "T1105 (Tòa T)",
      start_date: "01/11/2024",
      count_student: 31,
      shift: 3,
    },
    {
      code: "SD18309",
      week_days: "5",
      room: "T1101 (Tòa T)",
      start_date: "31/10/2024",
      count_student: 40,
      shift: 5,
    },
    {
      code: "SD18310",
      week_days: "7",
      room: "T1108 (Tòa T)",
      start_date: "02/11/2024",
      count_student: 36,
      shift: 5,
    },
    {
      code: "SD18312",
      week_days: "7",
      room: "T1105 (Tòa T)",
      start_date: "02/11/2024",
      count_student: 40,
      shift: 6,
    },
  ];

  const [selectedShift, setSelectedShift] = useState(null);

  // const [flexCol, setFlexCol] = useState("");
  // const [widthInfo, setWidthInfo] = useState("w-[40%]");
  // const [widthBox, setWidthBox] = useState("w-1/3");
  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth <= 783) {
  //       setFlexCol("flex-col-reverse");
  //       setWidthInfo("w-full");
  //       setWidthBox("w-full");
  //     } else if (window.innerWidth <= 1050) {
  //       setWidthBox("w-1/2");
  //     } else {
  //       setFlexCol("");
  //       setWidthInfo("w-[40%]");
  //       setWidthBox("w-1/3");
  //     }
  //   };
  //   window.addEventListener("resize", handleResize);
  //   // Kiểm tra kích thước màn hình khi component được mount
  //   handleResize();
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, [flexCol, widthInfo, widthBox]);

  return (
    <Container>
      <TitleHeader title={`ĐỔI LỊCH HỌC MÔN ${item.code}`} />
      <div className="min-h-[700px]">
        <div
          className={`flex justify-between pr-6 flex-col-reverse md:flex-row`}
        >
          <div className="w-full mt-3 mx-4 my-2">
            <p className="font-semibold">Ca học</p>
            <div className="border rounded-lg grid grid-cols-3 gap-5 p-4">
              {shifts.map((shift) => (
                <Button
                  className={`p-3 justify-center ${
                    shift === selectedShift
                      ? "text-xs font-semibold text-white"
                      : "bg-gray-200 hover:bg-gray-300 text-xs"
                  }`}
                  onClick={() => {
                    setSelectedShift(shift);
                  }}
                  key={shift}
                  label={`Ca ${shift}`}
                />
              ))}
            </div>
          </div>
          <div className={`w-full md:w-[40%] mx-4 my-2`}>
            <p className="font-semibold mb-1">Ca học hiện tại</p>
            <div className="border rounded-lg p-3 gap-5">
              <div className="flex pb-1">
                <p className="text-sm text-gray-600">Lớp: </p>{" "}
                <p className="text-sm pl-1">{item.clazz}</p>
              </div>
              <div className="flex py-1">
                <p className="text-sm text-gray-600">Môn: </p>{" "}
                <p className="text-sm pl-1">{item.name}</p>
              </div>
              <div className="flex py-1">
                <p className="text-sm text-gray-600">Thứ: </p>{" "}
                <p className="text-sm pl-1">{item.week_days}</p>
              </div>
              <div className="flex py-1">
                <p className="text-sm text-gray-600">Ca: </p>{" "}
                <p className="text-sm pl-1">{item.shift}</p>
              </div>
            </div>
          </div>
        </div>
        {selectedShift && (
          <div className="w-full mt-4">
            <div className="text-center text-sm font-semibold rounded-lg py-2 bg-blue-50">
              <p>DANH SÁCH LỚP HỌC</p>
            </div>
            <div className="flex flex-wrap">
              {clazzs
                .filter((clazz) => clazz.shift === selectedShift)
                .map((clazz) => (
                  <div className={`w-full md:w-1/3`} key={clazz.code}>
                    <div className="w-full my-4 flex justify-center">
                      <div className="p-4 border rounded-lg flex flex-wrap">
                        <div className="w-1/2 p-1 text-sm">
                          <p className="py-1">Lớp: {clazz.code}</p>
                          <p className="py-1">Phòng: {clazz.room}</p>
                          <p className="py-1">
                            Số lượng SV: {clazz.count_student}
                          </p>
                        </div>
                        <div className="w-1/2 p-1 text-sm">
                          <p className="py-1">
                            Ngày bắt đầu: {clazz.start_date}
                          </p>
                          <p className="py-1">
                            Ngày học trong tuần: {clazz.week_days}
                          </p>
                          <p className="py-1">Ca: {clazz.shift}</p>
                        </div>
                        <div className="justify-center w-full p-2 flex mt-2">
                          <Button
                            className={`text-xs font-bold p-2 w-full justify-center ${
                              clazz.count_student >= 40
                                ? "bg-gray-300 "
                                : " text-white bg-blue-500 hover:bg-blue-600"
                            }`}
                            label="ĐỔI LỊCH"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
      </div>
    </Container>
  );
}

export default ChangeSchedule;
