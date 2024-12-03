import TextField from "../../component/TextField";
import { useState } from "react";
import SelectBox from "../../component/SelectBox";
import Button from "../../component/Button";

function FieldGroup({ thisDay, onFieldChange }) {
  const handleChange = (field) => (event) => {
    onFieldChange(field, event.target.value);
  };
  const [selectedShift, setSelectedShift] = useState(1);
  const options = [
    { value: 1, label: "Ca 1" },
    { value: 2, label: "Ca 2" },
    { value: 3, label: "Ca 3" },
    { value: 4, label: "Ca 4" },
    { value: 5, label: "Ca 5" },
    { value: 6, label: "Ca 6" },
  ];

  const optionRooms = [
    { value: 1, label: "T101" },
    { value: 2, label: "T102" },
    { value: 3, label: "T103" },
    { value: 4, label: "T104" },
    { value: 5, label: "T105" },
    { value: 6, label: "T106" },
  ];
  return (
    <>
      <div className="w-full flex md:flex-row flex-col  mt-1">
        <div className="flex-1">
          <TextField
            onField={true}
            label="Lớp"
            value={thisDay.clazzCode}
            className=" pt-4 px-4"
            disabled={true}
          />
          <TextField
            type="date"
            onField={true}
            label="Ngày"
            value={thisDay.date}
            className=" pt-4 px-4"
            onChange={handleChange("date")}
          />
          <SelectBox
            options={options}
            name={"Ca"}
            nameSelect={"Chọn Ca"}
            onChange={handleChange("shiftId")}
            value={thisDay.shiftId}
            className={"mt-8 px-4"}
          />
        </div>
        <div className="flex-1">
          <TextField
            onField={true}
            label="Môn"
            value={thisDay.subjectName}
            className=" pt-4 px-4"
            disabled={true}
          />
          <SelectBox
            options={optionRooms}
            name={"Phòng"}
            nameSelect={"Chọn Phòng"}
            onChange={handleChange("roomName")}
            value={thisDay.roomName}
            className={"mt-9 px-4"}
          />
          <div className=" pb-2 px-4 h-[80px] flex items-end text-red-500">
            <p>Số lượng sinh viên không thể tham dự: </p>
            <span className="ml-4 font-medium ">40</span>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-end pr-4 mt-10 pt-8 border-t">
        <Button
          label={"Đặt lịch"}
          className="w-full md:w-[150px] h-10 p-1 text-white justify-center"
        />
      </div>
    </>
  );
}

export default FieldGroup;
