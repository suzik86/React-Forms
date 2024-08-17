import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .matches(
      /^[A-ZА-ЯЁ][a-zA-ZА-ЯЁа-яё]*$/,
      "Name should contain only letters and start with an uppercase letter",
    ),
  age: Yup.number()
    .positive("Age should be a positive number")
    .integer("Age should be an integer"),
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email address"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.*[a-zа-яё])(?=.*[A-ZА-ЯЁ])(?=.*\d)(?=.*[@$!%*?&])[A-Za-zА-ЯЁа-яё\d@$!%*?&]{8,}$/,
      "Password should contain at least 8 characters, including 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character",
    ),
  confirmPassword: Yup.string()
    .required("Confirm Password is required")
    .oneOf([Yup.ref("password")], "Passwords must match"),
  gender: Yup.string().required("Gender is required"),
  acceptTerms: Yup.boolean().oneOf(
    [true],
    "You must accept the Terms and Conditions",
  ),
  picture: Yup.mixed()
    .test(
      "fileSize",
      "File size is too large. Max allowed size is 1MB",
      (value) => {
        if (!value || !(value as File).size) return true;
        return (value as File).size <= 1024 * 1024; // 1MB
      },
    )
    .test("fileType", "Invalid file type", (value) => {
      if (!value || !(value as File).type) return true;
      const file = value as File;
      const fileType = file.type;
      return fileType === "image/png" || fileType === "image/jpeg";
    }),
  country: Yup.string().required("Country is required"),
});

export default validationSchema;
