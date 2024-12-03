import React, { useState, useEffect } from "react";
import Button from "../../component/Button";
import Table from "../../component/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../component/Modal";
import TextField from "../../component/TextField";
import TextArea from "../../component/TextArea";
import { getAllSubject } from "../../api/Subject";
import Container from "../../component/Container.tsx";
import TitleHeader from "../../component/TitleHeader.tsx";

function FindSubject() {
  const headers = [
    "Mã môn học",
    "Tên môn học",
    "Số tín chỉ",
    "Giờ học",
    "Môn học trước",
    "",
  ];

  const renderRow = (item) => [
    <td key={`item-code-${item.id}`} className="px-6 py-4">
      {item.code}
    </td>,
    <td key={`item-name-${item.id}`} className="px-6 py-4">
      {item.name}
    </td>,
    <td key={`item-shift-${item.id}`} className="px-6 py-4">
      {item.credits}
    </td>,
    <td key={`item-date-${item.id}`} className="px-6 py-4">
      {item.total_hours}
    </td>,
    <td key={`item-required-${item.id}`} className="px-6 py-4">
      {item.required || "Không có"}
    </td>,
    <td key={`item-menu-${item.id}`} className="px-6 py-4 ">
      <div className="flex justify-center w-full">
        <Button
          onClick={() => {
            openModal(item);
            console.log(item);
          }}
          label={
            <>
              <FontAwesomeIcon icon={faCircleInfo} className="mr-2" />
              Chi tiết
            </>
          }
          className="w-full md:w-[150px] flex items-center justify-center p-3 text-white "
        />
      </div>
    </td>,
  ];

  const [selectedSubject, setSelectedSubject] = useState(null);

  const openModal = (subjects) => setSelectedSubject(subjects);
  const closeModal = () => setSelectedSubject(null);

  const handleInputChange = (key, value) => {
    setSelectedSubject((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  // call API
  const [subject, setSubject] = useState([]);
  useEffect(() => {
    getAllSubject()
      .then((response) => {
        setSubject(response);
      })
      .catch((error) => {
        console.error("Failed to fetch all subject:", error);
      });
  }, []);

  return (
    <Container>
      <TitleHeader title="DANH SÁCH MÔN" />
      <div className="min-h-[600px]">
        <Table
          selectBoxName="date-range-filter"
          DefaultTable={true}
          showOptions={true}
          showSearch={true}
          searchClass="pr-20"
          showSelectBox={true}
          headers={headers}
          renderRow={renderRow}
          data={subject}
          maxRow={10}
        />

        {selectedSubject && (
          <Modal
            className={"md:w-[70%]"}
            isOpen={true}
            onClose={closeModal}
            label={` Môn: ${selectedSubject.name} - Mã: ${selectedSubject.code}`}
          >
            <div className=" mt-1 pt-2 pb-4 h-[400px] overflow-y-auto md:overscroll-none md:h-auto">
              <div className="w-full flex flex-col md:flex-row p-2">
                <div className="flex w-full flex-col md:flex-row">
                  <TextField
                    onField={true}
                    label={"Tên Môn:"}
                    value={selectedSubject.name}
                    className={"mr-0 md:mr-2 w-full"}
                    disabled={true}
                  />
                  <TextField
                    onField={true}
                    label={"Mã Môn:"}
                    value={selectedSubject.code}
                    className={"mt-2 md:mt-0 w-full md:mr-1 mr-0"}
                    disabled={true}
                  />
                </div>
                <div className="flex w-full flex-col md:flex-row">
                  <TextField
                    onField={true}
                    label={"Tín chỉ:"}
                    value={selectedSubject.credits}
                    className={"md:ml-1 ml-0 mr-0 md:mr-2 w-full"}
                    disabled={true}
                  />
                  <TextField
                    onField={true}
                    label={"Giờ học:"}
                    value={selectedSubject.total_hours}
                    className={"mt-2 md:mt-0 w-full"}
                    disabled={true}
                  />
                </div>
              </div>
              <div className="w-full flex flex-col md:flex-row p-2">
                <TextField
                  onField={true}
                  label={"Môn học trước:"}
                  value={selectedSubject.required || "Không có"}
                  className={"mt-2 md:mt-0 w-full"}
                  disabled={true}
                />
              </div>
              <div className="w-full flex flex-col md:flex-row p-2">
                <TextArea
                  value={selectedSubject.mission}
                  className={"w-full mr-0 md:mr-3"}
                  disabled={true}
                />
                <TextArea
                  value={selectedSubject.description}
                  className={"w-full"}
                  disabled={true}
                />
              </div>
              <div className={"w-full p-2 -mt-3 md:-mt-6"}>
                <TextArea
                  value={selectedSubject.note}
                  className={"w-full"}
                  disabled={true}
                />
              </div>
            </div>
          </Modal>
        )}
      </div>
    </Container>
  );
}
export default FindSubject;
