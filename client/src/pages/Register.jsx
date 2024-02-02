import { Link } from "react-router-dom"
export default function Register() {
  return (
    <div>
      <h1>this is register</h1>
      <h4>already have an account? <Link to='/login'>Login</Link></h4>
    </div>
  )
}