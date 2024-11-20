import React, { useState, useEffect } from "react";
import Button from "../../component/Button";
import MiniMenu from "../../component/MiniMenu";
import Table from "../../component/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo, faEllipsis } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../component/Modal";
import TextField from "../../component/TextField";
import TextArea from "../../component/TextArea";
import { getAllSubject } from "../../api/Subject";

function FindSubjectInstructor() {
  const headers = ["Mã môn học", "Tên môn học", "Số tín chỉ", "Giờ học", ""];

  // const subjects = [
  //   {
  //     id: 1,
  //     code: "SOF301",
  //     name: "Java1",
  //     credit: 3,
  //     hour: 90,
  //     mission: "",
  //     preview: "",
  //     note: "",
  //   },
  //   {
  //     id: 2,
  //     code: "SOF302",
  //     name: "Java2",
  //     credit: 3,
  //     hour: 90,
  //     mission: "",
  //     preview: "",
  //     note: "",
  //   },
  //   {
  //     id: 3,
  //     code: "SOF303",
  //     name: "Java3",
  //     credit: 3,
  //     hour: 90,
  //     mission: "",
  //     preview: "",
  //     note: "",
  //   },
  //   {
  //     id: 4,
  //     code: "SOF304",
  //     name: "Java4",
  //     credit: 3,
  //     hour: 90,
  //     mission: "",
  //     preview: "",
  //     note: "",
  //   },
  // ];

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
          className="w-full md:w-1/3 flex items-center justify-center p-3 text-white "
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
    <div className="py-4">
      <Table
        selectBoxName="date-range-filter"
        DefaultTable={true}
        showOptions={true}
        showSearch={true}
        headers={headers}
        renderRow={renderRow}
        data={subject}
        maxRow={5}
      />

      {selectedSubject && (
        <Modal className={"md:w-[70%]"} isOpen={true} onClose={closeModal}>
          <h2 className="text-xl font-bold">
            {selectedSubject.name} - {selectedSubject.code}
          </h2>
          <div className="border-t border-black mt-4 py-4 h-[400px] overflow-y-auto md:overscroll-none md:h-auto">
            <div className="w-full flex flex-col md:flex-row p-2">
              <TextField
                sideField={true}
                label={"Môn:"}
                value={selectedSubject.name}
                className={"mr-0 md:mr-3 w-full"}
              />
              <TextField
                sideField={true}
                label={"Code:"}
                value={selectedSubject.code}
                className={"mt-2 md:mt-0 w-full"}
              />
            </div>
            <div className="w-full flex flex-col md:flex-row p-2">
              <TextField
                sideField={true}
                label={"Credit"}
                value={selectedSubject.credits}
                className={"mr-0 md:mr-3 w-full"}
              />
              <TextField
                sideField={true}
                label={"Hour"}
                value={selectedSubject.total_hours}
                className={"mt-2 md:mt-0 w-full"}
              />
            </div>
            <div className="w-full flex flex-col md:flex-row p-2">
              <TextArea
                value={selectedSubject.mission}
                className={"w-full mr-0 md:mr-3"}
              />
              <TextArea
                value={selectedSubject.description}
                className={"w-full"}
              />
            </div>
            <div className={"w-full p-2 -mt-3 md:-mt-6"}>
              <TextArea value={selectedSubject.note} className={"w-full"} />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
export default FindSubjectInstructor;
