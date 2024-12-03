import { useState, useEffect } from "react";
import DateCalendar from "./DateCalendar";
import TextField from "../../component/TextField";
import Radio from "../../component/Radio";
import Button from "../../component/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { toast } from "react-toastify";
import { getNotesByMonth, postNote } from "../../api/NoteStudent";
import Container from "../../component/Container.tsx";
import TitleHeader from "../../component/TitleHeader.tsx";

import {
  faBook,
  faCalendarPlus,
  faClock,
  faFloppyDisk,
  faLocationDot,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

function Calendar() {
  const notes = [
    {
      id: 1,
      content: "HappyBee",
      date: "22/10/2024",
      timeNote: "5pm",
      location: "FPT",
      notetype_id: 1,
      student_code: "PS27123",
      student_id: 1,
    },
    {
      id: 2,
      content: "Lịch thi môn Java2",
      date: "27/10/2024",
      timeNote: "8:30am",
      location: "Tòa T",
      notetype_id: 2,
      student_code: "PS27123",
      student_id: 1,
    },
  ];

  const [note, setNote] = useState(notes);

  const newForm = {
    content: "",
    date: "",
    timeNote: "",
    location: "",
    notetype_id: 1,
    student_code: "PS27123",
    student_id: 1,
  };

  const [form, setForm] = useState(newForm);

  const handleChange = (field, value) => {
    setForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  };

  const handleAddNote = () => {
    if (!form.content || !form.date || !form.timeNote) {
      console.log("Vui lòng điền đủ thông tin");
    } else {
      // Lưu thông tin nhắc nhở vào mảng notes
      setNote((prevNotes) => [
        ...prevNotes,
        { id: prevNotes.length + 1, ...form }, // Tạo ID cho ghi chú mới
      ]);
      alert("Nhắc nhở đã được lưu thành công!");
      setForm(newForm); // Reset form
    }
  };

  // Delete note
  const handleDelete = (id) => {
    setNote((prevNotes) => prevNotes.filter((note) => note.id !== id));
    alert("Nhắc nhở đã được xóa thành công!");
  };

  // Edit note
  const handleEdit = (note) => {
    setForm({
      content: note.content,
      date: note.date,
      timeNote: note.timeNote,
      location: note.location,
      notetype_id: note.notetype_id,
    });
  };

  const [desktop, setDesktop] = useState(true);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 783) {
        setMobile(true);
        setDesktop(false);
      } else {
        setMobile(false);
        setDesktop(true);
      }
    };
    window.addEventListener("resize", handleResize);
    // Kiểm tra kích thước màn hình khi component được mount
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [mobile, desktop]);

  return (
    <Container>
      <TitleHeader title={"NOTE"} />
      <div className={`w-full flex flex-col md:flex-row justify-between py-4`}>
        <div className="w-full h-full mb-6">
          <DateCalendar />
          <div
            className="w-full h-64 mt-2 rounded-lg p-4 overflow-y-auto scrollbar "
            style={{ boxShadow: "inset 0 0 6px 0 rgb(0 0 0 / 0.2)" }}
          >
            <p className="text-xl font-medium text-center w-full">Chi tiết</p>
            {notes.map((note) => (
              <div className="w-full p-2 my-2 flex border rounded-lg shadow-sm">
                <div className="w-11/12 px-2">
                  <p className="font-medium">
                    {note.notetype_id === 1 ? "Nhắc nhở" : "Quan trọng"}
                  </p>
                  {desktop && (
                    <p>
                      Ngày {note.date} lúc {note.timeNote} bạn có {note.content}{" "}
                      tại {note.location}
                    </p>
                  )}
                  {mobile && (
                    <div className="flex mt-2">
                      <div className="flex flex-col mr-2">
                        <span>Ngày</span>
                        <span>Thời gian</span>
                        <span>Sự kiện</span>
                        <span>Vị trí tại</span>
                      </div>
                      <div className="flex flex-col font-medium">
                        <span>{note.date}</span>
                        <span>{note.timeNote}</span>
                        <span>{note.content}</span>
                        <span>{note.location}</span>
                      </div>
                    </div>
                  )}
                </div>
                <div className="w-2/12 flex items-center justify-end">
                  {desktop && (
                    <div className="w-2/4">
                      <FontAwesomeIcon
                        icon={faPenToSquare}
                        className="text-blue-500 px-2 cursor-pointer"
                        onClick={() => handleEdit(note)}
                      />
                      <FontAwesomeIcon
                        icon={faTrashCan}
                        className="text-[#ff0000da] px-2 mt-2 cursor-pointer"
                        onClick={() => handleDelete(note.id)}
                      />
                    </div>
                  )}
                  {mobile && (
                    <div className="w-full flex flex-col justify-between h-full">
                      <Button
                        label={
                          <FontAwesomeIcon icon={faPenToSquare} className="" />
                        }
                        className="px-1 cursor-pointer text-white w-full p-4 justify-center"
                        onClick={() => handleEdit(note)}
                      />
                      <Button
                        label={
                          <FontAwesomeIcon icon={faTrashCan} className="" />
                        }
                        className=" bg-red-500 cursor-pointer text-white w-full p-4 justify-center"
                        onClick={() => handleDelete(note.id)}
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={`w-full border-gray-200 px-0 md:px-8 `}>
          <div className="border rounded-lg h-[643px] pt-4">
            <p className="w-full justify-center flex mt-4 text-xl font-medium">
              Thêm nhắc nhở
            </p>
            <div className="p-5">
              <TextField
                onField={true}
                icon={faBook}
                placeholder="Tên sự kiện"
                value={form.content}
                onChange={(e) => handleChange("content", e.target.value)}
                className={"mb-3"}
              />
              <div className="relative">
                <TextField
                  onField={true}
                  icon={faCalendarPlus}
                  placeholder="Ngày diễn ra sự kiện"
                  type="date"
                  value={form.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  className={"mb-3"}
                />
              </div>
              <TextField
                onField={true}
                icon={faClock}
                placeholder="Thời gian diễn ra sự kiện"
                type="time"
                value={form.timeNote}
                onChange={(e) => handleChange("timeNote", e.target.value)}
                className={"mb-3"}
              />
              <TextField
                onField={true}
                icon={faLocationDot}
                placeholder="Địa điểm diễn ra (không bắt buộc)"
                value={form.location}
                onChange={(e) => handleChange("location", e.target.value)}
                className={"mb-3"}
              />
              <div className="w-full flex flex-wrap space-x-10">
                <Radio
                  label="Nhắc nhở"
                  name="type"
                  checked={form.notetype_id === 1}
                  onChange={() => handleChange("notetype_id", 1)}
                />
                <Radio
                  label="Quan trọng"
                  name="type"
                  checked={form.notetype_id === 2}
                  onChange={() => handleChange("notetype_id", 2)}
                />
              </div>

              <div className="w-full flex justify-center mt-4">
                <Button
                  label={
                    <>
                      <FontAwesomeIcon icon={faFloppyDisk} className="mr-2" />
                      Lưu nhắc nhở
                    </>
                  }
                  className="bg-blue-400 p-2 w-full justify-center text-white text-sm font-bold hover:bg-blue-500"
                  onClick={handleAddNote}
                />
              </div>
            </div>

            <div className="border-t border-black mx-4">
              <p className="w-full justify-center flex mt-4 text-xl font-medium">
                Tổng hợp
              </p>
              <strong className="py-2">Tháng: 10</strong>
              <p className="py-1 mt-2">
                Nhắc nhở:{" "}
                {notes.filter((note) => note.notetype_id === 1).length}
              </p>
              <p className="mb-4">
                Quan trọng:{" "}
                {notes.filter((note) => note.notetype_id === 2).length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Calendar;
