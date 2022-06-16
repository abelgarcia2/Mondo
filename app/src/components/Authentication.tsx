import { useState } from 'react';
import Login from './Login/Login';
import Register from './Register';
function Authentication({updateState}:any) {
	const [renderRegister, setRenderRegister] = useState(false);

	return (
		<>
			{renderRegister ? (
				<>
					<Register updateState={updateState}/>
                    <p>
						if you already registered, please
						<a onClick={() => setRenderRegister(false)}> sign in</a>
					</p>
				</>
			) : (
				<>
					<Login updateState={updateState}/>
					<p>
						if you are not, please
						<a onClick={() => setRenderRegister(true)}> sign up</a>
					</p>
				</>
			)}
		</>
	);
}

export default Authentication;
