import { yupResolver } from "@hookform/resolvers/yup";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { IFormData } from "../../interfaces/FormDataInterface";
import { countries } from "../../store/countryList/selectors";
import { addForm } from "../../store/savedFormList/savedFormListSlice";
import { addFormData } from "../../store/secondFormData/secondFormDataSlice";
import validationSchema from "../../utils/validation";
import { convertBase64 } from "../../utils/convertBase64";

const SecondForm: React.FC = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm<IFormData>({
    resolver: yupResolver<IFormData>(validationSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      name: "",
      age: 0,
      email: "",
      password: "",
      confirmPassword: "",
      gender: "",
      acceptTerms: false,
      picture: undefined,
      country: "",
    },
  });

  const { errors, isValid } = formState;
  const [countrySelectOptions] = useState<string[]>(useSelector(countries));
  const dispatch = useDispatch();

  const onSubmit = async (data: IFormData) => {
    const file = data.picture && (data.picture as FileList)[0];
    let base64: string = "";
    if (file) {
      base64 = (await convertBase64(file as File)) as string;
    }
    const formDataForSave = { ...data, picture: base64 };
    dispatch(addFormData(formDataForSave));
    dispatch(addForm(formDataForSave));
    navigate("/");
  };

  return (
    <>
      <Link to="/">
        <button>Go to Main Page</button>
      </Link>
      <h1>Form with controlled components</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name" className="starlabel">
            Name:
          </label>
          <input
            type="text"
            id="name"
            placeholder="Enter First Name"
            {...register("name", { required: true })}
          />
          {errors.name && <p className="error-msg">{errors.name.message}</p>}
        </div>

        <div>
          <label htmlFor="age" className="starlabel">
            Age:
          </label>
          <input
            type="number"
            id="age"
            placeholder="Enter Your Age"
            {...register("age", { required: true })}
          />
          {errors.age && <p className="error-msg">{errors.age.message}</p>}
        </div>

        <div>
          <label htmlFor="email" className="starlabel">
            Email:
          </label>
          <input
            type="text"
            id="email"
            placeholder="Enter Email"
            {...register("email", { required: true })}
          />
          {errors.email && <p className="error-msg">{errors.email.message}</p>}
        </div>

        <div>
          <label htmlFor="password" className="starlabel">
            Password:
          </label>
          <input
            type="password"
            id="password"
            placeholder="Enter Password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <p className="error-msg">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="confirmPassword" className="starlabel">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Enter Password Again"
            {...register("confirmPassword", { required: true })}
          />
          {errors.confirmPassword && (
            <p className="error-msg">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="gender" className="starlabel">
            Gender:
          </label>
          <select id="gender" {...register("gender", { required: true })}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {errors.gender && (
            <p className="error-msg">{errors.gender.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="acceptTerms" className="starlabel">
            {" "}
            Accept Terms and Conditions:
          </label>
          <input
            type="checkbox"
            id="acceptTerms"
            {...register("acceptTerms", { required: true })}
          />

          {errors.acceptTerms && (
            <p className="error-msg">{errors.acceptTerms.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="picture">Upload Picture:</label>
          <input
            type="file"
            id="picture"
            accept=".png, .jpeg"
            {...register("picture")}
          />
          {errors.picture && (
            <p className="error-msg">{errors.picture.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="country" className="starlabel">
            Country:
          </label>
          <select id="country" {...register("country", { required: true })}>
            <option value="">Select Country</option>
            {countrySelectOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.country && (
            <p className="error-msg">{errors.country.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isValid === false}
          className={!isValid ? "disabled-btn" : "submit-btn"}
        >
          Submit
        </button>
      </form>
    </>
  );
};

export default SecondForm;
