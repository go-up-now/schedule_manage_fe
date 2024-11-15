import TextField from "../../component/TextField";

function TextFieldGroup({
  dateStart,
  dateEnd,
  dateStartReady,
  dateEndReady,
  periodStart1,
  periodEnd1,
  periodStart2,
  periodEnd2,
}) {
  return (
    <div className="flex">
      <div className="w-2/4">
        <TextField
          label="Ngày bắt đầu:"
          value={dateStart}
          className="pt-4 px-4"
          disabled
        />
        <TextField
          label="Ngày kết thúc:"
          value={dateEnd}
          className="pt-4 px-4"
          disabled
        />
        <TextField
          label="Ngày bắt đầu chuẩn bị:"
          value={dateStartReady}
          className="pt-4 px-4"
          disabled
        />
        <TextField
          label="Ngày kết thúc chuẩn bị:"
          value={dateEndReady}
          className="pt-4 px-4"
          disabled
        />
      </div>
      <div className="w-2/4">
        <TextField
          label="Bắt đầu GĐ1:"
          value={periodStart1}
          className="pt-4 px-4"
          disabled
        />
        <TextField
          label="Kết thúc GĐ1:"
          value={periodEnd1}
          className="pt-4 px-4"
          disabled
        />
        <TextField
          label="Bắt đầu GĐ2:"
          value={periodStart2}
          className="pt-4 px-4"
          disabled
        />
        <TextField
          label="Kết thúc GĐ2:"
          value={periodEnd2}
          className="pt-4 px-4"
          disabled
        />
      </div>
    </div>
  );
}

export default TextFieldGroup;
