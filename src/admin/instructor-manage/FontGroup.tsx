import React, { useState, useEffect } from "react";
import SelectBox from "../../component/SelectBox";
import TextField from "../../component/TextField";
import TextArea from "../../component/TextArea";
import Button from "../../component/Button";
import { specializationOption, gender, educationProgramId } from "./DataSelect";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFile, faPlus, faWrench } from "@fortawesome/free-solid-svg-icons";
import * as Yup from "yup";
import { differenceInYears } from "date-fns";
import { FormikProps } from "formik";
import Spinner from "../../component/Spinner.tsx";

interface FontGroupProps {
  isEditDisabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  formik: FormikProps<any>;
  loading?: boolean;
  setEditInstructor;
  setIsEditDisabled;
  specialization;
}

// Xác thực giảng viên
export const instructorValidationSchema = Yup.object().shape({
  id: Yup.number().required(),
  specializationId: Yup.string().required("Vui lòng chọn bộ môn"),
  code: Yup.string().required("Vui lòng nhập mã giảng viên"),
  lastName: Yup.string().required("Vui lòng nhập họ giảng viên"),
  firstName: Yup.string().required("Vui lòng nhập tên giảng viên"),
  schoolEmail: Yup.string()
    .required("Vui lòng nhập email giảng viên")
    .email("Email không hợp lệ"),
  privateEmail: Yup.string()
    .required("Vui lòng nhập email cá nhân")
    .email("Email không hợp lệ"),
  phone: Yup.string()
    .required("Vui lòng nhập số điện thoại")
    .matches(/^0[0-9]+$/, "Số điện thoại không hợp lệ")
    .min(10, "Số điện thoại phải có ít nhất 10 chữ số")
    .max(11, "Số điện thoại chỉ được có tối đa 11 chữ số"),
  address: Yup.string()
    .required("Vui lòng nhập địa chỉ")
    .max(100, "Địa chỉ không vượt quá 100 ký tự"),
  birthday: Yup.date()
    .required("Vui lòng nhập ngày sinh")
    .test("is-18-years-old", "Bạn phải ít nhất 18 tuổi", function (value) {
      const today = new Date(); // Ngày hiện tại
      return value ? differenceInYears(today, value) >= 18 : false; // Kiểm tra nếu tuổi >= 18
    }),
  gender: Yup.boolean().required("Vui lòng chọn giới tính"),
});

