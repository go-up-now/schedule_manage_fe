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

  console.log("initialStudents take value from studentListAPI");
  console.log(students);

  useEffect(() => {
    setDropZones(
      numberBoard.map((number, index) => ({ id: index + 1, students: [] }))
    );
  }, [numberBoard]);

  useEffect(() => {
    const combinedDataBase = dropZones
      .map(
        (dz) =>
          `id:${dz.id},students:${JSON.stringify(
            dz.students.map((student) => student.studentId)
          )}`
      )
      .join(";");
    setList(combinedDataBase);
  }, [dropZones]);

  listExam = list;

  // Handle drag start
  const onDragStart = (event, student, fromDropZone) => {
    if (!canDragDrop || !student.condition) return;
    event.dataTransfer.setData(
      "student",
      JSON.stringify({ student, fromDropZone })
    );
    event.target.style.opacity = "0.4";
    event.target.style.background = "rgba(65,128,238,0.7)";
    event.target.style.color = "white";
    event.target.style.border = "3px solid blue";
  };

  const onDragEnd = (event) => {
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
          prevStudents.filter((s) => s.studentId !== student.studentId)
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
              students: dz.students.filter(
                (s) => s.studentId !== student.studentId
              ),
            };
          }
          return dz;
        })
      );
    }
  };

  const shuffleStudents = () => {
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

    const shuffledStudents = studentsWithCondition.sort(
      () => 0.5 - Math.random()
    );

    const newDropZones = dropZones.map((dz) => ({ ...dz, students: [] }));
    shuffledStudents.forEach((student, index) => {
      const dropZoneIndex = index % newDropZones.length;
      newDropZones[dropZoneIndex].students.push(student);
    });

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

  const disableShuffle = dropZones.some((dz) => dz.students.length > 0);

  const filterStudents = (students) => {
    return students.filter(
      (student) =>
        student.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.studentCode.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    // <div className="flex flex-col p-1 justify-between h-[calc(100%-32px)]">
    //   {showOptions && (
    //     <div className="flex flex-col md:flex-row items-center justify-between w-full mb-2">
    //       {showOtherBtn && (
    //         <div className="md:w-1/4 w-full my-2 mx-2 flex">
    //           {otherBtns.map((button, index) => (
    //             <button
    //               key={index}
    //               onClick={button.onClick}
    //               className="p-2 w-full px-5 bg-blue-500 text-white rounded flex items-center justify-center"
    //               disabled={button.disabled}
    //             >
    //               {button.name}
    //             </button>
    //           ))}
    //         </div>
    //       )}
    //       {showSearchItem && (
    //         <div className="w-full my-2 mx-2">
    //           <div className="relative">
    //             <div className="absolute top-3 left-0 flex items-center pl-3.5 pointer-events-none">
    //               <FontAwesomeIcon
    //                 icon={faMagnifyingGlass}
    //                 className="text-[#808EA1]"
    //               />
    //             </div>
    //             <input
    //               id="search"
    //               className="border shadow-md text-gray-900 text-sm rounded-lg w-full pl-10 p-2.5 focus:outline-none"
    //               name="search"
    //               aria-label="Search Bar"
    //               placeholder="Tìm kiếm..."
    //               value={searchTerm}
    //               onChange={(e) => setSearchTerm(e.target.value)}
    //             />
    //           </div>
    //         </div>
    //       )}
    //       {showRandomBtn && (
    //         <div className="md:w-1/4 w-full my-2 mx-2 flex">
    //           <button
    //             onClick={shuffleStudents}
    //             disabled={disableShuffle}
    //             className={`p-2 w-full px-5 text-white rounded transition-all ease-in-out 0.2s ${
    //               disableShuffle ? "bg-gray-500" : "bg-blue-500"
    //             }`}
    //           >
    //             <FontAwesomeIcon icon={faShuffle} className="mr-2" />
    //             Random
    //           </button>
    //         </div>
    //       )}
    //     </div>
    //   )}

    //   <div className="flex justify-between h-full">
    //     {/* Students List - Drag Area */}
    //     <div className="flex-1 overflow-y-auto p-2">
    //       <h3 className="text-xl font-semibold mb-2">Available Students</h3>
    //       <div>
    //         {filterStudents(students).map((student) => (
    //           <div
    //             key={student.studentId}
    //             draggable={student.condition}
    //             onDragStart={(event) => onDragStart(event, student, null)}
    //             onDragEnd={onDragEnd}
    //             className="p-2 my-1 bg-white border shadow rounded flex items-center justify-between"
    //           >
    //             <span>{student.studentName}</span>
    //             <span className="text-sm text-gray-500">
    //               {student.studentCode}
    //             </span>
    //           </div>
    //         ))}
    //       </div>
    //     </div>

    //     {/* Drop Zones */}
    //     <div className="flex-1 overflow-y-auto p-2">
    //       <h3 className="text-xl font-semibold mb-2">Drop Zones</h3>
    //       <div className="grid grid-cols-2 gap-4">
    //         {dropZones.map((dropZone) => (
    //           <div
    //             key={dropZone.id}
    //             onDragOver={onDragOver}
    //             onDragEnter={onDragEnter}
    //             onDragLeave={onDragLeave}
    //             onDrop={(event) => onDrop(event, dropZone.id)}
    //             className="droptarget p-4 bg-gray-100 border-2 border-dashed rounded-lg h-40"
    //           >
    //             <h4 className="text-lg font-semibold">Zone {dropZone.id}</h4>
    //             <div>
    //               {dropZone.students.map((student) => (
    //                 <div
    //                   key={student.studentId}
    //                   className="p-2 my-1 bg-blue-100 border shadow rounded"
    //                 >
    //                   <span>{student.studentName}</span>
    //                   <span className="text-sm text-gray-500">
    //                     {student.studentCode}
    //                   </span>
    //                 </div>
    //               ))}
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="flex flex-col justify-between h-[calc(100%-32px)]">
      {showOptions && (
        <div className="flex flex-col md:flex-row items-center justify-between my-2">
          {showOtherBtn && (
            <div className="md:w-6/12 w-full flex my-2 md:mr-2 mr-0 justify-start">
              {otherBtns.map((button, index) => (
                <button
                  key={index}
                  onClick={button.onClick}
                  className="w-[150px] h-[40px] border rounded-md transition-all bg-blue-500 text-white justify-center"
                  disabled={button.disabled}
                >
                  {button.name}
                </button>
              ))}
            </div>
          )}
          {showSearchItem && (
            <div className="md:w-4/12 w-full my-2 mx-2">
              <div className="relative">
                <div className="absolute top-3 left-0 flex items-center pl-3.5 pointer-events-none">
                  <FontAwesomeIcon
                    icon={faMagnifyingGlass}
                    className="text-[#808EA1]"
                  />
                </div>
                <input
                  id="search"
                  className="border text-gray-900 text-sm rounded-lg w-full pl-10 p-2.5 focus:outline-none"
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
            <div className="md:w-2/12 w-full my-2 mx-2 flex justify-center">
              <button
                onClick={shuffleStudents}
                disabled={disableShuffle}
                className={`w-[150px] h-[40px] border rounded-md transition-all bg-blue-500 text-white justify-center ${
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

      <div className="flex justify-between h-full">
        {dropZones.map((dropZone) => (
          <div key={dropZone.id} className="w-1/5 h-[650px]">
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
                dropZone.students.map((student) => student.studentId)
              )}`}
              style={{ height: "calc(100% - 30px)" }}
            >
              {filterStudents(dropZone.students).map((student) => (
                <div
                  key={student.studentId}
                  id={`dragtarget-${student.studentId}`}
                  draggable="true"
                  onDragStart={(e) => onDragStart(e, student, dropZone.id)}
                  onDragEnd={onDragEnd}
                  className="cursor-move border w-full mb-1 rounded-md p-1 text-sm"
                >
                  <p>Tên: {student.studentName}</p>
                  <p>Code: {student.studentCode}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="w-1/3 h-[650px]">
          <div
            className="droptarget w-full h-full border-blue-300 p-2 px-4 pb-[120px] border rounded-b-md overflow-y-auto"
            onDragEnter={onDragEnter}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={(e) => onDrop(e, null)}
          >
            {filterStudents(students).map((student) => (
              <div
                key={student.studentId}
                id={`dragtarget-${student.studentId}`}
                draggable={canDragDrop && student.condition}
                onDragStart={(e) => onDragStart(e, student, null)}
                onDragEnd={onDragEnd}
                className={`cursor-move border w-full mb-1 rounded-md p-1 ${
                  student.condition
                    ? "hover:bg-blue-200"
                    : "bg-gray-200 cursor-not-allowed"
                } transition ease-in-out 0.2s`}
              >
                <p>Tên: {student.studentName}</p>
                <p>Code: {student.studentCode}</p>
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
