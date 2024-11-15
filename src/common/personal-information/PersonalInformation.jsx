import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import TextField from "../../component/TextField";
import Button from "../../component/Button";
import TextArea from "../../component/TextArea";
import BarCharts from "./BarCharts";

function PersonalInformation({ user }) {
  const [openInfo, setOpenInfo] = useState(true);
  const [openWork, setOpenWork] = useState(false);

  const handleOpenInfo = () => {
    setOpenInfo(true);
    setOpenWork(false);
  };

  const handleOpenWork = () => {
    setOpenInfo(false);
    setOpenWork(true);
  };

  const [className, setClassName] = useState("");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1000) {
        setClassName("flex-col items-center");
      } else {
        setClassName("");
      }
    };
    window.addEventListener("resize", handleResize);
    // Kiểm tra kích thước màn hình khi component được mount
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [className]);

  return (
    <div className={`p-5 flex h-full ${className}`}>
      <div className="w-[400px] rounded-md p-2 px-4 py-4 flex flex-col justify-between items-center">
        <img className="w-4/5 " src={user.avatar}></img>
        <div className="w-full">
          <TextField
            onField={true}
            label={"Email"}
            className="my-3"
            value={user.email}
            disabled
          />
          <TextField
            onField={true}
            label={"Code"}
            className="my-3"
            value={user.code}
            disabled
          />
        </div>
      </div>
      <div className="flex-1 p-6 ">
        <div className="w-full flex px-1">
          <Button
            className={`flex-1 bg-white rounded-none hover:bg-blue-100 text-[18px] justify-center font-medium mr-1 ${
              openInfo ? "border-b-2 border-black" : ""
            }`}
            label={"Thông tin cá nhân"}
            onClick={handleOpenInfo}
          />
          <Button
            className={`flex-1 bg-white rounded-none hover:bg-blue-100 text-[18px] justify-center font-medium ${
              openWork ? "border-b-2 border-black" : ""
            }`}
            label={"Thông tin công việc"}
            onClick={handleOpenWork}
          />
        </div>
        {openInfo && (
          <div className="p-2 shadow-inner shadow-gray-200 rounded-md mt-4 px-8 h-[535px] overflow-y-auto ">
            <div className="w-full flex my-2">
              <TextField
                onField={true}
                label={"Tên"}
                value={user.name}
                className="flex-1 mr-5"
                disabled={true}
              />
              <TextField
                onField={true}
                label={"Giới tính"}
                value={user.gender}
                className="flex-1"
                disabled={true}
              />
            </div>
            <div className="w-full flex my-2">
              <TextField
                onField={true}
                label={"Năm sinh"}
                value={user.birthday}
                className="flex-1 mr-5"
                disabled={true}
              />
              <TextField
                onField={true}
                label={"Số điện thoại"}
                value={user.phone}
                className="flex-1"
              />
            </div>
            <TextField
              onField={true}
              label={"Email cá nhân"}
              value={user.ownEmail}
              className="my-2"
            />
            <TextField
              onField={true}
              label={"Địa chỉ"}
              className="my-2"
              value={user.address}
            />
            <TextArea label={"Mô tả"} className="my-2" />
            <Button
              label={"Cập nhật thông tin"}
              className="w-full bg-blue-500 text-white p-2 justify-center"
            />
          </div>
        )}
        {openWork && (
          <div className="p-2 shadow-inner shadow-gray-200 rounded-md mt-4 px-8 h-[535px] overflow-y-auto ">
            <div className="w-full flex my-2">
              <TextField
                onField={true}
                label={"Mã tài khoản"}
                value={user.codeUser}
                className="flex-1 mr-5"
                disabled={true}
              />
              <TextField
                onField={true}
                label={"Cấp"}
                value={user.role}
                className="flex-1"
                disabled={true}
              />
            </div>
            <div className="mt-10">
              <BarCharts className="" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default PersonalInformation;
