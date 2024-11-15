import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import events from "./events";

function HomePage() {
  const navigate = useNavigate();

  // const [className, setClassName] = useState("w-1/4 h-80 p-6");

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth <= 783) {
  //       setClassName("w-1/2 ");
  //     } else {
  //       setClassName("w-1/4");
  //     }
  //   };
  //   window.addEventListener("resize", handleResize);
  //   // Kiểm tra kích thước màn hình khi component được mount
  //   handleResize();
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, [className]);

  return (
    <div className="py-4">
      {events.map((event) => (
        <div key={event.id} className={`w-1/2 md:w-1/4 p-4 inline-block`}>
          <button
            className="w-full rounded-md overflow-hidden bg-slate-100"
            onClick={() => {
              navigate(`/event/${encodeURIComponent(event.title)}`, {
                state: { event },
              });
            }}
          >
            <img className="w-full" src={event.img} alt={event.title} />
            <div className="px-4">
              <p className="text-left font-medium text-lg truncate my-1">
                {event.title}
              </p>
              <p className="text-left truncate my-1">{event.place}</p>
              <p className="text-right text-slate-500 my-1">{event.date}</p>
            </div>
          </button>
        </div>
      ))}
    </div>
  );
}

export default HomePage;
