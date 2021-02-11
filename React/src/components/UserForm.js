import React from "react";
import isEmail from 'validator/lib/isEmail'

export default class UserForm extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			name: "asd",
			surname: "",
			age: "",
			email: "asd@asd.asd",
			password: "asdasdasd",
			confirmPassword: "asdasdasd",
			nameError: "",
			emailError: "",
			passwordError: "",
			confirmPasswordError: ""
		}
	}
	onNameChange = (e) => {
		const name = e.target.value
		this.setState(() => ({ name }))
	}
	onSurnameChange = (e) => {
		const surname = e.target.value
		this.setState(() => ({ surname }))
	}
	onAgeChange = (e) => {
		let age = e.target.value
		if(age.match(/^\d*$/) && age < 150) {
			this.setState(() => ({ age }))
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
	onConfirmPasswordChange = (e) => {
		const confirmPassword = e.target.value
		this.setState(() => ({ confirmPassword }))
	}
	onFormSubmit = (e) => {
		e.preventDefault()

		let passwordHasError = false
		let error = false

		this.setState(() => ({
			nameError: "",
			emailError: "",
			passwordError: "",
			confirmPasswordError: ""
		}))

		const { name, surname, age, email, password, confirmPassword } = this.state

		if(!name) {
			error = true
			this.setState(() => ({ nameError: "Please write your name" }))
		}
		if(!email) {
			error = true
			this.setState(() => ({ emailError: "Please write your email address" }))
		} else if(!isEmail(email)) {
			error = true
			this.setState(() => ({ emailError: "Wrong email address format!" }))
		}
		if(!password) {
			error = true
			passwordHasError = true
			this.setState(() => ({ passwordError: "Please write your password" }))
		} else if(password.length < 8) {
			error = true
			passwordHasError = true
			this.setState(() => ({ passwordError: "Password length should be at least 8" }))
		}
		if(!confirmPassword && !passwordHasError) {
			error = true
			this.setState(() => ({ confirmPasswordError: "Please confirm your password" }))
		} else if(confirmPassword !== password && !passwordHasError) {
			error = true
			this.setState(() => ({ confirmPasswordError: "Passwords don't match!" }))
		}

		if(!error) {
			this.props.onSubmit({
				name,
				surname,
				age,
				email,
				password
			})
		}
	}
	render() {
		return (
			<div>
				{this.state.nameError && <p className='error'>{this.state.nameError}</p>}
				{this.state.emailError && <p className='error'>{this.state.emailError}</p>}
				{this.state.passwordError && <p className='error'>{this.state.passwordError}</p>}
				{this.state.confirmPasswordError && <p className='error'>{this.state.confirmPasswordError}</p>}
				<form onSubmit={this.onFormSubmit}>
					<input
						type='text'
						placeholder='name'
						value={this.state.name}
						onChange={this.onNameChange}
						autoFocus
					/>
					<input
						type='text'
						placeholder='surname'
						value={this.state.surname}
						onChange={this.onSurnameChange}
					/>
					<input
						type='text'
						placeholder='age'
						value={this.state.age}
						onChange={this.onAgeChange}
					/>
					<input
						type='email'
						placeholder='email'
						value={this.state.email}
						onChange={this.onEmailChange}
					/>
					<input
						type='password'
						placeholder='password'
						value={this.state.password}
						onChange={this.onPasswordChange}
					/>
					<input
						type='password'
						placeholder='confirm password'
						value={this.state.confirmPassword}
						onChange={this.onConfirmPasswordChange}
					/>
					<br />
					<button>Register</button>
				</form>
			</div>
		)
	}
}
