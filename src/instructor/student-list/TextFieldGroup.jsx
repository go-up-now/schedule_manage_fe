import TextField from "../../component/TextField";
import Button from "../../component/Button";

function TextFieldGroup({ thisStudent, onFieldChange }) {
  const handleChange = (field) => (event) => {
    onFieldChange(field, event.target.value);
  };
  return (
    <>
      <div className="w-full flex md:flex-row flex-col  mt-1 py-5`">
        <div className="flex-1">
          <TextField
            type="number"
            min={0}
            max={10}
            onField={true}
            label="Lab 1"
            value={thisStudent.lab1}
            className=" pt-4 px-4"
            onChange={handleChange("lab1")}
          />
          <TextField
            type="number"
            min={0}
            max={10}
            onField={true}
            label="Lab 2"
            value={thisStudent.lab2}
            className=" pt-4 px-4"
            onChange={handleChange("lab2")}
          />
          <TextField
            type="number"
            min={0}
            max={10}
            onField={true}
            label="Lab 3"
            value={thisStudent.lab3}
            className=" pt-4 px-4"
            onChange={handleChange("lab3")}
          />
          <TextField
            type="number"
            min={0}
            max={10}
            onField={true}
            label="Lab 4"
            value={thisStudent.lab4}
            className=" pt-4 px-4"
            onChange={handleChange("lab4")}
          />
          <TextField
            type="number"
            min={0}
            max={10}
            onField={true}
            label="Assignment 1"
            value={thisStudent.asm1}
            className=" pt-4 px-4"
            onChange={handleChange("asm1")}
          />
        </div>
        <div className="flex-1">
          <TextField
            type="number"
            min={0}
            max={10}
            onField={true}
            label="Lab 5"
            value={thisStudent.lab5}
            className=" pt-4 px-4"
            onChange={handleChange("lab5")}
          />
          <TextField
            type="number"
            min={0}
            max={10}
            onField={true}
            label="Lab 6"
            value={thisStudent.lab6}
            className=" pt-4 px-4"
            onChange={handleChange("lab6")}
          />
          <TextField
            type="number"
            min={0}
            max={10}
            onField={true}
            label="Lab 7"
            value={thisStudent.lab7}
            className=" pt-4 px-4"
            onChange={handleChange("lab7")}
          />
          <TextField
            type="number"
            min={0}
            max={10}
            onField={true}
            label="Lab 8"
            value={thisStudent.lab8}
            className=" pt-4 px-4"
            onChange={handleChange("lab8")}
          />
          <TextField
            type="number"
            min={0}
            max={10}
            onField={true}
            label="Assignment 2"
            value={thisStudent.asm2}
            className=" pt-4 px-4"
            onChange={handleChange("asm2")}
          />
        </div>
      </div>
      <div className="w-full flex md:flex-row flex-col border-t mt-5 py-5`">
        <div className="w-full">
          <TextField
            type="number"
            min={0}
            max={10}
            onField={true}
            label="Assignment Final:"
            value={thisStudent.asmFinal}
            className=" pt-4 px-4"
            onChange={handleChange("asmFinal")}
          />
        </div>
        <div className="w-full flex items-end justify-end md:pr-4  md:pt-0 pt-6 pl-4 pr-4">
          <Button
            label="LƯU"
            className="text-white md:w-[150px] w-full h-10 p-1 justify-center"
          ></Button>
        </div>
      </div>
    </>
  );
}

export default TextFieldGroup;
