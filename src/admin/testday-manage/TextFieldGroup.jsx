import TextField from "../../component/TextField";

function TextFieldGroup({
  major,
  nameSubject,
  codeSubject,
  instructor,
  clazz,
  dateBegin,
  dateEnd,
  ca,
  day,
}) {
  return (
    <div className=" flex flex-wrap ">
      <TextField
        label="Chuyên ngành:"
        value={major}
        className="w-2/4 items-center pt-4 px-4"
        disabled
      />
      <TextField
        label="Tên Môn:"
        value={nameSubject}
        className="w-2/4 items-center pt-4 px-4"
        disabled
      />
      <TextField
        label="Mã Môn:"
        value={codeSubject}
        className="w-2/4 items-center pt-4 px-4"
        disabled
      />
      <TextField
        label="Lớp:"
        value={clazz}
        className="w-2/4 items-center pt-4 px-4"
        disabled
      />
      <TextField
        label="Ngày:"
        value={dateBegin}
        className="w-2/4 items-center pt-4 px-4"
        disabled
      />
      <TextField
        label="Ca:"
        value={ca}
        className="w-2/4 items-center pt-4 px-4"
        disabled
      />
    </div>
  );
}

export default TextFieldGroup;
