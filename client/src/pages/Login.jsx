import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/users/auth`, {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }).then((resp) => resp.json());
      console.log(response);
      navigate("/channels/@me");
    } catch (error) {
      console.log("Error");
      setFormError(true);
    }
  };

  return (
    <div className="form-container">
      <div className="login-form-container">
        <div className="form-content">
          <div className="login-form-headers">
            <h2>Welcome back!</h2>
            <p>We're so excited to see you again!</p>
          </div>
          {formError && <p style={{ color: "red" }}>Wrong email or password</p>}
          <div className="login-form-fields">
            <div className="form-input-field identifier-login-field">
              <label className="required">
                <b>EMAIL OR PHONE NUMBER</b>
              </label>
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-input-field">
              <label className="required">
                <b>PASSWORD</b>
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <span>
              <Link>Forgot your password?</Link>
            </span>

            <button onClick={handleSubmit}>Log In</button>

            <span className="login-form-register-span">
              Need an account? <Link to="/register">Register</Link>
            </span>
          </div>
        </div>
        <div className="qr-container">
          <div className="qr-container-placeholder">QR code placeholder</div>
          <div className="qr-container-headers">
            <h2>Log in with QR Code</h2>
            <p>
              Scan this with the <b> Discord mobile app </b> to log in instantly
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
