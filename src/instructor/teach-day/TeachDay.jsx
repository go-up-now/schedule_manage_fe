// import React, { useCallback, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
// import { teach, teach1 } from "./Teachingdays";
// import Table from "../../component/Table";
// import MiniMenu from "../../component/MiniMenu";
// import Accordion from "../../component/Accordion";
// import Button from "../../component/Button";

// import { getTeacherSchedule } from "../../api/Teacher";
// import { getRoleFromToken } from "../../api/DecodeToken";

// function TeachDay({ user }) {
//   const navigate = useNavigate();

//   const [desktop, setDesktop] = useState(true);
//   const [mobile, setMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth <= 1120) {
//         setMobile(true);
//         setDesktop(false);
//       } else {
//         setDesktop(true);
//         setMobile(false);
//       }
//     };
//     window.addEventListener("resize", handleResize);
//     // Kiểm tra kích thước màn hình khi component được mount
//     handleResize();
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, [desktop, mobile]);

//   // const handleAttendanceClick = useCallback(
//   //   (ca) => {
//   //     navigate(
//   //       `/instructor/check-attendance/${encodeURIComponent(
//   //         ca.clazz.code
//   //       )}/${encodeURIComponent(ca.clazz.subject.code)}`,
//   //       { state: { item: ca } }
//   //     );
//   //   },
//   //   [navigate]
//   // );

//   const handleAttendanceClick = useCallback(
//     (clazz) => {
//       navigate(
//         `/instructor/check-attendance/${encodeURIComponent(
//           clazz.code
//         )}/${encodeURIComponent(clazz.subjectCode)}`,
//         { state: { item: clazz } }
//       );
//     },
//     [navigate]
//   );

//   const headers = ["Ngày", "Ca 1", "Ca 2", "Ca 3", "Ca 4", "Ca 5", "Ca 6"];

//   // const renderCa = (ca) =>
//   //   ca && ca.clazz ? (
//   //     <div className="w-24 h-22 flex flex-col items-start p-2 rounded-md shadow-inner border relative">
//   //       <div className="w-full text-left">
//   //         <h3 className="text-[0.9rem] font-medium py-1">{ca.clazz.room}</h3>
//   //         <h3 className="text-[0.8rem]">{ca.clazz.code}</h3>
//   //         <h3 className="text-[0.8rem] truncate">{ca.clazz.subject.name}</h3>
//   //         <h3 className="text-[0.8rem] ">{ca.clazz.subject.code}</h3>
//   //       </div>
//   //       <div className="absolute bottom-0 right-0">
//   //         <MiniMenu
//   //           classNameBtn={"text-[20px] h-[25px] w-[25px]"}
//   //           classNameMiniBox={"mt-1"}
//   //           iconMenu={faCaretDown}
//   //           menuItems={[
//   //             { text: "Điểm danh", onClick: () => handleAttendanceClick(ca) },
//   //             { text: "Huỷ lịch dạy" },
//   //           ]}
//   //         />
//   //       </div>
//   //     </div>
//   //   ) : (
//   //     <div className="w-24 h-22"></div>
//   //   );

//   const renderCa = (clazz) =>
//     clazz ? (
//       <div className="w-24 h-22 flex flex-col items-start p-2 rounded-md shadow-inner border relative">
//         <div className="w-full text-left">
//           <h3 className="text-[0.9rem] font-medium py-1">{clazz.room}</h3>
//           <h3 className="text-[0.8rem]">{clazz.code}</h3>
//           <h3 className="text-[0.8rem] truncate">{clazz.subjectName}</h3>
//           <h3 className="text-[0.8rem] ">{clazz.subjectCode}</h3>
//         </div>
//         <div className="absolute bottom-0 right-0">
//           <MiniMenu
//             classNameBtn={"text-[20px] h-[25px] w-[25px]"}
//             classNameMiniBox={"mt-1"}
//             iconMenu={faCaretDown}
//             menuItems={[
//               {
//                 text: "Điểm danh",
//                 onClick: () => handleAttendanceClick(clazz),
//               },
//               { text: "Huỷ lịch dạy" },
//             ]}
//           />
//         </div>
//       </div>
//     ) : (
//       <div className="w-24 h-22"></div>
//     );

//   // const renderRow = (item) => {
//   //   const caArray = Array(6).fill(null);
//   //   item.Ca.forEach((ca) => {
//   //     if (ca.id >= 1 && ca.id <= 6) {
//   //       caArray[ca.id - 1] = ca;
//   //     }
//   //   });

