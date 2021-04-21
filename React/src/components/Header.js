import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => (
	<Navbar expand='lg' className='nav'>
		<Navbar.Collapse id='navbar-nav'>
			<Nav className='ml-auto'>
				<Nav.Item>
					<Link className='link mr-3' to='/'>Profile</Link>
				</Nav.Item>
				<Nav.Item>
					<Link className='link mr-3' to='/edit'>Edit</Link>
				</Nav.Item>
				<Nav.Item id='logoutItem' className='link mr-3'>Log out</Nav.Item>
			</Nav>
		</Navbar.Collapse>
	</Navbar>
);

export default Header;
