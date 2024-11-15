import Tabs from "../../component/Tabs";
import NotYetSubject from "./tabs/NotYetSubject";
import PlanSubject from "./tabs/PlanSubject";
// import ChangeScheduleSubject from "../current-subject/ChangeScheduleSubject";

function RegisterSubject() {
  const tabsSubject = [
    { label: "Môn chưa học", content: <NotYetSubject /> },
    { label: "Môn học dự kiến", content: <PlanSubject /> },
    // { label: 'Doi mon hoc', content: <ChangeScheduleSubject/> },
  ];

  return (
    <div className="py-4">
      <Tabs tabs={tabsSubject} />
    </div>
  );
}
export default RegisterSubject;