//   //   return [
//   //     <td key={`item-date-${item.id}`} className="px-6 py-2">
//   //       {item.date}
//   //     </td>,
//   //     ...caArray.map((ca, index) => (
//   //       <td key={`item-ca${index + 1}-${item.id}`} className="px-6 py-2">
//   //         {renderCa(ca)}
//   //       </td>
//   //     )),
//   //   ];
//   // };

//   const renderRow = (item) => {
//     const caArray = Array(6).fill(null);
//     item.Ca.forEach((ca) => {
//       if (ca >= 1 && ca <= 6) {
//         caArray[ca - 1] = item; // Assign the current item to the corresponding Ca slot
//       }
//     });

//     return [
//       <td key={`item-date-${item.clazzId}`} className="px-6 py-2">
//         {item.date}
//       </td>,
//       ...caArray.map((clazz, index) => (
//         <td key={`item-ca${index + 1}-${item.clazzId}`} className="px-6 py-2">
//           {renderCa(clazz)}
//         </td>
//       )),
//     ];
//   };

//   // const items = teach.map((item) => ({
//   //   title: `${item.date}`,
//   //   content: (
//   //     <div>
//   //       {item.Ca.map((ca) => (
//   //         <div className="flex items-center justify-between border py-3 px-2 my-2">
//   //           <div className="flex flex-col">
//   //             <div>
//   //               <span className="text-[18px] font-medium">Ca {ca.id}</span> -
//   //               <span className="text-[18px] font-medium">{ca.clazz.room}</span>
//   //             </div>
//   //             <h3 className="text-[16px]">{ca.clazz.code}</h3>
//   //             <h3 className="text-[16px] truncate">{ca.clazz.subject.name}</h3>
//   //           </div>
//   //           <div className="flex ">
//   //             <Button
//   //               key={ca.id}
//   //               label="Điểm danh"
//   //               onClick={""}
//   //               className="text-white p-1 mx-1 text-[16px] "
//   //             />
//   //             <Button
//   //               key={ca.id}
//   //               label="X"
//   //               className="text-white p-2 px-4 mx-1 text-[16px] bg-red-700"
//   //             />
//   //           </div>
//   //         </div>
//   //       ))}
//   //     </div>
//   //   ),
//   // }));

//   const items = teach.map((item) => ({
//     title: `${item.date}`,
//     content: (
//       <div>
//         <div className="flex items-center justify-between border py-3 px-2 my-2">
//           <div className="flex flex-col">
//             <div>
//               <span className="text-[18px] font-medium">Ca {item.Ca}</span> -
//               <span className="text-[18px] font-medium">{item.room}</span>
//             </div>
//             <h3 className="text-[16px]">{item.code}</h3>
//             <h3 className="text-[16px] truncate">{item.subjectName}</h3>
//           </div>
//           <div className="flex ">
//             <Button
//               key={item.Ca}
//               label="Điểm danh"
//               onClick={() => handleAttendanceClick(item)}
//               className="text-white p-1 mx-1 text-[16px] "
//             />
//             <Button
//               key={item.Ca}
//               label="X"
//               className="text-white p-2 px-4 mx-1 text-[16px] bg-red-700"
//             />
//           </div>
//         </div>
//       </div>
//     ),
//   }));

//   return (
//     <div className="py-4">
//       {desktop && (
//         <Table
//           DefaultTable={true}
//           headers={headers}
//           renderRow={renderRow}
//           data={teach}
//           maxRow={5}
//         />
//       )}

//       {mobile && <Accordion items={items} maxRow={7} />}
//     </div>
//   );
// }

// export default TeachDay;

