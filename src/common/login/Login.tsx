import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { getToken, introspect } from "../../api/Authentication.js";
import { jwtDecode } from "jwt-decode";
import { getUserScope } from "../../utils/authUtils.ts";

function Login() {
  const navigate = useNavigate();

  const handleLoginSuccess = async (response) => {
    try {
      const googleToken = response.credential;
      const decodedToken = jwtDecode(googleToken);
      await getToken(decodedToken.email);

      const role = getUserScope();
      if (role === "ROLE_ADMIN" || role === "ROLE_STUDENT" || role === "ROLE_INSTRUCTOR") {
        navigate("/");
      } else {
        alert("Tài khoản không đúng. Vui lòng thử lại.");
        navigate("/dang-nhap");
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  const handleLoginFailure = (error) => {
    console.error(error);
  };

  return (
    <div className="fixed top-0 left-0 z-50 bg-white w-screen h-full border flex">
      <div className="w-full border">
        <img
          src="https://iap-poly.s3.ap-southeast-1.amazonaws.com/wallpaper/hero1.JPG?fbclid=IwAR1rRUAoaHnTfDL2aff4wzf9OurJA2dSWhlmIRnYwarFZNOHCGGvvb3bJqo"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="w-full h-full border absolute bg-transparent flex items-start p-20">
        <GoogleOAuthProvider clientId="276809712128-5574t4arhjnv53n3pubg71cmhh802r9t.apps.googleusercontent.com">
          <div className="flex flex-col items-center p-10 bg-[#fafafa] rounded-md ">
            <h2 className="font-medium text-black text-3xl tracking-widest mb-8">
              ĐĂNG NHẬP
            </h2>
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onFailure={handleLoginFailure}
            />
          </div>
        </GoogleOAuthProvider>
      </div>
    </div>
  );
}

export default Login;
