import { Link } from "react-router-dom";
import { useState } from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import "./Login.css";
import useLogin from "../../../hooks/useLogin";

const Login = () => {
  const [inputs, setInputs] = useState({
    email: '',
    password: ''
  });

  const { loading, login } = useLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(inputs);
  }

  return (
    <div className="container signup">
      <div className="container signupHeader">
        <img src="logo.jpg" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="form">
          <h3 className="container">Login</h3>
          <label><MdEmail /> Email</label>
          <input type="email" placeholder="Enter Email"
            value={inputs.email}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })} />
          <label><RiLockPasswordFill /> Password</label>
          <input type="password" placeholder="Enter Password"
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })} />
          <button className="btn loginBtn" disabled={loading}>Login</button>
          <Link className="link signupLink" to="/signup">Do not have an account? Signup</Link>
        </div>
      </form>
    </div>
  )
}

export default Login;