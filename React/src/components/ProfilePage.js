import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

export default class ProfilePage extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			name: "",
			surname: "",
			age: "",
			email: ""
		}
	}

	userData = {
		name: '',
		surname: '',
		age: 0,
		email: ''
	}

	getUserInfo = () => {
		axios.post('http://localhost:3000/profile', {
			token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDI1N2QzM2U4ZTZmYjBhZGM0YTNiMDAiLCJpYXQiOjE2MTMwNzA1NzN9.61vNIbz5qObWTJwjOGjtUH_FjV2NqWwPQLcti-XwXxw'
		}).then((res) => {
			this.userData.name = res.data.name
			this.userData.surname = res.data.surname
			this.userData.age = res.data.age
			this.userData.email = res.data.email
			console.log(this.userData)
		}).catch((e) => console.log(e))
	}

	render() {
		this.getUserInfo(() => {console.log(3)})
		return (
			<div>
				<h1>Welcome to your profile!</h1>
				{console.log(this.userData)}
				<Link to="/edit">Edit account</Link> <br />
				<Link to="/logout">Log out</Link>
			</div>
		)
	}
};
