import React, { useState, useEffect } from "react";
import Button from "../../component/Button";
import MiniMenu from "../../component/MiniMenu";
import Table from "../../component/Table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis, faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../component/Modal";
import TextField from "../../component/TextField";
import Container from "../../component/Container.tsx";
import TitleHeader from "../../component/TitleHeader.tsx";

function FindSubject() {
  const headers = ["Mã môn học", "Tên môn học", "Số tín chỉ", "Giờ học", " "];

  const subjects = [
    { id: 1, code: "SOF301", name: "Java1", credit: 3, hour: 90 },
    { id: 2, code: "SOF302", name: "Java2", credit: 3, hour: 90 },
    { id: 3, code: "SOF303", name: "Java3", credit: 3, hour: 90 },
    { id: 4, code: "SOF304", name: "Java4", credit: 3, hour: 90 },
  ];

  const renderRow = (item) => [
    <td key={`item-code-${item.id}`} className="px-6 py-4">
      {item.code}
    </td>,
    <td key={`item-name-${item.id}`} className="px-6 py-4">
      {item.name}
    </td>,
    <td key={`item-shift-${item.id}`} className="px-6 py-4">
      {item.credit}
    </td>,
    <td key={`item-date-${item.id}`} className="px-6 py-4">
      {item.hour}
    </td>,
    <td key={`item-menu-${item.id}`} className="px-6 py-4">
      <div className="flex justify-center">
        <Button
          onClick={() => {
            openModal(item);
            console.log(item);
          }}
          label={
            <>
              <FontAwesomeIcon icon={faCircleInfo} className="mr-2" /> Chi tiết
            </>
          }
          className="w-1/3 flex items-center justify-center p-3 text-white "
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

  return (
    <Container>
    <TitleHeader title={'TÌM KIẾM MÔN HỌC'}/>
    <div className="py-4">
      <Table
        selectBoxName="date-range-filter"
        DefaultTable={true}
        showOptions={true}
        showSearch={true}
        headers={headers}
        renderRow={renderRow}
        data={subjects}
        maxRow={5}
      />

      {selectedSubject && (
        <Modal isOpen={true} onClose={closeModal}>
          <h2 className="text-xl font-bold">
            {selectedSubject.name} - {selectedSubject.code}
          </h2>
          <div className="border-t border-black mt-4 py-4">
            {Object.entries(selectedSubject)
              .filter(([key]) => key !== "id")
              .map(([key, value]) => (
                <div className="mt-2" key={key}>
                  <TextField
                    sideField={true}
                    label={key}
                    value={value}
                    onChange={(e) => handleInputChange(key, e.target.value)}
                    disabled={true}
                  />
                </div>
              ))}
          </div>
        </Modal>
      )}
    </div>
    </Container>
  );
}
export default FindSubject;
