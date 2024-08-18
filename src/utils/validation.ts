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
      /^(?=.*[a-zа-яё])(?=.*[A-ZА-ЯЁ])(?=.*\d)(?=.*[@$!%*?&])[A-Za-zА-ЯЁа-яё\d@$!%*?&]{4,}$/,
      "Password should contain at least 4 characters, including 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character",
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
        let file: File | undefined;

        if (value instanceof FileList) {
          file = value[0];
        } else if (value instanceof File) {
          file = value;
        }

        if (!file) {
          return true;
        }

        return file.size <= 1024 * 1024; // 1MB
      },
    )
    .test("fileType", "Invalid file type", (value) => {
      let file: File | undefined;

      if (value instanceof FileList) {
        file = value[0];
      } else if (value instanceof File) {
        file = value;
      }

      if (!file) {
        return true;
      }

      const validTypes = ["image/png", "image/jpeg"];
      return validTypes.includes(file.type);
    }),
  country: Yup.string().required("Country is required"),
});

export default validationSchema;
