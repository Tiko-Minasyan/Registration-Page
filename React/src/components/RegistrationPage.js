import React from "react";
import { Link } from "react-router-dom";
import UserForm from "../components/UserForm";
import axios from "axios";
import Cookies from "universal-cookie";

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
			<div className='container'>
				<div className='loginDiv'>
					<h1>Register to create a new account</h1>
					
					<UserForm
						history={this.props.history}
						onSubmit={(data) => {
							axios.post('http://localhost:3000/register', data)
							.then((res) => {
								if(res.status == 201) {
									const cookies = new Cookies();
									cookies.set('token', res.data);
									this.props.history.push("/profile")
								}
							}).catch((e) => {
								console.log(e.response.data)
							})
						}}
					/>
				</div>
			</div>
		)
	}
};
