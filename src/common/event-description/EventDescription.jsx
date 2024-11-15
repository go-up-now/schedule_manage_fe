import React from "react";
import { useParams, useLocation } from "react-router-dom";

function EventDescription() {
  const { title } = useParams();
  const location = useLocation();
  const { event } = location.state || {};

  if (!event) {
    return <div>No event data available</div>;
  }

  return (
    <div className="mb-8">
      <div className="mb-6">
        <span className="font-bold text-[50px] text-slate-500">
          {event.date}-Sự kiện
        </span>
        <span className="font-bold text-[50px] text-red-700">
          {" "}
          : {event.title}
        </span>
        <p className="font-bold text-[35px]">
          Sẽ được tổ chức tại{" "}
          <span className="text-blue-700">{event.place}</span>
        </p>
      </div>
      <img
        className="rounded-md w-full object-center"
        src={event.img}
        alt={event.title}
      />
    </div>
  );
}

export default EventDescription;
