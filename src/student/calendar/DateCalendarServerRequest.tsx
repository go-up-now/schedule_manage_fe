import * as React from "react";
import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faStar,
  faBook,
  faCalendarPlus,
  faClock,
  faFloppyDisk,
  faLocationDot,
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-solid-svg-icons";

import Radio from "../../component/Radio";
import { getNoteByDayAPI, createNoteAPI } from "../../api/Note.js";
import NoteForm from "./NoteForm.jsx";

function ServerDay(
  props: PickersDayProps<Dayjs> & { highlightedDays?: number[] }
) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  // Kiểm tra nếu ngày nằm trong highlightedDays
  const isSelected =
    !outsideCurrentMonth && highlightedDays.indexOf(day.date()) >= 0;

  return (
    <Badge
      key={day.toString()}
      overlap="circular"
      badgeContent={
        isSelected ? (
          <>
            <FontAwesomeIcon icon={faStar} className="text-[#Ffd700]" />
          </>
        ) : undefined
      }
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

export default function DateCalendarServerRequest() {
  //HIGHLIGHT NGÀY QUAN TRỌNG
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedDays, setHighlightedDays] = useState<number[]>([]);

  useEffect(() => {
    // Lọc các ngày có notetype_id = 1
    const daysToHighlight = notes
      .filter((note) => note.name_note_type === "Quan trọng ")
      .map((note) => dayjs(note.date_note).date()); // Lấy ngày trong date và chuyển thành số

    setHighlightedDays(daysToHighlight);
  }, []);

  // LẤY GIÁ TRỊ NGÀY
  const [value, setValue] = useState(dayjs().format("YYYY-MM-DD"));
  const [valueDay, setValueDay] = useState(dayjs().format("DD"));
  const [valueMonth, setValueMonth] = useState(dayjs().format("MM"));
  const [valueYear, setValueYear] = useState(dayjs().format("YYYY"));

  const handleChange = (newValue) => {
    setValue(newValue.format("YYYY-MM-DD"));
    setValueDay(newValue.format("DD"));
    setValueMonth(newValue.format("MM"));
    setValueYear(newValue.format("YYYY"));
  };

  console.log(value);
  console.log(valueDay);
  console.log(valueMonth);
  console.log(valueYear);

  //CALL API NOTE BY DAY,MONTH,YEAR
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (valueDay && valueMonth && valueYear) {
      getNoteByDayAPI(valueDay, valueMonth, valueYear)
        .then((response) => {
          setNotes(response.data);
        })
        .catch((error) => {
          console.error("Failed to fetch subjects:", error);
        });
    }
  }, [valueDay, valueMonth, valueYear]);

  console.log(notes);

  // THAO TÁC edit delete
  // Inside DateCalendarServerRequest component

  const [selectedNote, setSelectedNote] = useState(null);
  const handleEdit = (note) => {
    // Set the selected note for editing
    setSelectedNote(note);
  };

  const handleDelete = (noteId) => {
    // Implement your delete logic here (e.g., call an API to delete the note)
    console.log("Deleting note with ID:", noteId);
  };

  return (
    <div className={`flex flex-col md:flex-row justify-between `}>
      <div className="flex flex-col md:w-5/12 w-full">
        <div className="w-full pt-4">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              defaultValue={dayjs()}
              loading={isLoading}
              slots={{
                day: ServerDay,
              }}
              slotProps={{
                day: {
                  highlightedDays, // Truyền các ngày cần làm nổi bật vào
                } as any,
              }}
              value={dayjs(value)}
              onChange={handleChange}
              style={{ width: "70%" }}
            />
          </LocalizationProvider>
        </div>
        <div className="w-full px-4">
          <div className="w-full max-h-[280px] mt-2 rounded-lg p-4 px-5 overflow-y-scroll no-scrollbar">
            {notes.map((note) => (
              <div className="w-full p-2 my-2 flex border rounded-lg shadow-sm">
                <div className="w-11/12 px-2">
                  <p className="font-medium">{note.name_note_type}</p>
                  <ul>
                    <li>{note.content_note}</li>
                    <li>
                      Thời gian:
                      {note.time_note}
                    </li>
                    <li>Địa điểm: {note.location_note}</li>
                  </ul>
                </div>
                <div className="w-2/12 flex items-center justify-end">
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
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center md:w-7/12 w-full md:mt-0 mt-4">
        <NoteForm
          valueMonth={valueMonth}
          valueYear={valueYear}
          selectedNote={selectedNote}
          setSelectedNote={setSelectedNote}
        />
      </div>
    </div>
  );
}
