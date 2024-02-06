import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Dropdown from "../components/Dropdown";
import "boxicons";
export default function Register() {
  const [formData, setFormData] = useState({
    email: "",
    displayname: "",
    username: "",
    password: "",
    dob: {
      month: "",
      day: "",
      year: "",
    },
  });

  const updateMonth = (item) => {
    console.log("update the state for the month");
    setFormData({
      ...formData,
      dob: {
        ...formData.dob,
        month: item,
      },
    });
  };

  const updateDay = (item) => {
    setFormData({
      ...formData,
      dob: {
        ...formData.dob,
        day: item,
      },
    });
  };

  const updateYear = (item) => {
    setFormData({
      ...formData,
      dob: {
        ...formData.dob,
        year: item,
      },
    });
  };

  useEffect(() => {
    console.log(formData)
  }, [formData])

  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="form-container">
      <div className="login-form-container register-form-container">
        <div className="form-content">
          <div className="login-form-headers">
            <h2>Create an account</h2>
          </div>

          <div className="login-form-fields">
            <div className="form-input-field">
              <label className="required">
                <b>EMAIL</b>
              </label>
              <input
                type="text"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                }}
              />
            </div>

            <div className="form-input-field">
              <label>
                <b>DISPLAY NAME</b>
              </label>
              <input
                type="text"
                value={formData.displayname}
                onChange={(e) => {
                  setFormData({ ...formData, displayname: e.target.value });
                }}
              />
            </div>

            <div className="form-input-field">
              <label className="required">
                <b>USERNAME</b>
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => {
                  setFormData({ ...formData, username: e.target.value });
                }}
              />
            </div>

            <div className="form-input-field">
              <label className="required">
                <b>PASSWORD</b>
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
              />
            </div>

            <div className="form-input-field">
              <label className="required">
                <b>DATE OF BIRTH</b>
              </label>
              <div className="dob-register-container">
                <Dropdown placeholder="Month" updateDOB={updateMonth} />

                <Dropdown placeholder="Day" updateDOB={updateDay} />

                <Dropdown placeholder="Year" updateDOB={updateYear} />
              </div>
            </div>

            <button onClick={handleSubmit}>Continue</button>
            <span id="register-form-policy-span">
              By registering, you agree to Discord's{" "}
              <a
                href="https://discord.com/terms"
                target="_blank"
                rel="noopener noreferrer"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="https://discord.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                Privacy Policy
              </a>
              .
            </span>

            <span className="login-form-register-span">
              <Link to="/login">Already have an account?</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
