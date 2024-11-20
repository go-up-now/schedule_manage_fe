import React, { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons";
import { teach } from "./Teachingdays";
import Table from "../../component/Table";
import MiniMenu from "../../component/MiniMenu";
import Accordion from "../../component/Accordion";
import Button from "../../component/Button";
import Container from "../../component/Container.tsx";
import TitleHeader from "../../component/TitleHeader.tsx";

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
    // Kiểm tra kích thước màn hình khi component được mount
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [desktop, mobile]);

  const handleAttendanceClick = useCallback(
    (ca) => {
      navigate(
        `/instructor/check-attendance/${encodeURIComponent(
          ca.clazz.code
        )}/${encodeURIComponent(ca.clazz.subject.code)}`,
        { state: { item: ca } }
      );
    },
    [navigate]
  );

  const headers = ["Ngày", "Ca 1", "Ca 2", "Ca 3", "Ca 4", "Ca 5", "Ca 6"];

  const renderCa = (ca) =>
    ca && ca.clazz ? (
      <div className="w-24 h-22 flex flex-col items-start p-2 rounded-md shadow-inner border relative">
        <div className="w-full text-left">
          <h3 className="text-[0.9rem] font-medium py-1">{ca.clazz.room}</h3>
          <h3 className="text-[0.8rem]">{ca.clazz.code}</h3>
          <h3 className="text-[0.8rem] truncate">{ca.clazz.subject.name}</h3>
          <h3 className="text-[0.8rem] ">{ca.clazz.subject.code}</h3>
        </div>
        <div className="absolute bottom-0 right-0">
          <MiniMenu
            classNameBtn={"text-[20px] h-[25px] w-[25px]"}
            classNameMiniBox={"mt-1"}
            iconMenu={faCaretDown}
            menuItems={[
              { text: "Điểm danh", onClick: () => handleAttendanceClick(ca) },
              { text: "Huỷ lịch dạy" },
            ]}
          />
        </div>
      </div>
    ) : (
      <div className="w-24 h-22"></div>
    );

  const renderRow = (item) => {
    const caArray = Array(6).fill(null);
    item.Ca.forEach((ca) => {
      if (ca.id >= 1 && ca.id <= 6) {
        caArray[ca.id - 1] = ca;
      }
    });

    return [
      <td key={`item-date-${item.id}`} className="px-6 py-2">
        {item.date}
      </td>,
      ...caArray.map((ca, index) => (
        <td key={`item-ca${index + 1}-${item.id}`} className="px-6 py-2">
          {renderCa(ca)}
        </td>
      )),
    ];
  };

  const items = teach.map((item) => ({
    title: `${item.date}`,
    content: (
      <div>
        {item.Ca.map((ca) => (
          <div className="flex items-center justify-between border py-3 px-2 my-2">
            <div className="flex flex-col">
              <div>
                <span className="text-[18px] font-medium">Ca {ca.id}</span> -
                <span className="text-[18px] font-medium">{ca.clazz.room}</span>
              </div>
              <h3 className="text-[16px]">{ca.clazz.code}</h3>
              <h3 className="text-[16px] truncate">{ca.clazz.subject.name}</h3>
            </div>
            <div className="flex ">
              <Button
                key={ca.id}
                label="Điểm danh"
                onClick={() => handleAttendanceClick(ca)}
                className="text-white p-1 mx-1 text-[16px] "
              />
              <Button
                key={ca.id}
                label="X"
                className="text-white p-2 px-4 mx-1 text-[16px] bg-red-700"
              />
            </div>
          </div>
        ))}
      </div>
    ),
  }));

  return (
    <Container>
      <TitleHeader title="CA DẠY THEO NGÀY"/>
      <div className="py-4 mt-5">
        {desktop && (
          <Table
            DefaultTable={true}
            headers={headers}
            renderRow={renderRow}
            data={teach}
            maxRow={5}
          />
        )}

        {mobile && <Accordion items={items} maxRow={7} />}
      </div>
    </Container>
  );
}

export default TeachDay;
