import { Link } from "react-router-dom";
export default function Login() {
  return (
    <div>
      <h1>this is login</h1>
      <h4>
        don't have an account?<Link to="register"> register </Link>
      </h4>
    </div>
  );
}
