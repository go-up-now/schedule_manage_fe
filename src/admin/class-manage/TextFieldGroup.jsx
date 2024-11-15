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
    <div className="flex">
      <div className="w-2/4">
        <TextField
          label="Chuyên ngành:"
          value={major}
          className=" pt-4 px-4"
          disabled
        />
        <TextField
          label="Tên Môn:"
          value={nameSubject}
          className=" pt-4 px-4"
          disabled
        />
        <TextField
          label="Mã Môn:"
          value={codeSubject}
          className=" pt-4 px-4"
          disabled
        />
        <TextField
          label="Giảng viên:"
          value={instructor}
          className=" pt-4 px-4"
          disabled
        />
        <TextField label="Lớp:" value={clazz} className=" pt-4 px-4" disabled />
      </div>
      <div className="w-2/4">
        <TextField
          label="Bắt đầu:"
          value={dateBegin}
          className=" pt-4 px-4"
          disabled
        />
        <TextField
          label="Kết thúc:"
          value={dateEnd}
          className=" pt-4 px-4"
          disabled
        />
        <TextField label="Ca:" value={ca} className=" pt-4 px-4" disabled />
        <TextField
          label="Kiểu ngày:"
          value={day}
          className=" pt-4 px-4"
          disabled
        />
      </div>
    </div>
  );
}

export default TextFieldGroup;