import React, { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { teach } from "./Teachingdays"; // Import the updated teach data
import Table from "../../component/Table";
import MiniMenu from "../../component/MiniMenu";
import Accordion from "../../component/Accordion";
import Button from "../../component/Button";

function TeachDay() {
  const navigate = useNavigate();

  const [desktop, setDesktop] = useState(true);
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1120) {
        setMobile(true);
        setDesktop(false);
      } else {
        setDesktop(true);
        setMobile(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Check the screen size when component mounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [desktop, mobile]);

  const handleAttendanceClick = useCallback(
    (clazz) => {
      navigate(
        `/instructor/check-attendance/${encodeURIComponent(
          clazz.code
        )}/${encodeURIComponent(clazz.subjectCode)}`,
        { state: { item: clazz } }
      );
    },
    [navigate]
  );

  const headers = ["Ngày", "Ca 1", "Ca 2", "Ca 3", "Ca 4", "Ca 5", "Ca 6"];

  // Grouping classes by date
  const groupedByDate = teach.reduce((acc, current) => {
    if (!acc[current.date]) {
      acc[current.date] = [];
    }
    acc[current.date].push(current);
    return acc;
  }, {});

  // Render the class information for each Ca
  const renderCa = (clazz) =>
    clazz ? (
      <div className="w-24 h-22 flex flex-col items-start p-2 rounded-md shadow-inner border relative">
        <div className="w-full text-left">
          <h3 className="text-[0.9rem] font-medium py-1">{clazz.room}</h3>
          <h3 className="text-[0.8rem]">{clazz.code}</h3>
          <h3 className="text-[0.8rem] truncate">{clazz.subjectName}</h3>
          <h3 className="text-[0.8rem]">{clazz.subjectCode}</h3>
        </div>
        <div className="absolute bottom-0 right-0">
          <MiniMenu
            classNameBtn={"text-[20px] h-[25px] w-[25px]"}
            classNameMiniBox={"mt-1"}
            iconMenu={faCaretDown}
            menuItems={[
              {
                text: "Điểm danh",
                onClick: () => handleAttendanceClick(clazz),
              },
              { text: "Huỷ lịch dạy" },
            ]}
          />
        </div>
      </div>
    ) : (
      <div className="w-24 h-22"></div>
    );

  // Render table rows for each date
  const renderRow = (date, classes) => {
    // Initialize an array for the 6 periods (Ca 1 to Ca 6)
    const caArray = Array(6).fill(null);

    // Loop through each class and assign it to the corresponding Ca index
    classes.forEach((clazz) => {
      if (clazz.Ca >= 1 && clazz.Ca <= 6) {
        caArray[clazz.Ca - 1] = clazz; // Adjust the index to match the period (Ca 1 is index 0)
      }
    });

    return [
      <td key={`item-date-${date}`} className="px-6 py-2">
        {date}
      </td>,
      ...caArray.map((clazz, index) => (
        <td key={`item-ca${index + 1}-${date}`} className="px-6 py-2">
          {renderCa(clazz)}
        </td>
      )),
    ];
  };

  // Convert groupedByDate into an array for easy iteration
  const tableData = Object.entries(groupedByDate).map(([date, classes]) => ({
    date,
    classes,
  }));

  // Call API
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [students, setStudents] = useState([]);

  const handleCourseChange = (event) => {
    setSelectedCourse(event.target.value);
  };

  // Fetch students whenever course or major is selected
  // useEffect(() => {
  //   if (selectedCourse && selectedMajor) {
  //     getAllStudentbyCourseAndMajor(selectedCourse, selectedMajor)
  //       .then((data) => {
  //         setStudents(data);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching students:", error);
  //       });
  //   }
  // }, [selectedCourse, selectedMajor]);

  const selectBoxs = [
    {
      options: [
        { value: 14, label: "14 ngày tới" },
        { value: 30, label: "30 ngày tới" },
      ],
      nameSelect: "7 ngày tới",
      onChange: handleCourseChange,
      value: selectedCourse,
      className: "mr-1 w-full pt-4 md:pt-4",
    },
  ];

  return (
    <div className="py-4">
      {desktop && (
        <Table
          DefaultTable={true}
          showOptions={true}
          showSelectBoxes={true}
          numberSelectBox={selectBoxs}
          headers={headers}
          renderRow={(row) => renderRow(row.date, row.classes)}
          data={tableData}
          maxRow={5}
        />
      )}

      {mobile && (
        <Accordion
          items={tableData.map((item) => ({
            title: item.date,
            content: item.classes.map((clazz) => (
              <div
                className="flex items-center justify-between border py-3 px-2 my-2"
                key={clazz.clazzId}
              >
                <div className="flex flex-col">
                  <div>
                    <span className="text-[18px] font-medium">
                      Ca {clazz.Ca}
                    </span>{" "}
                    -{" "}
                    <span className="text-[18px] font-medium">
                      {clazz.room}
                    </span>
                  </div>
                  <h3 className="text-[16px]">{clazz.code}</h3>
                  <h3 className="text-[16px] truncate">{clazz.subjectName}</h3>
                </div>
                <div className="flex ">
                  <Button
                    key={clazz.clazzId}
                    label="Điểm danh"
                    onClick={() => handleAttendanceClick(clazz)}
                    className="text-white p-1 mx-1 text-[16px] "
                  />
                  <Button
                    key={clazz.clazzId}
                    label="X"
                    className="text-white p-2 px-4 mx-1 text-[16px] bg-red-700"
                  />
                </div>
              </div>
            )),
          }))}
          maxRow={7}
        />
      )}
    </div>
  );
}

export default TeachDay;
