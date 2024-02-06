import { Link } from "react-router-dom";
import { useState } from "react";
import Dropdown from "../components/Dropdown";
import "boxicons";
export default function Register() {
  const [isMonthActive, setIsMonthActive] = useState(false);
  const [isDayActive, setIsDayActive] = useState(false);
  const [isYearActive, setIsYearActive] = useState(false);

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
              <input type="text" name="email" />
            </div>

            <div className="form-input-field">
              <label>
                <b>DISPLAY NAME</b>
              </label>
              <input type="text" name="displayname" />
            </div>

            <div className="form-input-field">
              <label className="required">
                <b>USERNAME</b>
              </label>
              <input type="text" name="username" />
            </div>

            <div className="form-input-field">
              <label className="required">
                <b>PASSWORD</b>
              </label>
              <input type="password" name="password" />
            </div>

            <div className="form-input-field">
              <label className="required">
                <b>DATE OF BIRTH</b>
              </label>
              <div className="dob-register-container">
                <Dropdown placeholder="Month" />

                <Dropdown placeholder="Day" />

                <Dropdown placeholder="Year" />
              </div>
            </div>

            <button onClick={handleSubmit}>Continue</button>
            <span id="register-form-policy-span">
              By registering, you agree to Discord's{" "}
              <a href="https://discord.com/terms" target="_blank" rel="noopener noreferrer">Terms of Service</a> and{" "}
              <a href="https://discord.com/privacy" target="_blank" rel="noopener noreferrer">Privacy Policy</a>.
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
