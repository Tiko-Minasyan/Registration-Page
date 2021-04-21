import React from "react";
import UserForm from "../components/UserForm";
import axios from "axios";
import Cookies from "universal-cookie";
import setupAxios from '../axios/setup';

export default class RegistrationPage extends React.Component {
	constructor(props) {
		super(props)
	}
	componentDidMount() {
		const cookies = new Cookies();
		if(!!cookies.get('token')) this.props.history.push('/profile');
	}

	render() {
		return (
			<div className='containerDiv'>
				<div className='loginDiv'>
					<h1>Register to create a new account</h1>
					
					<UserForm
						history={this.props.history}
						onSubmit={(data) => {
							document.getElementById('emailError').innerHTML = ''
							axios.post('http://localhost:3000/register', data)
							.then((res) => {
								if(res.status == 201) {
									const cookies = new Cookies();
									cookies.set('token', res.data);
									setupAxios();
									this.props.history.push("/profile")
								}
							}).catch((e) => {
								console.log(e.response.data)
								if(e.response.data.code && e.response.data.code == 11000) {
									document.getElementById('emailError').innerHTML = 'This email address is already registered'
								}
							})
						}}
					/>
				</div>
			</div>
		)
	}
};
