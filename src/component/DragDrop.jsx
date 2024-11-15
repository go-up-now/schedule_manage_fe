import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faShuffle,
} from "@fortawesome/free-solid-svg-icons";
let listExam = [];
function DragDrop({
  numberBoard = [],
  initialStudents,
  showOptions = false,
  showSearchItem = false,
  showRandomBtn = false,
  showOtherBtn = false,
  otherBtns = [],
}) {
  const [dropZones, setDropZones] = useState([]);
  const [students, setStudents] = useState(initialStudents);
  const [list, setList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [canDragDrop, setCanDragDrop] = useState(true);

  console.log(list);
  useEffect(() => {
    setDropZones(
      numberBoard.map((number, index) => ({ id: index + 1, students: [] }))
    );
  }, [numberBoard]);

  useEffect(() => {
    // Gộp cả 3 data-base thành một và truyền vào list
    const combinedDataBase = dropZones
      .map(
        (dz) =>
          `id:${dz.id},students:${JSON.stringify(
            dz.students.map((student) => student.id)
          )}`
      )
      .join(";");
    setList(combinedDataBase);
  }, [dropZones]);

  // chuyển giá trị list cho listExam
  listExam = list;

  const onDragStart = (event, student, fromDropZone) => {
    if (!canDragDrop || !student.condition) return;
    event.dataTransfer.setData(
      "student",
      JSON.stringify({ student, fromDropZone })
    );
    console.log("Started to drag the element.");
    event.target.style.opacity = "0.4";
    event.target.style.background = "rgba(65,128,238,0.7)";
    event.target.style.color = "white";
    event.target.style.border = "3px solid blue";
  };

  const onDragEnd = (event) => {
    console.log("Finished dragging the element.");
    event.target.style.opacity = "1";
    event.target.style.background = "transparent";
    event.target.style.color = "black";
    event.target.style.border = "1px solid rgba(0,0,0,0.1)";
  };

  const onDragEnter = (event) => {
    if (event.target.classList.contains("droptarget")) {
      event.target.style.border = "3px solid rgba(65,128,238,0.5)";
    }
  };

  const onDragOver = (event) => {
    if (!canDragDrop) return;
    event.preventDefault();
  };

  const onDragLeave = (event) => {
    if (event.target.classList.contains("droptarget")) {
      event.target.style.border = "";
    }
  };

  const onDrop = (event, dropZoneId) => {
    if (!canDragDrop) return;
    event.preventDefault();
    if (event.target.classList.contains("droptarget")) {
      const { student, fromDropZone } = JSON.parse(
        event.dataTransfer.getData("student")
      );

      if (fromDropZone === null) {
        setStudents((prevStudents) =>
          prevStudents.filter((s) => s.id !== student.id)
        );
      }

      if (dropZoneId === null) {
        setStudents((prevStudents) => [...prevStudents, student]);
      }

      setDropZones((prevDropZones) =>
        prevDropZones.map((dz) => {
          if (dz.id === dropZoneId) {
            return { ...dz, students: [...dz.students, student] };
          } else if (dz.id === fromDropZone) {
            return {
              ...dz,
              students: dz.students.filter((s) => s.id !== student.id),
            };
          }
          return dz;
        })
      );

      console.log("Dropped the element.");
      event.target.style.border = "";
    }
  };

  const shuffleStudents = () => {
    // Separate students based on their condition
    const studentsWithCondition = [
      ...students.filter((student) => student.condition),
      ...dropZones.flatMap((dz) =>
        dz.students.filter((student) => student.condition)
      ),
    ];
    const studentsWithoutCondition = [
      ...students.filter((student) => !student.condition),
      ...dropZones.flatMap((dz) =>
        dz.students.filter((student) => !student.condition)
      ),
    ];

    // Shuffle students with condition: true
    const shuffledStudents = studentsWithCondition.sort(
      () => 0.5 - Math.random()
    );

    // Create new drop zones and distribute shuffled students
    const newDropZones = dropZones.map((dz) => ({ ...dz, students: [] }));
    shuffledStudents.forEach((student, index) => {
      const dropZoneIndex = index % newDropZones.length;
      newDropZones[dropZoneIndex].students.push(student);
    });

    // Add students without condition back to their original positions
    studentsWithoutCondition.forEach((student) => {
      if (student.dropZoneId) {
        const dropZone = newDropZones.find(
          (dz) => dz.id === student.dropZoneId
        );
        if (dropZone) {
          dropZone.students.push(student);
        }
      } else {
        setStudents((prevStudents) => [...prevStudents, student]);
      }
    });

    setDropZones(newDropZones);
    setStudents(
      studentsWithoutCondition.filter((student) => !student.dropZoneId)
    );
  };

  // Vô hiệu hoá tự động khi có 1 div bất kỳ có 1 giá trị
  const disableShuffle = dropZones.some((dz) => dz.students.length > 0);

  // Tìm kiếm sinh viên trong các div
  const filterStudents = (students) => {
    return students.filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div className="flex flex-col p-1 justify-between h-[calc(100%-32px)]">
      {showOptions && (
        <div className="flex flex-col md:flex-row items-center justify-between w-full mb-2">
          {showOtherBtn && (
            <div className="md:w-1/4 w-full my-2 mx-2 flex">
              {otherBtns.map((button, index) => (
                <button
                  key={index}
                  onClick={button.onClick}
                  className="p-2 w-full px-5 bg-blue-500 text-white rounded flex items-center justify-center"
                  disabled={button.disabled}
                >
                  {button.name}
                </button>
              ))}
            </div>
          )}
          {showSearchItem && (
            <div className="w-full my-2 mx-2">
              <div className="relative">
                <div className="absolute top-3 left-0 flex items-center pl-3.5 pointer-events-none">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="text-[#808EA1]"
                  />
                </div>
                <input
                  id="search"
                  className="border shadow-md text-gray-900 text-sm rounded-lg w-full pl-10 p-2.5 focus:outline-none"
                  name="search"
                  aria-label="Search Bar"
                  placeholder="Tìm kiếm..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          )}
          {showRandomBtn && (
            <div className="md:w-1/4 w-full my-2 mx-2 flex">
              <button
                onClick={shuffleStudents}
                disabled={disableShuffle}
                className={`p-2 w-full px-5 text-white rounded transition-all ease-in-out 0.2s ${
                  disableShuffle ? "bg-gray-500" : "bg-blue-500"
                }`}
              >
                <FontAwesomeIcon icon={faShuffle} className="mr-2" />
                Random
              </button>
            </div>
          )}
        </div>
      )}

      <div className="flex justify-between h-full ">
        {dropZones.map((dropZone) => (
          <div key={dropZone.id} className="w-1/5 h-[450px] ">
            <div className="w-full text-center h-8 flex items-center justify-center border-blue-300 bg-blue-300 text-white">
              <label>Đợt {dropZone.id}</label>
            </div>
            <div
              className="droptarget p-2 px-4 pb-[120px] border-l border-r border-b rounded-b-md border-blue-300 overflow-y-auto"
              onDragEnter={onDragEnter}
              onDragOver={onDragOver}
              onDragLeave={onDragLeave}
              onDrop={(e) => onDrop(e, dropZone.id)}
              data-base={`id:${dropZone.id},students:${JSON.stringify(
                dropZone.students.map((student) => student.id)
              )}`}
              style={{ height: "calc(100% - 30px)" }}
            >
              {filterStudents(dropZone.students).map((student) => (
                <div
                  key={student.id}
                  id={`dragtarget-${student.id}`}
                  draggable="true"
                  onDragStart={(e) => onDragStart(e, student, dropZone.id)}
                  onDragEnd={onDragEnd}
                  className="cursor-move border w-full mb-1 rounded-md p-1 text-sm"
                >
                  <p>Tên: {student.name}</p>
                  <p>Code: {student.code}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="w-1/3 h-[450px] ">
          <div
            className="droptarget w-full h-full border-blue-300 p-2 px-4 pb-[120px] border rounded-b-md overflow-y-auto"
            onDragEnter={onDragEnter}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={(e) => onDrop(e, null)}
          >
            {filterStudents(students).map((student) => (
              <div
                key={student.id}
                id={`dragtarget-${student.id}`}
                draggable={canDragDrop && student.condition}
                onDragStart={(e) => onDragStart(e, student, null)}
                onDragEnd={onDragEnd}
                className={`cursor-move border w-full mb-1 rounded-md p-1 ${
                  student.condition
                    ? "hover:bg-blue-200"
                    : "bg-gray-200 cursor-not-allowed"
                } transition ease-in-out 0.2s`}
              >
                <p>Tên: {student.name}</p>
                <p>Code: {student.code}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export { listExam };
export default DragDrop;
