import Table from "../../component/Table";
import MiniMenu from "../../component/MiniMenu";
import Modal from "../../component/Modal";
import Button from "../../component/Button";
import { faEllipsis } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from "../../component/Container.tsx";
import TitleHeader from "../../component/TitleHeader.tsx";

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

  const headers = ["Mã môn học", "Tên môn học", "Ca", "Thứ", "Giảng viên", " "];

  const subjects = [
    {
      id: 1,
      code: "SOF306",
      name: "Java6",
      shift: 1,
      week_days: "2",
      instructor: "liemht6",
      clazz: "SD18301",
    },
    {
      id: 2,
      code: "SOF306",
      name: "Phát triển cá nhân 2",
      shift: 1,
      week_days: "3, 5, 7",
      instructor: "lynk18",
      clazz: "SD18301",
    },
  ];

  const handlePost = (subjects) => {
    navigate("/student/change-schedule", { state: { subjects } });
  };

  const renderRow = (item) => [
    <td key={`item-code-${item.id}`} className="px-6 py-4">
      {item.code}
    </td>,
    <td key={`item-name-${item.id}`} className="px-6 py-4">
      {item.name}
    </td>,
    <td key={`item-shift-${item.id}`} className="px-6 py-4">
      {item.shift}
    </td>,
    <td key={`item-date-${item.id}`} className="px-6 py-4">
      {item.date}
    </td>,
    <td key={`item-instructor-${item.id}`} className="px-6 py-4">
      {item.instructor}
    </td>,
    <td key={`item-menu-${item.id}`} className="px-6 py-4">
      <MiniMenu
        iconMenu={faEllipsis}
        mt="mt-6"
        menuItems={[
          { text: "Đổi lịch học", onClick: () => handlePost(item) },
          {
            text: "Xóa đăng ký",
            isDanger: true,
            onClick: () => handleUnregisterClick(item),
          },
        ]}
      />
    </td>,
  ];

  // const [desktop, setDesktop] = useState(true);
  // const [mobile, setMobile] = useState(false);

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth <= 783) {
  //       setMobile(true);
  //       setDesktop(false);
  //     } else {
  //       setMobile(false);
  //       setDesktop(true);
  //     }
  //   };
  //   window.addEventListener("resize", handleResize);
  //   // Kiểm tra kích thước màn hình khi component được mount
  //   handleResize();
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, [mobile, desktop]);

  return (
    <Container>
      <TitleHeader title={'MÔN HỌC HIỆN TẠI'}/>
    <div className="py-4">
      <Table
        advanced={false}
        showSelectBox={false}
        headers={headers}
        renderRow={renderRow}
        data={subjects}
        maxRow={5}
      />

      <Modal isOpen={isModalOpen} onClose={handleModalClose} label="X">
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
      </Modal>
    </div>
    </Container>
  );
}

export default CurrentSubject;
