import React, { useState, useEffect } from "react";

let main = false;
let userAccount;

function LoginAccount() {
  const [data, setData] = useState(null);

  //   useEffect(() => {
  //     // Fetch data from an API
  //     fetch("https://api.example.com/data")
  //       .then((response) => response.json())
  //       .then((data) => setData(data))
  //       .catch((error) => console.error("Error fetching data:", error));
  //   }, []);

  const user = {
    id: 1,
    code: "ps27456",
    name: "Tiểu Bạc Liêu",
    codeUser: "lieutbps27456",
    email: "lieutbps27456@fpt.edu.vn",
    ownEmail: "lieu123@gmail.com",
    gender: "Nam",
    birthday: "22/02/1998",
    phone: "0902888888",
    address: "23 AAABBBCCCC, Q1,P9",
    Specialization: "Công nghệ thông tin",
    major: "Phát triển phần mềm",
    avatar:
      "https://static.vecteezy.com/system/resources/previews/011/459/666/original/people-avatar-icon-png.png",
    role: "student",
  };

  useEffect(() => {}, []);

  userAccount = user;

  if ((userAccount = !null)) {
    main = true;
  }
  console.log(userAccount);

  return (
    <div>
      {data ? <pre>{JSON.stringify(data, null, 2)}</pre> : "Loading..."}
    </div>
  );
}

export { userAccount, main };
export default LoginAccount;
