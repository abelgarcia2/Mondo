import { useState } from 'react';
import { sendRegister } from '../services/RestService';

function Register({ updateState }: any) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordCheck, setPasswordCheck] = useState('');
	const [username, setUsername] = useState('');

	const checkPasswords = () => {
		if (password === passwordCheck) return true;
		return false;
	};

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		let res;

		if (checkPasswords()) res = await sendRegister(username, email, password);

		if (res.token !== undefined) {
			localStorage.setItem('jwt', res.token);
			updateState(true);
		}
	};

	return (
		<div className='container'>
			<form onSubmit={handleSubmit} className='form'>
				<label htmlFor='user'>User</label>
				<input type='text' onChange={(e) => setUsername(e.target.value)} />
				<label htmlFor='email'>Email</label>
				<input type='text' onChange={(e) => setEmail(e.target.value)} />
				<label htmlFor='password'>Password</label>
				<input type='password' onChange={(e) => setPassword(e.target.value)} />
				<label htmlFor='checkpassword'>Repeat password</label>
				<input
					type='password'
					onChange={(e) => setPasswordCheck(e.target.value)}
				/>
				<button className='btn'>Register</button>
			</form>
		</div>
	);
}

export default Register;
