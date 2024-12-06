import * as React from "react";
import Container from "../../component/Container.tsx";
import TitleHeader from "../../component/TitleHeader.tsx";
import DateCalendarServerRequest from "./DateCalendarServerRequest.tsx";

function Calendar() {
  return (
    <Container>
      <TitleHeader title={"GHI CHÚ"} />
      <div className="w-full min-h-[700px]">
        <DateCalendarServerRequest />
      </div>
    </Container>
  );
}

export default Calendar;
