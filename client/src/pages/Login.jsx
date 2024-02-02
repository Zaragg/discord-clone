import { Link } from "react-router-dom";
import { useState } from "react";

export default function Login() {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`identifier: ${identifier}, password: ${password}`);
  };

  return (
    <div className="form-container">
      <div className="login-form-container">
        <div className="form-content">
          <div className="login-form-headers">
            <h2>Welcome back!</h2>
            <p>We're so excited to see you again!</p>
          </div>

          <div className="login-form-fields">
            <div className="form-input-field identifier-login-field">
              <label className="required">
                <b>EMAIL OR PHONE NUMBER</b>
              </label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
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

            <span><Link>Forgot your password?</Link></span>

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
