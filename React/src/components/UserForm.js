import axios from "axios";
import React from "react";
import isEmail from "validator/lib/isEmail";
import Cookies from "universal-cookie"

export default class UserForm extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			name: "",
			surname: "",
			age: "",
			email: "",
			password: "",
			confirmPassword: "",
			oldPassword: "",
			nameError: "",
			emailError: "",
			passwordError: "",
			confirmPasswordError: "",
			button: "Register",
			editing: this.props.editing
		}
	}
	componentDidMount() {
		const cookies = new Cookies();
		const token = cookies.get('token')
		if(!!token) {
			axios.post("http://localhost:3000/profile", {
				token
			}).then((res) => {
				this.setState(() => ({
					name: res.data.name,
					surname: res.data.surname,
					age: res.data.age,
					email: res.data.email,
					button: 'Edit info',
					editing: true
				}))
			})
		} else if(this.state.editing) {
			console.log('Please log in')
			this.props.history.push('/');
		}
	}
	backButton = () => {
		this.props.history.push('/');
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
	onOldPasswordChange = (e) => {
		const oldPassword = e.target.value
		this.setState(() => ({ oldPassword }))
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

		let { name, surname, age, email, password, confirmPassword, editing, oldPassword } = this.state

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
		if(!editing && !password) {
			error = true
			passwordHasError = true
			this.setState(() => ({ passwordError: "Please write your password" }))
		} else if(password.length < 8 && (password.length > 0 || !editing)) {
			error = true
			passwordHasError = true
			this.setState(() => ({ passwordError: "Password length should be at least 8" }))
		}
		if(!confirmPassword && !passwordHasError && (password.length > 0 || !editing)) {
			error = true
			this.setState(() => ({ confirmPasswordError: "Please confirm your password" }))
		} else if(confirmPassword !== password && !passwordHasError) {
			error = true
			this.setState(() => ({ confirmPasswordError: "Passwords don't match!" }))
		}
		if(editing && !oldPassword && !passwordHasError && password.length > 0) {
			error = true
			this.setState(() => ({ passwordError: "Please fill in your old password" }))
		}

		if(!age) {
			age = 0;
		}

		if(!error) {
			if(!editing) {
				this.props.onSubmit({
					name,
					surname,
					age,
					email,
					password
				})
			} else {
				this.props.onSubmit({
					name,
					surname,
					age,
					email,
					password,
					oldPassword
				})
			}
		}
	}
	render() {
		return (
			<div>
				{this.state.nameError && <p className='error'>{this.state.nameError}</p>}
				{this.state.emailError && <p className='error'>{this.state.emailError}</p>}
				{this.state.passwordError && <p className='error'>{this.state.passwordError}</p>}
				{this.state.confirmPasswordError && <p className='error'>{this.state.confirmPasswordError}</p>}
				<p id='emailError'></p>
				<form onSubmit={this.onFormSubmit}>
					<input
						type='text'
						placeholder='Name'
						value={this.state.name}
						onChange={this.onNameChange}
						autoFocus
					/>
					<input
						type='text'
						placeholder='Surname'
						value={this.state.surname}
						onChange={this.onSurnameChange}
					/>
					<input
						type='text'
						placeholder='Age'
						value={this.state.age}
						onChange={this.onAgeChange}
					/>
					<input
						type='email'
						placeholder='Email'
						value={this.state.email}
						onChange={this.onEmailChange}
					/>
					{this.state.editing &&
					<input
						type='Password'
						placeholder='Old password (for updating password)'
						value={this.state.oldPassword}
						onChange={this.onOldPasswordChange}	
					/>}
					<input
						type='password'
						placeholder='Password'
						value={this.state.password}
						onChange={this.onPasswordChange}
					/>
					<input
						type='password'
						placeholder='Confirm password'
						value={this.state.confirmPassword}
						onChange={this.onConfirmPasswordChange}
					/>
					<br />
					<p className='backArrow' onClick={this.backButton}>{'◄ Back'}</p>
					<button id='signUpButton'>{this.state.button}</button>
				</form>
			</div>
		)
	}
}
