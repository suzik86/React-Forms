import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { addFormData } from "../../store/firstFormData/firstFormDataSlice";
import { countries } from "../../store/countryList/selectors";
import validationSchema from "../../utils/validation";
import { addForm } from "../../store/savedFormList/savedFormListSlice";
import { convertBase64 } from "../../utils/convertBase64";

const FirstForm: React.FC = () => {
  const navigate = useNavigate();

  const [countrySelectOptions] = useState<string[]>(useSelector(countries));

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLSelectElement>(null);

  const dispatch = useDispatch();

  const [nameError, setNameError] = useState<string>("");
  const [ageError, setAgeError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");
  const [genderError, setGenderError] = useState<string>("");
  const [acceptTermsError, setAcceptTermsError] = useState<string>("");
  const [pictureError, setPictureError] = useState<string>("");
  const [countryError, setCountryError] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const file = pictureRef.current?.files?.[0];

    let base64: string = "";
    if (file) {
      base64 = (await convertBase64(file)) as string;
    }

    const formData = {
      name: nameRef.current?.value,
      age: Number(ageRef.current?.value) || 0,
      email: emailRef.current?.value,
      password: passwordRef.current?.value,
      confirmPassword: confirmPasswordRef.current?.value,
      picture: file,
      gender: genderRef.current?.value,
      terms: termsRef.current?.checked || false,
      country: countryRef.current?.value,
    };

    const formDataForSave = { ...formData, picture: base64 };

    try {
      await validationSchema.validate(formData, { abortEarly: false });

      dispatch(addFormData(formDataForSave));
      dispatch(addForm(formDataForSave));

      if (nameRef.current) nameRef.current.value = "";
      if (ageRef.current) ageRef.current.value = "";
      if (emailRef.current) emailRef.current.value = "";
      if (passwordRef.current) passwordRef.current.value = "";
      if (confirmPasswordRef.current) confirmPasswordRef.current.value = "";
      if (genderRef.current) genderRef.current.value = "";
      if (termsRef.current) termsRef.current.checked = false;
      if (pictureRef.current) pictureRef.current.value = "";
      if (countryRef.current) countryRef.current.value = "";

      navigate("/");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = error.inner.reduce(
          (acc, validationError) => {
            acc[validationError.path as keyof typeof formData] =
              validationError.message;
            return acc;
          },
          {} as Record<keyof typeof formData, string>,
        );

        setNameError(errors.name || "");
        setAgeError(errors.age || "");
        setEmailError(errors.email || "");
        setPasswordError(errors.password || "");
        setConfirmPasswordError(errors.confirmPassword || "");
        setGenderError(errors.gender || "");
        setAcceptTermsError(errors.terms || "");
        setPictureError(errors.picture || "");
        setCountryError(errors.country || "");
      }
    }
  };

  return (
    <>
      <Link to="/">
        <button>Go to Main Page</button>
      </Link>
      <h1>Form with uncontrolled components</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name" className="starlabel">
            Name:
          </label>
          <input
            type="text"
            id="name"
            ref={nameRef}
            placeholder="Enter First Name"
          />
          {nameError && <span className="error-msg">{nameError}</span>}
        </div>
        <div>
          <label htmlFor="age" className="starlabel">
            Age:
          </label>
          <input
            type="number"
            id="age"
            ref={ageRef}
            placeholder="Enter Your Age"
          />
          {ageError && <span className="error-msg">{ageError}</span>}
        </div>
        <div>
          <label htmlFor="email" className="starlabel">
            Email:
          </label>
          <input
            type="email"
            id="email"
            ref={emailRef}
            placeholder="Enter email"
          />
          {emailError && <span className="error-msg">{emailError}</span>}
        </div>
        <div>
          <label htmlFor="password" className="starlabel">
            Password:
          </label>
          <input
            type="password"
            id="password"
            ref={passwordRef}
            placeholder="Enter password"
          />
          {passwordError && <span className="error-msg">{passwordError}</span>}
        </div>
        <div>
          <label htmlFor="confirmPassword" className="starlabel">
            Confirm Password:
          </label>
          <input
            type="password"
            id="confirmPassword"
            ref={confirmPasswordRef}
            placeholder="Enter password one more time"
          />
          {confirmPasswordError && (
            <span className="error-msg">{confirmPasswordError}</span>
          )}
        </div>

        <div>
          <label htmlFor="gender" className="starlabel">
            Gender:
          </label>
          <select id="gender" ref={genderRef}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          {genderError && <span className="error-msg">{genderError}</span>}
        </div>

        <div>
          <label htmlFor="terms" className="starlabel">
            Accept Terms and Conditions:
          </label>
          <input type="checkbox" id="terms" ref={termsRef} />
          {acceptTermsError && (
            <span className="error-msg">{acceptTermsError}</span>
          )}
        </div>
        <div>
          <label htmlFor="picture">Upload Picture:</label>
          <input
            type="file"
            id="picture"
            ref={pictureRef}
            accept=".png, .jpeg"
          />
          {pictureError && <span className="error-msg">{pictureError}</span>}
        </div>
        <div>
          <label htmlFor="country" className="starlabel">
            Country:
          </label>
          <select id="country" ref={countryRef}>
            <option value="">Select Country</option>
            {countrySelectOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {countryError && <span className="error-msg">{countryError}</span>}
        </div>
        <button type="submit" className="submit-btn">
          Submit
        </button>
      </form>
    </>
  );
};

export default FirstForm;
