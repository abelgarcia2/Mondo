import { useEffect, useState } from 'react';
import { getRandomPlace } from '../../services/RestService';
import SimpleImageSlider from 'react-simple-image-slider';
import './Search.css';

function Search() {
	const [place, setPlace] = useState();

	useEffect(() => {
		const getPlace = async () => {
			setPlace(await getRandomPlace());
		};

		getPlace();
	}, []);

	return (
		<>
			{/* <h1>{place.title}</h1>
			<h2>{place.subtitle}</h2>
			<p>{place.description}</p>
			<img src={place.images[0]} /> */}
		</>
	);
}

export default Search;
