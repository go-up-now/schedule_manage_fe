import React, { useState, useEffect } from "react";
import SelectBox from "../../component/SelectBox";
import TextField from "../../component/TextField";
import Button from "../../component/Button";
import { major, course, gender, educationProgramId } from "./DataSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faPlus, faWrench } from "@fortawesome/free-solid-svg-icons";

function FontGroup({ student, isEditDisabled }) {
  const [selectedStudent, setSelectedStudent] = useState(student || {});
  const [areSelectBoxesDisabled, setAreSelectBoxesDisabled] = useState(false);

  useEffect(() => {
    setSelectedStudent(student || {});
    setAreSelectBoxesDisabled(isEditDisabled);
  }, [student, isEditDisabled]);

  const handleSelectChange = (field, value) => {
    setSelectedStudent((prev) => ({ ...prev, [field]: value }));
  };

  const handleChange = (field, value) => {
    setSelectedStudent((prev) => ({ ...prev, [field]: value }));
  };

  const handleNewClick = () => {
    setAreSelectBoxesDisabled(false);
    setSelectedStudent({});
  };

  return (
    <div className="px-2 pt-1 ">
      <div className="pt-2 mb-2">
        <SelectBox
          options={major}
          nameSelect="Chuyên Ngành"
          onChange={(value) => handleSelectChange("majorId", value)}
          value={selectedStudent.majorId || ""}
          disable={areSelectBoxesDisabled}
        />
      </div>
      <div className="pt-4 mb-2">
        <SelectBox
          options={course}
          nameSelect="Khoá"
          onChange={(value) => handleSelectChange("course", value)}
          value={selectedStudent.course || ""}
          disable={areSelectBoxesDisabled}
        />
      </div>
      <TextField
        onField={true}
        placeholder="Code"
        className="p-0 mt-2"
        value={selectedStudent.code || ""}
        onChange={(e) => handleChange("code", e.target.value)}
        disabled={false} // Không bị vô hiệu hoá
      />
      <TextField
        onField={true}
        placeholder="Last Name"
        className="p-0 mt-2"
        value={selectedStudent.lastName || ""}
        onChange={(e) => handleChange("lastName", e.target.value)}
        disabled={false} // Không bị vô hiệu hoá
      />
      <TextField
        onField={true}
        placeholder="First Name"
        className="p-0 mt-2"
        value={selectedStudent.firstName || ""}
        onChange={(e) => handleChange("firstName", e.target.value)}
        disabled={false} // Không bị vô hiệu hoá
      />
      <div className="pt-6 mb-2">
        <SelectBox
          options={gender}
          nameSelect="Giới tính"
          onChange={(value) => handleSelectChange("gender", value)}
          value={
            selectedStudent.gender !== undefined ? selectedStudent.gender : ""
          }
          disable={areSelectBoxesDisabled}
        />
      </div>
      <TextField
        onField={true}
        placeholder="Email"
        className="p-0 mt-2"
        value={selectedStudent.email || ""}
        onChange={(e) => handleChange("email", e.target.value)}
        disabled={false} // Không bị vô hiệu hoá
      />
      <TextField
        onField={true}
        placeholder="Birthday"
        className="p-0 mt-2"
        value={selectedStudent.birthday || ""}
        onChange={(e) => handleChange("birthday", e.target.value)}
        disabled={false} // Không bị vô hiệu hoá
      />
      <TextField
        onField={true}
        placeholder="Phone"
        className="p-0 mt-2"
        value={selectedStudent.phone || ""}
        onChange={(e) => handleChange("phone", e.target.value)}
        disabled={false} // Không bị vô hiệu hoá
      />
      <TextField
        onField={true}
        placeholder="Address"
        className="p-0 mt-2"
        value={selectedStudent.address || ""}
        onChange={(e) => handleChange("address", e.target.value)}
        disabled={false} // Không bị vô hiệu hoá
      />
      <div className="pt-6 mb-2">
        <SelectBox
          options={educationProgramId}
          nameSelect="Chương trình đào tạo"
          onChange={(value) => handleSelectChange("educationProgramId", value)}
          value={selectedStudent.educationProgramId || ""}
        />
      </div>
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
