import React, { useState } from "react";
import SelectBox from "../../component/SelectBox";
import TextField from "../../component/TextField";
import Button from "../../component/Button";
import { major, clazz } from "./DataSelect";
import Modal from "../../component/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faPlus, faWrench } from "@fortawesome/free-solid-svg-icons";

function FontGroup() {
  const handleSelectChange = (value) => {
    console.log("Selected value:", value);
  };

  const [selectedStudent, setSelectedStudent] = useState(null);
  const openModal = (dates) => setSelectedStudent(dates);
  const closeModal = () => setSelectedStudent(null);

  return (
    <div className="p-2">
      <TextField
        onField={true}
        placeholder="Ngày bắt đầu"
        className="p-0 mt-2"
      />
      <div className={"mt-2 mb-2"}>
        <SelectBox options={major} onChange={handleSelectChange} />
      </div>

      <TextField onField={true} placeholder="Mã sinh viên" className="p-0" />
      <div className={"mt-2 mb-2"}>
        <SelectBox options={clazz} onChange={handleSelectChange} />
      </div>
      <TextField onField={true} placeholder="Email" className="p-0" />
      <TextField
        onField={true}
        placeholder="Email cá nhân"
        className="p-0 mt-2"
      />
      <TextField
        onField={true}
        placeholder="Số điện thoại"
        className="p-0 mt-2"
      />
      <TextField onField={true} placeholder="Địa chỉ" className="p-0 mt-2" />
      <div className="">
        <TextField
          onField={true}
          label="Số tín chỉ"
          placeholder="Số tín chỉ"
          className="p-0 mt-2"
          disabled
        />
        <TextField
          onField={true}
          label="Tín chỉ đã có"
          placeholder="Tín chỉ đã có"
          className="p-0 mt-2"
          disabled
        />
      </div>

      <Button
        label="Bảng điểm"
        className="w-full bg-blue-400 p-2 text-white justify-center mt-2"
        onClick={openModal}
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

      {selectedStudent && (
        <Modal isOpen={true} onClose={closeModal} className="">
          <h2 className="text-xl font-bold"></h2>
          <div>
            <div className="w-[700px] h-[380px] border-t border-t-gray-500 mt-5 py-2"></div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default FontGroup;
