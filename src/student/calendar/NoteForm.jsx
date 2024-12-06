import React, { useState, useEffect } from "react";
import { getNoteByMonthAPI, createNoteAPI } from "../../api/Note.js";
import Button from "../../component/Button";
import TextField from "../../component/TextField";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faBook,
  faCalendarPlus,
  faClock,
  faFloppyDisk,
  faBookmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
const NoteForm = ({ valueMonth, valueYear }) => {
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");
  const [noteTime, setNoteTime] = useState("");
  const [location, setLocation] = useState("");
  const [studentId, setStudentId] = useState(1); // Example student ID
  const [noteTypeId, setNoteTypeId] = useState(2); // Default value (radio selection)
  const [error, setError] = useState("");

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const noteDTO = {
      content,
      date,
      noteTime,
      location,
      studentId,
      noteTypeId, // Include noteTypeId from radio selection
    };

    try {
      const response = await createNoteAPI(noteDTO);

      if (response.status === 200) {
        alert("Note created successfully!");
        // Optionally clear the form
        setContent("");
        setDate("");
        setNoteTime("");
        setLocation("");
      }
    } catch (error) {
      setError("Failed to create note.");
      console.error("Error creating note:", error);
    }
  };

  //call API GET NOTE BY MONTHS
  const [notesMonth, setNotesMonth] = useState([]);
  useEffect(() => {
    if (valueMonth && valueYear) {
      getNoteByMonthAPI(valueMonth, valueYear)
        .then((response) => {
          setNotesMonth(response.data);
        })
        .catch((error) => {
          console.error("Failed to fetch subjects:", error);
        });
    }
  }, [valueMonth, valueYear]);
  console.log(notesMonth);

  return (
    <div className="border rounded-lg h-auto pt-4 md:w-[70%] w-full md:px-8 px-4">
      <p className="w-full justify-center flex mt-4 text-xl font-medium mb-8">
        Thêm nhắc nhở
      </p>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            onField={true}
            icon={faBook}
            name="Sự kiện"
            placeholder="Tên sự kiện"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className={"mb-3"}
          />
        </div>
        <div>
          <TextField
            type="date"
            onField={true}
            icon={faCalendarPlus}
            name="Ngày"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className={"mb-3"}
          />
        </div>
        <div>
          <TextField
            onField={true}
            icon={faClock}
            name="Thời gian"
            type="time"
            value={noteTime}
            onChange={(e) => setNoteTime(e.target.value)}
            className={"mb-3"}
          />
        </div>
        <div>
          <TextField
            onField={true}
            icon={faLocationDot}
            name="Địa điểm (không bắt buộc)"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={"mb-3"}
          />
        </div>

        {/* Radio buttons for noteTypeId */}
        <div>
          <div className="flex">
            <label className="h-10 w-[150px] flex items-center">
              <input
                type="radio"
                name="noteType"
                value={1}
                checked={noteTypeId === 1}
                onChange={() => setNoteTypeId(1)}
                className="mr-1"
              />
              <p className="-mt-1">Quan trọng</p>
            </label>
            <label className="h-10 w-[150px] flex items-center">
              <input
                type="radio"
                name="noteType"
                value={2}
                checked={noteTypeId === 2}
                onChange={() => setNoteTypeId(2)}
                className="mr-1"
              />
              <p className="-mt-1">Nhắc nhở</p>
            </label>
          </div>
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
            onClick={handleSubmit}
          />
        </div>
      </form>

      {error && <div>{error}</div>}

      <div className="border-t border-black mx-4 flex flex-col mt-4 mb-4 py-1">
        <p className="w-full font-medium">
          SỐ LƯỢNG GHI CHÚ THÁNG {valueMonth} : {notesMonth.length}
        </p>
        <div className="pl-4">
          <p className="mt-2 pl-1">
            <FontAwesomeIcon icon={faBookmark} className="mr-2" />
            Nhắc nhở:{" "}
            {notesMonth.filter((note) => note.noteType_note === 2).length}
          </p>
          <p className="mt-2">
            <FontAwesomeIcon icon={faStar} className="mr-2" />
            Quan trọng:{" "}
            {notesMonth.filter((note) => note.noteType_note === 1).length}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoteForm;
