import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  faAddressCard,
  faRightFromBracket,
  faCaretDown,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import Notify from "./Notify";
import MiniMenu from "./MiniMenu";

const sitemapAdmin = [
  { title: "Thống kê", link: "/admin/statistics" },
  { title: "Quản lý lớp học", link: "/admin/class-manage" },
  { title: "Quản lý lịch thi", link: "/admin/testday-manage" },
  { title: "Quản lý học sinh", link: "/admin/student-manage" },
  { title: "Quản lý Lịch học", link: "/admin/schedule-manage" },
  { title: "Quản lý học kỳ", link: "/admin/semester-manage" },
];

const sitemapStudent = [
  { title: "Trang chủ", link: "student/home" },
  { title: "Lịch học", link: "/study-schedule" },
  { title: "Lịch thi", link: "/exam-schedule" },
  { title: "Môn học hiện tại", link: "/current-subject" },
  { title: "Đăng ký môn học", link: "/register-subject" },
  { title: "Lịch sử học tập", link: "/study-history" },
  { title: "Lịch", link: "/calendar" },
  { title: "Tìm kiếm môn học", link: "/find-subject" },
];

function Header({ userRole, user }) {
  console.log("user: " + user);
  const navigate = useNavigate();
  const [showUserInfo, setShowUserInfo] = useState(true);
  const [marginLeft, setMarginLeft] = useState("");
  const [fixed, setFixed] = useState("mt-1");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 783) {
        setShowUserInfo(false);
        setMarginLeft("ml-16");
        setFixed("fixed");
      } else {
        setShowUserInfo(true);
        setMarginLeft("");
        setFixed("mt-1");
      }
    };
    window.addEventListener("resize", handleResize);
    // Kiểm tra kích thước màn hình khi component được mount
    handleResize();
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [showUserInfo, marginLeft, fixed]);

  const sitemapAdmin = [
    { title: "Thống kê", link: "/admin/statistics" },
    { title: "Quản lý lớp học", link: "/admin/class-manage" },
    { title: "Quản lý lịch thi", link: "/admin/testday-manage" },
    { title: "Quản lý học sinh", link: "/admin/student-manage" },
    { title: "Quản lý Lịch học", link: "/admin/schedule-manage" },
    { title: "Quản lý học kỳ", link: "/admin/semester-manage" },
    {
      title: "Thông tin tài khoản",
      link: `/person-info/`,
    },
    {
      title: "Sự kiện",
      link: `/event/`,
    },
  ];

  const sitemapStudent = [
    { title: "Trang chủ", link: "/student/home" },
    { title: "Lịch học", link: "/student/study-schedule" },
    { title: "Lịch thi", link: "/student/exam-schedule" },
    { title: "Môn học hiện tại", link: "/student/current-subject" },
    { title: "Đổi lịch học", link: "/student/change-schedule" },
    { title: "Đăng ký môn học", link: "/student/register-subject" },
    { title: "Lịch sử học tập", link: "/student/study-history" },
    { title: "Lịch", link: "/student/calendar" },
    { title: "Tìm kiếm môn học", link: "/student/find-subject" },
    {
      title: "Thông tin tài khoản",
      link: `/person-info/`,
    },
    {
      title: "Sự kiện",
      link: `/event/`,
    },
  ];

  const sitemapInstructor = [
    { title: "Trang chủ", link: "/instructor/home" },
    { title: "Lịch dạy theo ngày", link: "/instructor/teach-day" },
    { title: "Tìm kiêm môn học", link: "/instructor/find-subject" },
    { title: "Quản lý lớp dạy", link: "/instructor/teach-manage" },
    { title: "Đặt lại lịch học", link: "/instructor/offed-replace" },
    { title: "Điểm danh", link: "/instructor/check-attendance" },
    { title: "Danh sách sinh viên", link: "/instructor/student-list" },
    { title: "Xếp lịch thi", link: "/instructor/exam-arrange" },
    {
      title: "Thông tin tài khoản",
      link: `/person-info/`,
    },
    {
      title: "Sự kiện",
      link: `/event/`,
    },
  ];

  let sidemapItems;

  switch (userRole) {
    case "student":
      sidemapItems = sitemapStudent;
      break;
    case "admin":
      sidemapItems = sitemapAdmin;
      break;
    case "instructor":
      sidemapItems = sitemapInstructor;
      break;
    default:
      sidemapItems = [];
      break;
  }

  console.log("sitemapItems:", sidemapItems);

  const page = sidemapItems.findIndex((page) =>
    window.location.pathname.includes(page.link)
  );
  console.log("page index:", page);

  const title = (page >= 0 && sidemapItems[page].title) || "";
  console.log("title:", title);

  const infoLink = () => {
    navigate(
      `/person-info/${encodeURIComponent(user.code)}/${encodeURIComponent(
        user.name
      )}`,
      {
        state: { user },
      }
    );
  };

  const menuItem = [
    { icon: faAddressCard, text: "Thông tin cá nhân", onClick: infoLink },
    {
      icon: faRightFromBracket,
      text: "Đăng xuất",
      isDanger: false,
    },
  ];

  const menuNotify = [
    {
      title: "Tới lúc nào mới hạnh phúc?",
      des: "Tự hỏi bản thân đi, hạnh phúc sẽ có khi chính ta thấy đủ.",
    },
    {
      title: "Thế giới này đẹp không?",
      des: "Thế giới này sẽ đẹp khi bạn thích những thứ bạn không thích, còn không nó sẽ chỉ có sự xấu xí.",
    },
  ];

  return (
    <div
      className={`w-full h-[64px] bg-white shadow-md flex items-center justify-between z-30 md:sticky md:top-0 fixed`}
    >
      <div className="">
        <p className={`self-center font-bold pl-4 ${marginLeft}`}>{title}</p>
      </div>
      <div className="h-16 border-black flex items-center justify-between pr-8">
        <Notify iconNotify={faBell} menuNotifys={menuNotify} />
        {showUserInfo && (
          <div className="flex h-full py-1 ml-1">
            <div className="text-right font-medium h-full flex flex-col justify-center items-center">
              <p>{user.name}</p>
              <p>{user.code}</p>
            </div>
            <img
              className="w-[60px] rounded-full ml-4 object-cover"
              src={user.avatar}
            />
            <MiniMenu
              classNameMiniBox={"mt-3"}
              classNameBtn={"ml-4 h-full"}
              iconMenu={faCaretDown}
              menuItems={menuItem}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
