import Table from "../../component/Table";
import MiniMenu from "../../component/MiniMenu";
import Modal from "../../component/Modal";
import Button from "../../component/Button";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState, useCallback } from "react";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from "../../component/Container.tsx";
import TitleHeader from "../../component/TitleHeader.tsx";

const subjects = [
  {
    code_subject: "COM107",
    name_subject: "Tin học",
    credit_subject: 3,
    code_clazz: "SD18301",
    shift: 1,
    day_of_week: "Monday, Wednesday, Friday",
    instructor_first_name: "Vỹ",
    instrutor_last_name: "Thái Anh",
    start_time: "07:15:00",
    end_time: "09:15:00",
  },
  {
    code_subject: "SKI101",
    name_subject: "Lập trình cơ bản",
    credit_subject: 3,
    code_clazz: "SD18302",
    shift: 2,
    day_of_week: "Tuesday, Thursday, Saturday",
    instructor_first_name: "Vỹ",
    instrutor_last_name: "Thái Anh",
    start_time: "07:15:00",
    end_time: "09:15:00",
  },
];

function CurrentSubject() {
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const handleUnregisterClick = (subject) => {
    setSelectedSubject(subject);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setSelectedSubject(null);
  };

  const handleConfirmUnregistration = () => {
    console.log(`Đã đăng ký môn: ${selectedSubject.name}`);
    handleModalClose();
  };

  const headers = [
    "Mã môn",
    "Tên môn",
    "Mã lớp",
    "Tín chỉ",
    "Giảng viên",
    "Ca",
    "Thứ",

    " ",
  ];

  const handlePost = useCallback((item) => {
    navigate(`/doi-lich-hoc/${encodeURIComponent(item.code_subject)}`, {
      state: { item }, // Pass both item and studentList in the state
    });
  });

  const renderRow = (item) => [
    <td key={`item-code_subject-${item.id}`} className="px-6 py-4">
      {item.code_subject}
    </td>,
    <td key={`item-name_subject-${item.id}`} className="px-6 py-4">
      {item.name_subject}
    </td>,
    <td key={`item-code_clazz-${item.id}`} className="px-6 py-4">
      {item.code_clazz}
    </td>,
    <td key={`item-credit_subject-${item.id}`} className="px-6 py-4">
      {item.credit_subject}
    </td>,
    <td key={`item-instructor-${item.id}`} className="px-6 py-4">
      {item.instrutor_last_name} {item.instructor_first_name}
    </td>,
    <td key={`item-shift-${item.id}`} className="px-6 py-4">
      {item.shift}
    </td>,
    <td key={`item-day_of_week-${item.id}`} className="px-6 py-4">
      {item.day_of_week}
    </td>,

    <td key={`item-menu-${item.id}`} className="px-4 py-4">
      <Button
        label="Đổi lịch học"
        className="bg-white font-bold text-blue-500 "
        onClick={() => handlePost(item)}
      />
    </td>,
  ];

  return (
    <Container>
      <TitleHeader title={"MÔN HỌC HIỆN TẠI"} />
      <div className="min-h-[600px]">
        <Table
          DefaultTable={true}
          showOptions={true}
          showSearch={true}
          showSelectBox={true}
          showBtnEnd={true}
          headers={headers}
          renderRow={renderRow}
          data={subjects}
          maxRow={10}
        />

        {/* <Modal isOpen={isModalOpen} onClose={handleModalClose} label="X">
          <h2 className="text-center font-medium text-xl">Xác nhận hủy môn</h2>
          <div className="h-28 p-2">
            <FontAwesomeIcon
              icon={faTriangleExclamation}
              className="h-full w-full text-[#FFD43B]"
            />
          </div>
          <p>
            Bạn có chắc chắn muốn hủy môn:{" "}
            <strong className="text-sm">{selectedSubject?.name}</strong>?
          </p>
          <div className="flex justify-center font-xs font-semibold mt-4">
            <Button
              label="Hủy"
              onClick={handleModalClose}
              className="mr-2 bg-gray-300 hover:bg-gray-400"
            />
            <Button
              label="Xác nhận"
              onClick={handleConfirmUnregistration}
              className="bg-red-500 text-white hover:bg-red-600"
            />
          </div>
        </Modal> */}
      </div>
    </Container>
  );
}

export default CurrentSubject;
