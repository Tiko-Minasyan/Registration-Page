import axios from 'axios';
import Cookies from 'universal-cookie';

const setup = () => {
	const cookies = new Cookies();
	axios.defaults.headers.common['token'] = cookies.get('token');
}

export default setup;
