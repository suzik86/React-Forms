import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  age,
  country,
  email,
  gender,
  name,
  picture,
} from "../../store/firstFormData/selectors";
import { savedFormList } from "../../store/savedFormList/selectors";
import {
  secondAge,
  secondCountry,
  secondEmail,
  secondGender,
  secondName,
  secondPicture,
} from "../../store/secondFormData/selectors";
import "./MainPage.css";

const MainPage: React.FC = () => {
  const name1 = useSelector(name);
  const age1 = useSelector(age);
  const email1 = useSelector(email);
  const gender1 = useSelector(gender);
  const picture1 = useSelector(picture) as string;
  const country1 = useSelector(country);

  const name2 = useSelector(secondName);
  const age2 = useSelector(secondAge);
  const email2 = useSelector(secondEmail);
  const gender2 = useSelector(secondGender);
  const picture2 = useSelector(secondPicture) as string;
  const country2 = useSelector(secondCountry);

  const savedForms = useSelector(savedFormList);

  return (
    <main>
      <h1>React Forms</h1>
      <div className="links-wrapper">
        <div>
          <Link to={`/form1`} className="form-link">
            <h4 className="link-title">Form with uncontrolled components</h4>
            <div className="data-block">
              <p className="card-title">Last saved data from the form:</p>
              {!name1 && <span className="no-data">No data</span>}
              {name1 && (
                <ul>
                  <li>
                    Name: <span className="form-data-item">{name1}</span>
                  </li>
                  <li>
                    Age: <span className="form-data-item">{age1}</span>
                  </li>
                  <li>
                    Email: <span className="form-data-item">{email1}</span>
                  </li>
                  <li>
                    Gender: <span className="form-data-item">{gender1}</span>
                  </li>
                  <li>
                    Country: <span className="form-data-item">{country1}</span>
                  </li>
                  <li>
                    {picture1 && (
                      <img
                        src={picture1}
                        alt="avatar"
                        style={{ width: "200px", height: "auto" }}
                      />
                    )}
                  </li>
                </ul>
              )}
            </div>
          </Link>
        </div>
        <div>
          <Link to={`/form2`} className="form-link">
            <h4 className="link-title">Form with controlled components</h4>
            <div className="data-block">
              <p className="card-title">Last saved data from the form:</p>
              {!name2 && <span className="no-data">No data</span>}
              {name2 && (
                <ul>
                  <li>
                    Name: <span className="form-data-item">{name2}</span>
                  </li>
                  <li>
                    Age: <span className="form-data-item">{age2}</span>
                  </li>
                  <li>
                    Email: <span className="form-data-item">{email2}</span>
                  </li>
                  <li>
                    Gender: <span className="form-data-item">{gender2}</span>
                  </li>
                  <li>
                    Country: <span className="form-data-item">{country2}</span>
                  </li>
                  <li>
                    {picture2 && (
                      <img
                        src={picture2}
                        alt="avatar"
                        style={{ width: "200px", height: "auto" }}
                      />
                    )}
                  </li>
                </ul>
              )}
            </div>
          </Link>
        </div>
      </div>
      <section>
        <h3 className="history-title">History of all saved forms</h3>
        {savedForms.length === 0 && (
          <span className="no-data">No saved forms yet</span>
        )}
        <ul>
          {savedForms.map((form, index) => (
            <li key={index} className="history-item">
              <span className="form-data-item">Name: {form.name}</span>
              <span className="form-data-item">Age: {form.age}</span>
              <span className="form-data-item">Email: {form.email}</span>
              <span className="form-data-item">Gender: {form.gender}</span>
              <span className="form-data-item">Country: {form.country}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
};

export default MainPage;
