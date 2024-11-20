import React, { useState, useEffect } from "react";
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
import { course } from "./DataSelect";

function FontGroup({ exam, isEditDisabled }) {
  const [selectedExam, setSelectedExam] = useState(exam || {});
  const [areSelectBoxesDisabled, setAreSelectBoxesDisabled] = useState(false);

  useEffect(() => {
    setSelectedExam(exam || {});
    setAreSelectBoxesDisabled(isEditDisabled);
  }, [exam, isEditDisabled]);

  const handleSelectChange = (field, value) => {
    setSelectedExam((prev) => ({ ...prev, [field]: value }));
  };

  const handleChange = (field, value) => {
    setSelectedExam((prev) => ({ ...prev, [field]: value }));
  };

  const handleNewClick = () => {
    setAreSelectBoxesDisabled(false);
    setSelectedExam({});
  };

  return (
    <div className="px-2">
      <TextField
        onField={true}
        placeholder="Code"
        className=""
        value={selectedExam.code || ""}
        onChange={(e) => handleChange("code", e.target.value)}
        disabled={false} // Không bị vô hiệu hoá
      />
      {/* <div className="pt-6 mb-2">
        <SelectBox
          options={year}
          nameSelect="Khoá"
          onChange={(value) => handleSelectChange("year", value)}
          value={selectedExam.year || ""}
          disable={areSelectBoxesDisabled}
        />
      </div>
      <div className="pt-4 mb-2">
        <SelectBox
          options={year}
          nameSelect="Khoá"
          onChange={(value) => handleSelectChange("year", value)}
          value={selectedExam.year || ""}
          disable={areSelectBoxesDisabled}
        />
      </div> */}
      <div className="flex mt-4">
        <div className="w-1/3 flex justify-center">
          <Button
            label={
              <>
                <FontAwesomeIcon icon={faFile} className="mr-2" />
                Mới
              </>
            }
            className="w-11/12 p-2 text-white justify-center"
            onClick={handleNewClick}
          />
        </div>
        <div className="w-1/3 flex justify-center">
          <Button
            label={
              <>
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Thêm
              </>
            }
            className="w-11/12 p-2 text-white justify-center"
            disabled={false}
          />
        </div>
        <div className="w-1/3 flex justify-center">
          <Button
            label={
              <>
                <FontAwesomeIcon icon={faWrench} className="mr-2" />
                Sửa
              </>
            }
            className="w-11/12 p-2 text-white justify-center"
            disabled={areSelectBoxesDisabled}
          />
        </div>
      </div>
    </div>
  );
}

export default FontGroup;
