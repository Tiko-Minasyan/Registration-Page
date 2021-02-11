import React from "react";
import { Link } from "react-router-dom";

const LoginPage = () => (
  <div className='loginDiv'>
    <h1>Log in to your account</h1>
	<p>Write your email and password to log in, or create a new account <Link to="/register">here</Link></p>
	<input placeholder='email' />
	<input placeholder='password' /> <br />
	<button>Log in</button>
  </div>
);

export default LoginPage;