const FontGroup: React.FC<FontGroupProps> = ({
  isEditDisabled = false,
  onClick,
  formik,
  loading = false,
  setEditInstructor,
  setIsEditDisabled,
  specialization,
}) => {
  const [areSelectBoxesDisabled, setAreSelectBoxesDisabled] = useState(false);

  useEffect(() => {
    setAreSelectBoxesDisabled(isEditDisabled);
  }, [isEditDisabled]);

  const defaultValues = {
    id: 0,
    code: "",
    lastName: "",
    firstName: "",
    schoolEmail: "",
    privateEmail: "",
    gender: "true",
    birthday: "",
    phone: "",
    address: "",
    avatar: "",
    description: "",
    specializationId: "1",
  };

  const handleResetForm = () => {
    setAreSelectBoxesDisabled(false);
    setIsEditDisabled(false);
    if (formik.getFieldProps("id").value === 0) {
      formik.resetForm();
    } else {
      setEditInstructor(defaultValues);
    }
  };

  return (
    <div className="px-2 pt-1 ">
      <div className="pt-2 mb-2">
        <SelectBox
          options={specialization}
          nameSelect="Bộ môn"
          disable={areSelectBoxesDisabled}
          className1={`w-full ${
            formik.touched.specializationId &&
            formik.errors.specializationId &&
            "border-red-500"
          }`}
          onChange={(value) =>
            formik.setFieldValue("specializationId", value.target.value)
          }
          value={formik.values.specializationId || undefined}
        />
        {formik.errors.specializationId && formik.touched.specializationId && (
          <div className="text-red-500">
            {formik.errors.specializationId as string}
          </div>
        )}
      </div>
      <div>
        <TextField
          onField={true}
          placeholder="Mã giảng viên"
          className="p-0 mt-2"
          className1={`w-full ${
            formik.touched.code && formik.errors.code && "border-red-500"
          }`}
          disabled={areSelectBoxesDisabled}
          {...formik.getFieldProps("code")}
        />
        {formik.errors.code && formik.touched.code && (
          <div className="text-red-500">{formik.errors.code as string}</div>
        )}
      </div>
      <div>
        <TextField
          onField={true}
          placeholder="Họ"
          className="p-0 mt-2"
          className1={`w-full ${
            formik.touched.lastName &&
            formik.errors.lastName &&
            "border-red-500"
          }`}
          disabled={false} // Không bị vô hiệu hoá
          {...formik.getFieldProps("lastName")}
        />
        {formik.errors.lastName && formik.touched.lastName && (
          <div className="text-red-500">{formik.errors.lastName as string}</div>
        )}
      </div>
      <div>
        <TextField
          onField={true}
          placeholder="Tên"
          className="p-0 mt-2"
          disabled={false} // Không bị vô hiệu hoá
          className1={`w-full ${
            formik.touched.firstName &&
            formik.errors.firstName &&
            "border-red-500"
          }`}
          {...formik.getFieldProps("firstName")}
        />
        {formik.errors.firstName && formik.touched.firstName && (
          <div className="text-red-500">
            {formik.errors.firstName as string}
          </div>
        )}
      </div>
      <div className="pt-6 mb-2">
        <SelectBox
          options={gender}
          nameSelect="Giới tính"
          className1={`w-full ${
            formik.touched.gender && formik.errors.gender && "border-red-500"
          }`}
          onChange={(value) =>
            formik.setFieldValue("gender", value.target.value)
          }
          value={formik.values.gender || undefined}
        />
        {formik.errors.gender && formik.touched.gender && (
          <div className="text-red-500">{formik.errors.gender as string}</div>
        )}
      </div>
      <div>
        <TextField
          onField={true}
          placeholder="Email giảng viên"
          className="p-0 mt-2"
          className1={`w-full ${
            formik.touched.schoolEmail &&
            formik.errors.schoolEmail &&
            "border-red-500"
          }`}
          {...formik.getFieldProps("schoolEmail")}
          disabled={areSelectBoxesDisabled}
        />
        {formik.errors.schoolEmail && formik.touched.schoolEmail && (
          <div className="text-red-500">
            {formik.errors.schoolEmail as string}
          </div>
        )}
      </div>
      <div>
        <TextField
          onField={true}
          placeholder="Email cá nhân"
          className="p-0 mt-2"
          className1={`w-full ${
            formik.touched.privateEmail &&
            formik.errors.privateEmail &&
            "border-red-500"
          }`}
          {...formik.getFieldProps("privateEmail")}
          disabled={areSelectBoxesDisabled}
        />
        {formik.errors.privateEmail && formik.touched.privateEmail && (
          <div className="text-red-500">
            {formik.errors.privateEmail as string}
          </div>
        )}
      </div>
      <div>
        <TextField
          type={"date"}
          onField={true}
          placeholder="Ngày sinh"
          className="p-0 mt-2"
          className1={`w-full ${
            formik.touched.birthday &&
            formik.errors.birthday &&
            "border-red-500"
          }`}
          {...formik.getFieldProps("birthday")}
          disabled={false} // Không bị vô hiệu hoá
        />
        {formik.errors.birthday && formik.touched.birthday && (
          <div className="text-red-500">{formik.errors.birthday as string}</div>
        )}
      </div>
      <div>
        <TextField
          onField={true}
          placeholder="Số điện thoại"
          className="p-0 mt-2"
          className1={`w-full ${
            formik.touched.phone && formik.errors.phone && "border-red-500"
          }`}
          {...formik.getFieldProps("phone")}
          disabled={false} // Không bị vô hiệu hoá
        />
        {formik.errors.phone && formik.touched.phone && (
          <div className="text-red-500">{formik.errors.phone as string}</div>
        )}
      </div>
      <div>
        <TextField
          onField={true}
          placeholder="Địa chỉ"
          className="p-0 mt-2"
          className1={`w-full ${
            formik.touched.address && formik.errors.address && "border-red-500"
          }`}
          {...formik.getFieldProps("address")}
          disabled={false} // Không bị vô hiệu hoá
        />
        {formik.errors.address && formik.touched.address && (
          <div className="text-red-500">{formik.errors.address as string}</div>
        )}
      </div>
      <div>
        <TextArea
          placeholder="Mô tả"
          className="p-0 mt-2"
          // className1={`w-full ${formik.touched.description && formik.errors.description && 'border-red-500'}`}
          {...formik.getFieldProps("description")}
          disabled={false} // Không bị vô hiệu hoá
        />
      </div>
      <div className="flex mt-4">
        <div className="w-1/3 flex justify-center">
          <Button
            label={
              <>
                <FontAwesomeIcon icon={faFile} className="mr-2" />
                Mới
              </>
            }
            className="w-11/12 p-2 text-white justify-center"
            onClick={handleResetForm}
          />
        </div>
        <div className="w-1/3 flex justify-center">
          <Button
            label={
              loading ? (
                <>
                  <Spinner className="text-white" />
                </>
              ) : (
                <>Lưu</>
              )
            }
            className="w-11/12 p-2 text-white justify-center"
            disabled={loading}
            onClick={onClick}
          />
        </div>
      </div>
    </div>
  );
};

export default FontGroup;
