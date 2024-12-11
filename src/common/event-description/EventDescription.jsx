import React from "react";
import { useParams, useLocation } from "react-router-dom";

function EventDescription() {
  const location = useLocation();
  const { event } = location.state || {};

  if (!event) {
    return <div>No event data available</div>;
  }
  const baseUrl =
    "https://res.cloudinary.com/dc06mgef2/image/upload/v1730087450/student/";

  return (
    <div className="mb-8">
      <div className="mb-6">
        <span className="font-bold text-[50px] text-red-700">{event.name}</span>
        <p className="font-bold text-[35px]">
          Sẽ được tổ chức tại{" "}
          <span className="text-blue-700">{event.place}</span>
        </p>
      </div>
      <img
        className="rounded-md w-full object-center"
        src={`${baseUrl}${event.image}`}
        alt={event.name}
      />
    </div>
  );
}

export default EventDescription;
