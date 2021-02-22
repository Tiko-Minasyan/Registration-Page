import React from "react";
import { Link } from "react-router-dom";
import UserForm from "../components/UserForm";
import axios from "axios";
import Cookies from "universal-cookie";

const RegistrationPage = (props) => (
	<div className='editImage'>
		<div className='loginDiv'>
		<h1>Edit your information</h1>
		
		<UserForm
			editing={true}
			history={props.history}
			onSubmit={(data) => {
				const cookies = new Cookies()
				axios.patch('http://localhost:3000/edit', {
					...data,
					token: cookies.get('token')
				})
				.then((res) => {
					if(res.status == 200) {
						props.history.push("/profile")
					}
				}).catch((e) => {
					console.log(e.response.data)
				})
			}}
		/>

		<Link className='deleteButton' to="/delete">Delete account</Link>
	</div>
  </div>
);

export default RegistrationPage;
