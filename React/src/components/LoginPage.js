import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import isEmail from 'validator/lib/isEmail'

export default class LoginPage extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			email: "asd@asd.asd",
			password: "asdasdasd",
			emailError: "",
			passwordError: ""
		}
	}

	onEmailChange = (e) => {
		const email = e.target.value
		this.setState(() => ({ email }))
	}
	onPasswordChange = (e) => {
		const password = e.target.value
		this.setState(() => ({ password }))
	}
	onFormSubmit = (e) => {
		e.preventDefault()

		let error = false;

		this.setState(() => ({
			emailError: "",
			passwordError: ""
		}))

		const { email, password } = this.state;
		
		if(!email) {
			error = true;
			this.setState(() => ({ emailError: "Please write your email address" }))
		} else if(!isEmail(email)) {
			error = true;
			this.setState(() => ({ emailError: "Wrong email address format!" }))
		}

		if(!password) {
			error = true;
			this.setState(() => ({ passwordError: "Please write your password" }))
		} else if(password.length < 8) {
			error = true;
			this.setState(() => ({ passwordError: "Password is too short!" }))
		}

		if(!error) {
			// document.getElementById('loginButton').setAttribute('disabled', true)

			axios.post('http://localhost:3000/login', {
				email,
				password
			}).then((res) => {
				console.log(res)
			}).catch((e) => console.log(e))
		}
	}
	
	render() {
		return (
			<div className='loginDiv'>
				<h1>Log in to your account</h1>
				<p>Write your email and password to log in, or create a new account <Link to="/register">here</Link></p>
				{this.state.emailError && <p className='error'>{this.state.emailError}</p>}
				{this.state.passwordError && <p className='error'>{this.state.passwordError}</p>}
				<form onSubmit={this.onFormSubmit}>
					<input
						type="email"
						placeholder="Email"
						value={this.state.email}
						onChange={this.onEmailChange}
					/>
					<input
						type="password"
						placeholder="Password"
						value={this.state.password}
						onChange={this.onPasswordChange}
					/> <br />
					<button id='loginButton'>Log in</button>
				</form>
			</div>
		)
	}
};
