import Tabs from "../../component/Tabs";
import NotYetSubject from "./tabs/NotYetSubject";
import PlanSubject from "./tabs/PlanSubject";
// import ChangeScheduleSubject from "../current-subject/ChangeScheduleSubject";
import Container from "../../component/Container.tsx";
import TitleHeader from "../../component/TitleHeader.tsx";

function RegisterSubject() {
  const tabsSubject = [
    { label: "Môn chưa học", content: <NotYetSubject /> },
    { label: "Môn học dự kiến", content: <PlanSubject /> },
    // { label: 'Doi mon hoc', content: <ChangeScheduleSubject/> },
  ];

  return (
    <Container>
      <TitleHeader title={"ĐĂNH KÝ MÔN HỌC"} />
      <div className="mt-4">
        <Tabs tabs={tabsSubject} />
      </div>
    </Container>
  );
}
export default RegisterSubject;
