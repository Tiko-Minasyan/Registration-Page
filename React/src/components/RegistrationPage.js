import React from "react";
import { Link } from "react-router-dom";
import UserForm from "../components/UserForm"
import axios from "axios"

const RegistrationPage = (props) => (
	<div className='loginDiv'>
    <h1>Register to create a new account</h1>
	<p>Fill in the info to create a new account, or log in to your existing one <Link to="/">here</Link></p>
	
	<UserForm
		onSubmit={(data) => {
			axios.post('http://localhost:3000/register', data)
			.then((res) => {
				if(res.status == 201) {
					props.history.push("/")
				}
			}).catch((e) => {
				console.log(e)
			})

			console.log(data)
		}}
	/>
  </div>
);

export default RegistrationPage;
