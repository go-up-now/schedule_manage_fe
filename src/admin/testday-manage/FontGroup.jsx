import React from "react";
import SelectBox from "../../component/SelectBox";
import TextField from "../../component/TextField";
import Button from "../../component/Button";
import {
  nameSubject,
  instructor,
  date,
  ca,
  room,
  base,
  time,
} from "./DataSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faPlus, faWrench } from "@fortawesome/free-solid-svg-icons";

function FontGroup() {
  const handleSelectChange = (value) => {
    console.log("Selected value:", value);
  };

  return (
    <div className="p-2 mt-2">
      <div className="my-2">
        <TextField placeholder="Mã lớp" className="p-0" disabled />
      </div>
      <div className="my-2 mb-3">
        <SelectBox options={nameSubject} onChange={handleSelectChange} />
      </div>
      <div className="my-2 mb-3">
        <SelectBox options={instructor} onChange={handleSelectChange} />
      </div>
      <div className="my-2 mb-3">
        <SelectBox options={date} onChange={handleSelectChange} />
      </div>
      <div className="my-2 mb-3">
        <SelectBox options={room} onChange={handleSelectChange} />
      </div>
      <div className="my-2 mb-3">
        <SelectBox options={base} onChange={handleSelectChange} />
      </div>
      <div className="my-2 mb-3">
        <SelectBox options={ca} onChange={handleSelectChange} />
      </div>
      <div className="my-2 mb-3">
        <TextField placeholder="Thời gian" className="p-0" disabled />
      </div>
      <div className="flex mt-8">
        <div className="w-1/3 flex justify-center ">
          <Button
            label={
              <>
                <FontAwesomeIcon icon={faFile} className="mr-2" />
                Mới
              </>
            }
            className="w-11/12 p-2 text-white justify-center "
          />
        </div>
        <div className="w-1/3 flex justify-center ">
          <Button
            label={
              <>
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Thêm
              </>
            }
            className="w-11/12 p-2 text-white justify-center"
          />
        </div>
        <div className="w-1/3 flex justify-center ">
          <Button
            label={
              <>
                <FontAwesomeIcon icon={faWrench} className="mr-2" />
                Sửa
              </>
            }
            className="w-11/12 p-2 text-white justify-center"
          />
        </div>
      </div>
    </div>
  );
}

export default FontGroup;
