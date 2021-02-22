import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";

const RegistrationPage = (props) => (
	<div className='editImage'>
		<div className='loginDiv'>
			<h1>Are you sure that you want to delete your account?</h1>
			<h3>This action is irreversible</h3>
			
			<button
				id='deleteButton'
				onClick={() => {
					const cookies = new Cookies();

					axios.post('http://localhost:3000/delete', {
						token: cookies.get('token')
					}).then(() => {
						cookies.remove('token');
						props.history.push('/');
					}).catch((e) => console.log(e));
				}}
			>Delete your account</button>
			<br />

			<Link to="/edit" className='backArrow'>{'◄ Back'}</Link>
		</div>
	</div>
);

export default RegistrationPage;


/*
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
			console.log(e)
		})
	}}
/>
*/