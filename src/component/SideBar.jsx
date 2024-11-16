import React, { useState, useEffect } from "react";
import icon from "../images/logo.png";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getRoleFromToken } from "../api/DecodeToken";
import {
  faHouse,
  faListUl,
  faRectangleList,
  faListCheck,
  faFilePen,
  faCheck,
  faCalendarDays,
  faMagnifyingGlass,
  faBriefcase,
  faChalkboard,
  faChartSimple,
  faClipboard,
  faUserGroup,
  faBook,
  faTableList,
  faCircleXmark,
  faBars,
  faAddressCard,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";
import MiniMenu from "./MiniMenu";
import Tooltip from "./Tooltip";

const sidebarAdmin = [
  { title: "Thống kê", icon: faChartSimple, link: "/admin/statistics" },
  { title: "Quản lý lớp học", icon: faChalkboard, link: "/admin/class-manage" },
  {
    title: "Quản lý lịch thi",
    icon: faClipboard,
    link: "/admin/testday-manage",
  },
  {
    title: "Quản lý học sinh",
    icon: faUserGroup,
    link: "/admin/student-manage",
  },
  {
    title: "Quản lý Lịch học",
    icon: faRectangleList,
    link: "/admin/schedule-manage",
  },
  {
    title: "Quản lý học kỳ",
    icon: faBriefcase,
    link: "/admin/semester-manage",
  },
];

const sidebarInstructor = [
  { title: "Trang chủ", icon: faHouse, link: "/instructor/home" },
  {
    title: "Lịch dạy theo ngày",
    icon: faChalkboard,
    link: "/instructor/teach-day",
  },
  {
    title: "Tìm kiếm môn học",
    icon: faBook,
    link: "/instructor/find-subject",
  },
  {
    title: "Quản lý lớp dạy",
    icon: faListCheck,
    link: "/instructor/teach-manage",
  },
  {
    title: "Đặt lại lịch dạy",
    icon: faTableList,
    link: "/instructor/offed-replace",
  },
];

const sidebarStudent = [
  { title: "Trang chủ", icon: faHouse, link: "/student/home" },
  { title: "Lịch học", icon: faListUl, link: "/student/study-schedule" },
  { title: "Lịch thi", icon: faRectangleList, link: "/student/exam-schedule" },
  {
    title: "Môn học hiện tại",
    icon: faListCheck,
    link: "/student/current-subject",
  },
  {
    title: "Đăng ký môn học",
    icon: faFilePen,
    link: "/student/register-subject",
  },
  { title: "Lịch sử học tập", icon: faCheck, link: "/student/study-history" },
  { title: "Lịch", icon: faCalendarDays, link: "/student/calendar" },
  {
    title: "Tìm kiếm môn học",
    icon: faMagnifyingGlass,
    link: "/student/find-subject",
  },
];

function SideBar({ user }) {
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    const role = getRoleFromToken();  
    setUserRole(role); 
  }, []);

  let sidebarItems;

  switch (userRole) {
    case "ROLE_STUDENT":
      sidebarItems = sidebarStudent;
      break;
    case "ROLE_ADMIN":
      sidebarItems = sidebarAdmin;
      break;
    case "ROLE_INSTRUCTOR":
      sidebarItems = sidebarInstructor;
      break;
    default:
      sidebarItems = [];
      break;
  }

  const [showMobile, setShowMobile] = useState(false);
  const [showDesktop, setShowDesktop] = useState(true);
  const [showSideBar, setShowSideBar] = useState(false);

  const trunOn = () => {
    setShowSideBar(true);
  };
  const turnOff = () => {
    setShowSideBar(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 783) {
        setShowMobile(true);
        setShowDesktop(false);
      } else {
        setShowMobile(false);
        setShowDesktop(true);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const infoLink = () => {
    navigate(
      `/person-info/${encodeURIComponent(user.code)}/${encodeURIComponent(
        user.name
      )}`,
      {
        state: { user },
      }
    );
    setShowSideBar(false);
  };

  const menuItem = [
    { icon: faAddressCard, text: "Thông tin cá nhân", onClick: infoLink },
    {
      icon: faRightFromBracket,
      text: "Đăng xuất",
      isDanger: false,
    },
  ];

  return (
    <>
      {showDesktop && (
        <div className="p-1 w-[80px] h-full sideBar-col sticky top-0">
          <div className="">
            <div className="w-full h-16 border-b border-black ">
              <img
                src={icon}
                alt="Logo"
                className="h-full transition-all duration-300"
              />
            </div>
            <div className="p-1">
              {sidebarItems.map((item, index) => (
                <Tooltip key={index} text={item.title}>
                  <Link to={item.link}>
                    <Button
                      label={
                        <>
                          <FontAwesomeIcon icon={item.icon} />
                        </>
                      }
                      className={
                        "relative w-full h-[60px] text-xl bg-transparent justify-center text-black my-1 z-20 hover:bg-blue-50 transition-all ease-in-out duration-200" +
                        (window.location.pathname.includes(item.link)
                          ? "bg-[#E4F4FF] text-blue-500"
                          : "")
                      }
                    />
                  </Link>
                </Tooltip>
              ))}
            </div>
          </div>
        </div>
      )}

      {showMobile && (
        <>
          <Button
            label={
              <FontAwesomeIcon icon={faBars} className="w-[60px] text-[25px]" />
            }
            onClick={trunOn}
            className="fixed z-40 h-[64px] top-0 left-3 bg-transparent"
          />
          {showSideBar && (
            <div className="w-full h-full bg-[rgba(0,0,0,0.2)] fixed z-50">
              <div className="w-[60%] h-full border bg-white p-1">
                <div className="w-full h-16 border-b flex justify-between border-black pl-2">
                  <img
                    src={icon}
                    alt="Logo"
                    className="h-full transition-all duration-300 "
                  />
                  <Button
                    label={
                      <FontAwesomeIcon
                        icon={faCircleXmark}
                        className="w-[60px] text-[25px]"
                      />
                    }
                    onClick={turnOff}
                    className="bg-transparent"
                  />
                </div>
                <div className="p-1 max-h-[430px] overflow-auto">
                  {sidebarItems.map((item, index) => (
                    <Link to={item.link} key={index}>
                      <Button
                        label={
                          <>
                            <FontAwesomeIcon icon={item.icon} className="mr-4" />
                            {item.title}
                          </>
                        }
                        className={
                          "relative w-full h-[60px] text-xl bg-transparent pl-4 justify-start text-black my-1 z-20 hover:bg-blue-50 transition-all ease-in-out 0.2s" +
                          (window.location.pathname.includes(item.link)
                            ? "bg-[#E4F4FF] boder text-blue-500"
                            : "")
                        }
                      />
                    </Link>
                  ))}
                </div>
                <div className="w-full border-t border-black p-1 px-4 mt-2">
                  <div className="flex items-center justify-between w-full ">
                    <img
                      className="w-[60px] rounded-full ml-4 object-cover"
                      src={user.avatar}
                      alt="Avatar"
                    />
                    <div className="text-right w-full font-medium h-full flex flex-col">
                      <p>{user.name}</p>
                      <p>{user.code}</p>
                    </div>
                  </div>
                  <Button
                    label={
                      <>
                        <FontAwesomeIcon
                          icon={faAddressCard}
                          className="mr-3"
                        />
                        Thông tin cá nhân
                      </>
                    }
                    onClick={infoLink}
                    className={
                      "p-2 my-4 bg-transparent border rounded-md w-full flex items-center justify-start"
                    }
                  />
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default SideBar;
