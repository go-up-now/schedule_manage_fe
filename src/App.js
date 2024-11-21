import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import SideBar from "./component/sidebar/Sidebar.tsx";
import Header from "./component/sidebar/Header.tsx";
import Footer from "./component/Footer.jsx";
import { useDispatch } from 'react-redux';
import { getStudentInfo } from './api/Student.js'
import { setUser } from './reducers/userSlice.tsx';
import { getUserScope } from "./utils/authUtils.ts";
import { initFlowbite } from 'flowbite';

function App() {
  const [sideMenuIsExpand, setSideMenuIsExpand] = useState(true);
  const dispatch = useDispatch();

  const handleUserInfor = async () => {
    try {
      let response = await getStudentInfo();
      if (response && response.statusCode === 200) {
        dispatch(setUser({
          userInfo: response.data,
        }));
      }
    } catch (error) {
      console.log("Lỗi lấy thông tin sinh viên: ", error)
    }
  }

  useEffect(() => {
    handleUserInfor();
    initFlowbite(); // Reinitialize Flowbite components
  }, []);

  return (
    <>
      <Header />
      <div className="relative min-h-screen md:flex">
        {/* sidemenu */}
        <SideBar setExpand={setSideMenuIsExpand} />
        {/* content */}
        <div
          className={`flex-1 min-h-screen mx-0 bg-slate-100 transition-all duration-300 ease-in-out ${sideMenuIsExpand ? "md:ml-72" : "md:ml-20"
            }`}
        >
          <Outlet />
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
