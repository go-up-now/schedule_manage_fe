import TextField from "../../component/TextField";

function TextFieldGroup({
  major,
  codeSubject,
  codeClass,
  codeInstructor,
  date,
  ca,
  day,
}) {
  return (
    <div className=" flex flex-wrap ">
      <TextField
        label="Chuyên ngành:"
        value={major}
        className="w-2/4 pt-4 px-4"
        disabled
      />
      <TextField
        label="Mã Môn:"
        value={codeSubject}
        className="w-2/4 pt-4 px-4"
        disabled
      />
      <TextField
        label="Mã Môn:"
        value={codeClass}
        className="w-2/4 pt-4 px-4"
        disabled
      />
      <TextField
        label="Mã Môn:"
        value={codeInstructor}
        className="w-2/4 pt-4 px-4"
        disabled
      />
      <TextField
        label="Mã Môn:"
        value={date}
        className="w-2/4 pt-4 px-4"
        disabled
      />
      <TextField label="Ca:" value={ca} className="w-2/4 pt-4 px-4" disabled />
      <TextField
        label="Kiểu ngày:"
        value={day}
        className="w-2/4 pt-4 px-4"
        disabled
      />
    </div>
  );
}

export default TextFieldGroup;
