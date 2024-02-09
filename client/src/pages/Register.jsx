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

  const [emailErr, setEmailErr] = useState(false);
  const [usernameErr, setUsernameErr] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);

  const [yearErr, setYearErr] = useState(false);
  const [dayErr, setDayErr] = useState(false);
  const [monthErr, setMonthErr] = useState(false);

  useEffect(() => {
    const updateDobErr = () => {
      if (formData.dob.day != "") setDayErr(false);
      if (formData.dob.month != "") setMonthErr(false);
      if (formData.dob.year != "") setYearErr(false);
    };
    console.log("dob change");
    updateDobErr();
  }, [formData.dob]);

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

  const validate = () => {
    console.log(formData);
    if (
      formData.email == "" ||
      formData.username == "" ||
      formData.password == "" ||
      formData.dob.month == "" ||
      formData.dob.year == "" ||
      formData.dob.day == ""
    )
      return false;
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.dob.month == "") setMonthErr(true);
    if (formData.dob.day == "") setDayErr(true);
    if (formData.dob.year == "") setYearErr(true);
    if (formData.email == "") setEmailErr(true);
    if (formData.username == "") setUsernameErr(true);
    if (formData.password == "") setPasswordErr(true);

    // clear errors messages
    var isValid = validate();
    console.log(isValid);

    if (!isValid) console.log("client side errors. cannot proceed");

    /*setEmailErr(false);
    setUsernameErr(false);
    setPasswordErr(false);
    setMonthErr(false);
    setDayErr(false);
    setYearErr(false);*/
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
              <label className={emailErr ? "" : "required"}>
                <span className={emailErr ? "error-span" : ""}>
                  <b>EMAIL</b> {emailErr ? <i> - Required</i> : ""}
                </span>
              </label>
              <input
                type="text"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  !e.target.value ? setEmailErr(true) : setEmailErr(false);
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
              <label className={usernameErr ? "" : "required"}>
                <span className={usernameErr ? "error-span" : ""}>
                  <b>USERNAME</b> {usernameErr ? <i> - Required</i> : ""}
                </span>
              </label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => {
                  setFormData({ ...formData, username: e.target.value });
                  !e.target.value
                    ? setUsernameErr(true)
                    : setUsernameErr(false);
                }}
              />
            </div>

            <div className="form-input-field">
              <label className={passwordErr ? "" : "required"}>
                <span className={passwordErr ? "error-span" : ""}>
                  <b>PASSWORD</b> {passwordErr ? <i> - Required</i> : ""}
                </span>
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                  !e.target.value
                    ? setPasswordErr(true)
                    : setPasswordErr(false);
                }}
              />
            </div>

            <div className="form-input-field">
              <label
                className={yearErr || monthErr || dayErr ? "" : "required"}
              >
                <span
                  className={yearErr || monthErr || dayErr ? "error-span" : ""}
                >
                  <b>DATE OF BIRTH</b>{" "}
                  {yearErr || monthErr || dayErr ? <i> - Required</i> : ""}
                </span>
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
