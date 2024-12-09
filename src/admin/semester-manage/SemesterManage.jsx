import MiniMenu from "../../component/MiniMenu";
import React, { useState, useEffect, useCallback } from "react";
import Table from "../../component/Table";
import Button from "../../component/Button";
import Modal from "../../component/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faFileImport } from "@fortawesome/free-solid-svg-icons";
import FontGroup from "./FontGroup";
import { getAllSemesterProgressByAdmin } from "../../api/SemesterProgress";
import { dates } from "./dates";
import TextFieldGroup from "./TextFieldGroup";
import CheckBox from "../../component/CheckBox";
import { getAllStudentbyCourseAndMajor } from "../../api/Student";
import { format } from "date-fns";
import Container from "../../component/Container.tsx";
import TitleHeader from "../../component/TitleHeader.tsx";

function SemesterManage() {
  const headers = ["Block", "Semester", "Year", "Active", "Chi tiết"];
  const [selectedExam, setSelectedExam] = useState(null);
  const [editExam, setEditExam] = useState(null);
  const [isEditDisabled, setIsEditDisabled] = useState(false);

  const handleEditClick = useCallback((exam) => {
    setEditExam(exam);
    setIsEditDisabled(true);
  }, []);

  const openModal = (exam) => setSelectedExam(exam);
  const closeModal = () => setSelectedExam(null);

  const renderRow = (item) => [
    <td key={`item-block-${item.id}`} className=" border-b">
      {item.block}
    </td>,
    <td key={`item-semester-${item.id}`} className=" border-b">
      {item.semester}
    </td>,
    <td key={`item-year-${item.id}`} className=" border-b">
      {item.year}
    </td>,
    <td key={`item-active-${item.id}`} className=" border-b">
      {item.isActive ? "Đang hoạt động" : "Không hoạt động"}
    </td>,
    <td key={`item-case-${item.id}`}>
      <div className="flex justify-center items-center">
        <MiniMenu
          classNameBtn="text-xs p-4"
          iconMenu={faCaretDown}
          menuItems={[
            {
              text: "Chi tiết",
              onClick: () => openModal(item),
            },
            {
              text: "Sửa đổi",
              onClick: () => handleEditClick(item),
            },
          ]}
        />
      </div>
    </td>,
  ];

  // Call API
  const [exams, setExams] = useState([]);

  useEffect(() => {
    getAllSemesterProgressByAdmin()
      .then((data) => {
        setExams(data);
      })
      .catch((error) => {
        console.error("Error fetching exam:", error);
      });
  }, []);

  return (
    <Container>
      <TitleHeader title="QUẢN LÝ HỌC KỲ" />
      <div className={`flex flex-col md:flex-row min-h-svh`}>
        <div className="p-2 flex-1">
          <Table
            DefaultTable={true}
            showOptions={true}
            showSearch={true}
            showSelectBox={true}
            headers={headers}
            renderRow={renderRow}
            data={exams}
            maxRow={10}
            cbWidth="w-8/12"
          />
          {selectedExam && (
            <Modal
              isOpen={true}
              onClose={closeModal}
              label={
                <>
                  Khóa {selectedExam.block} - Kỳ {selectedExam.semester} - Năm{" "}
                  {selectedExam.year}
                </>
              }
            >
              <div>
                <div className="w-full py-2">
                  <TextFieldGroup
                    createDateStart={selectedExam.createDateStart}
                    createDateEnd={selectedExam.createDateEnd}
                    repaireDateStart={selectedExam.repaireDateStart}
                    repaireDateEnd={selectedExam.repaireDateEnd}
                    firstPartStart={selectedExam.firstPartStart}
                    firstPartEnd={selectedExam.firstPartEnd}
                    secondPartStart={selectedExam.secondPartStart}
                    secondPartEnd={selectedExam.secondPartEnd}
                    block={selectedExam.block}
                    semester={selectedExam.semester}
                    year={selectedExam.year}
                    isActive={
                      selectedExam.isActive
                        ? "Đang hoạt động"
                        : "Không hoạt động"
                    }
                  />
                </div>
              </div>
            </Modal>
          )}
        </div>
        <div className={`p-2 w-full md:w-[300px]`}>
          <div className="px-2 pt-4 mb-5">
            <Button
              className="w-full p-2 text-white justify-center"
              label={
                <>
                  <FontAwesomeIcon icon={faFileImport} className="mr-2" />
                  Import excel
                </>
              }
            ></Button>
          </div>
          <FontGroup exam={editExam} isEditDisabled={isEditDisabled} />
        </div>
      </div>
    </Container>
  );
}
export default SemesterManage;
