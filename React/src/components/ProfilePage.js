import axios from "axios";
import React from "react";
import Cookies from 'universal-cookie';
import Header from './Header';

export default class ProfilePage extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			name: "",
			surname: "",
			age: "",
			email: "",
			verified: false,
			rendered: false
		}
	}

	componentDidMount() {
		const cookies = new Cookies();
		axios.get('http://localhost:3000/profile')
		.then((res) => {
			this.setState(() => ({
				name: res.data.name,
				surname: res.data.surname,
				age: res.data.age,
				email: res.data.email,
				verified: res.data.verified,
				rendered: true
			}))

			document.getElementById('logoutItem').onclick = this.logout;
		}).catch(() => {
			console.log('Please log in');
			cookies.remove('token');
			this.props.history.push('/');
		})
	}

	logout = () => {
		const cookies = new Cookies();
		axios.get('http://localhost:3000/logout')
		.then(() => {
			cookies.remove('token');
			this.props.history.push('/');
		}).catch((e) => console.log(e))
	}

	editAccount = () => {
		this.props.history.push('/edit');
	}

	onDropdownClick = () => {
		const element = document.getElementById('dropdown');
		if(!element.classList.contains('upArrow')) {
			element.classList.add('upArrow');
			document.getElementById('dropdownBox').classList.remove('invisible')
		}
		else {
			element.classList.remove('upArrow');
			document.getElementById('dropdownBox').classList.add('invisible')
		}
	}

	sendVerificationEmail = () => {
		axios.get('http://localhost:3000/sendVerify')
		.then(() => {
			document.getElementById('verifyEmail').innerHTML = ' Verification email has been resent!';
		}).catch((e) => e.response && console.log(e.response.data))
	}

	render() {
		if(!this.state.rendered) {
			return (
				<div className='profileContainer'></div>
			)
		}
		else {
			return (
				<div className='profileContainer'>
					<Header />
					{!this.state.verified &&
						(<div className='verificationMessage'><br /><b>Your email address is not verified!</b>
							<span id='verifyEmail'> Click <i className='verifyLink' onClick={this.sendVerificationEmail}>here</i> to resend verification email.</span></div>)}
					<div className='userData'>
						<h1>Your profile</h1>
						<div className='imageContainer'></div>
						<div className='userInfo'>
							<span className='credentials'>Name: </span>
							<span className='userName'>{this.state.name}</span> <hr className='newRow'/>
							<span className='credentials'>Surame: </span>
							<span className='userSurname'>{this.state.surname}</span> <hr className='newRow'/>
							<span className='credentials'>Age: </span>
							<span className='userAge'>{this.state.age}</span> <hr className='newRow'/>
							<span className='credentials'>Email: </span>
							<span className='userEmail'>{this.state.email}</span> <hr className='newRow'/>
						</div>
					</div>
				</div>
			)
		}
	}
};
