import { useEffect, useState } from 'react';
import { Popup } from 'react-leaflet';
import './NewPlacePopup.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Authentication from '../Authentication';
import { sendPlace } from '../../services/RestService';

function NewPlacePopUp(props) {
	const [message, setMessage] = useState();
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	useEffect(() => {
		setIsLoggedIn(false);
		if (localStorage.getItem('jwt') !== null) setIsLoggedIn(true);
	}, []);

	const location = props.location;

	const handleSubmit = async (e) => {
		e.preventDefault();
		const { title, subtitle, description, labels, images } = e.target.elements;

		const data = {
			title: title.value,
			subtitle: subtitle.value,
			description: description.value,
			labels: labels.value,
			location: location,
		};

		const { message, status } = await sendPlace(
			data,
			localStorage.getItem('jwt')
		);

		console.log({ message, status });
		// if (jsonRes === 'You must be logged in')
		status != 201 ? toast.error(message) : toast.success(message);
	};

	const form = (
		<form onSubmit={handleSubmit}>
			<label htmlFor='title'>Title *</label>

			<input type='text' id='title' />

			<label htmlFor='subtitle'>Subtitle *</label>

			<input type='text' id='subtitle' />

			<label htmlFor='description'>Description</label>

			<textarea id='description'></textarea>

			<label htmlFor='labels'>Labels * (3-10)</label>

			<input type='text' id='labels' />

			<label htmlFor='images'>Images</label>

			<input
				disabled
				type='file'
				accept='image/png, image/jpeg'
				multiple
				capture='user'
				id='images'
			/>

			<button>Save Place</button>
		</form>
	);

	return (
		<>
			{isLoggedIn ? (
				<>
					<ToastContainer />
					<Popup>{form}</Popup>
				</>
			) : (
				<Popup>
					<Authentication updateState={setIsLoggedIn} />
				</Popup>
			)}
		</>
	);
}

export default NewPlacePopUp;
