import { useState } from 'react';
import { sendLogin } from '../../services/RestService';
import './Login.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login({ updateState }: any) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e: any) => {
		e.preventDefault();

		if (email != '' && password != '') {
			const res = await sendLogin(email, password);

			const jwt = res.token;
			if (jwt !== undefined) {
				sessionStorage.setItem('jwt', jwt);
				updateState(true);
			} else {
				toast.error(res.message, { position: 'top-right' });
			}
		}
	};

	return (
		<div className='container'>
			<ToastContainer />
			<form onSubmit={handleSubmit} className='form'>
				<label htmlFor='email'>Email</label>
				<input type='text' onChange={(e) => setEmail(e.target.value)} />
				<label htmlFor='password'>Password</label>
				<input type='password' onChange={(e) => setPassword(e.target.value)} />
				<button className='btn'>Login</button>
			</form>
		</div>
	);
}

export default Login;
