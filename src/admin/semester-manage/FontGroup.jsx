import React from "react";
import SelectBox from "../../component/SelectBox";
import TextField from "../../component/TextField";
import Button from "../../component/Button";
import { block, semester } from "./DataSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faPlus, faWrench } from "@fortawesome/free-solid-svg-icons";

function FontGroup() {
  const handleSelectChange = (value) => {
    console.log("Selected value:", value);
  };

  return (
    <div className="p-2 ">
      <div className={"my-2"}>
        <SelectBox options={block} onChange={handleSelectChange} />
      </div>
      <div className={"my-2"}>
        <SelectBox options={semester} onChange={handleSelectChange} />
      </div>
      <TextField onField={true} placeholder="Năm" className="p-0" />
      <TextField
        onField={true}
        placeholder="Ngày bắt đầu tạo"
        className="p-0 my-2"
      />
      <TextField
        onField={true}
        placeholder="Ngày kết thúc tạo"
        className="p-0 my-2"
      />
      <TextField
        onField={true}
        placeholder="Ngày bắt đầu chuẩn bị"
        className="p-0 my-2"
      />
      <TextField
        onField={true}
        placeholder="Ngày kết thúc chuẩn bị"
        className="p-0 my-2"
      />
      <TextField
        onField={true}
        placeholder="Bắt đầu GĐ1"
        className="p-0 my-2"
      />
      <TextField
        onField={true}
        placeholder="Kết thúc GĐ1"
        className="p-0 my-2"
      />
      <TextField
        onField={true}
        placeholder="Bắt đầu GĐ2"
        className="p-0 my-2"
      />
      <TextField
        onField={true}
        placeholder="Kết thúc GĐ2"
        className="p-0 my-2"
      />
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
