import TextField from "../../component/TextField";

function TextFieldGroup({
  major,
  email,
  perEmail,
  clazz,
  phone,
  address,
  credit,
  ownCredit,
}) {
  return (
    <div className="flex">
      <div className="w-2/4">
        <TextField
          label="Chuyên ngành:"
          value={major}
          className="pt-4 px-4"
          disabled
        />
        <TextField
          label="Email:"
          value={email}
          className="pt-4 px-4"
          disabled
        />
        <TextField
          label="Email cá nhân:"
          value={perEmail}
          className="pt-4 px-4"
          disabled
        />
        <TextField label="Lớp:" value={clazz} className="pt-4 px-4" disabled />
      </div>
      <div className="w-2/4">
        <TextField
          label="Số di động:"
          value={phone}
          className="pt-4 px-4"
          disabled
        />
        <TextField
          label="Địa chỉ:"
          value={address}
          className="pt-4 px-4"
          disabled
        />
        <TextField
          label="Số tín chỉ:"
          value={credit}
          className="pt-4 px-4"
          disabled
        />
        <TextField
          label="Số tín chỉ đã hoàn thành:"
          value={ownCredit}
          className="pt-4 px-4"
          disabled
        />
      </div>
    </div>
  );
}

export default TextFieldGroup;
