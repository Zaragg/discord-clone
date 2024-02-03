import { Link } from "react-router-dom";
import { useState } from "react";
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
                <div className="dob-register-box">
                  Month{" "}
                  <div className="chevron-container">
                    <box-icon name="chevron-down" color="#949BA4"></box-icon>
                  </div>
                </div>
                <div className="dob-register-box">
                  Day{" "}
                  <div className="chevron-container">
                    <box-icon name="chevron-down" color="#949BA4"></box-icon>
                  </div>
                </div>
                <div className="dob-register-box">
                  Year{" "}
                  <div className="chevron-container">
                    <box-icon name="chevron-down" color="#949BA4"></box-icon>
                  </div>
                </div>
              </div>
            </div>

            <button onClick={handleSubmit}>Continue</button>
            <span id="register-form-policy-span">
              By registering, you agree to Discord's{" "}
              <Link>Terms of Service</Link> and <Link>Privacy Policy</Link>.
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