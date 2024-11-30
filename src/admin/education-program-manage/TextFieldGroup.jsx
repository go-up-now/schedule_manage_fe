import TextField from "../../component/TextField";

function TextFieldGroup({
  ...props
}) {
  return (
    <div className="flex">
      <div className="w-2/4">
        <TextField
          onField={true}
          label="Tên chương trình:"
          value={props.name}
          className="pt-4 px-4"
          disabled
        />
        <TextField
          onField={true}
          label="Học kỳ triển khải:"
          value={props.semester}
          className="pt-4 px-4"
          disabled
        />
      </div>
      <div className="w-2/4">
        <TextField
          onField={true}
          label="Năm triển khải:"
          value={props.year}
          className="pt-4 px-4"
          disabled
        />
      </div>
    </div>
  );
}

export default TextFieldGroup;
