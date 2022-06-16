import { MapContainer, Marker, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Markers from '../components/Markers';
import parkings from '../assets/allParkings.json';
import { useEffect, useState } from 'react';

import { getPlaces } from '../services/RestService';
import SearchBar from '../components/SearchBar';
import NewMarker from '../components/NewMarker';

import L, { LeafletMouseEvent, Map } from 'leaflet';

function MapPage() {
	const [currentPosition, setCurrentPosition] = useState({ lat: 0, long: 0 });
	const [places, setPlaces] = useState<any>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const asyncGetPlaces = async () => {
			setPlaces(await getPlaces());
		};

		navigator.geolocation.getCurrentPosition(
			(pos) => {
				const { coords } = pos;

				setCurrentPosition({ lat: coords.latitude, long: coords.longitude });
			},
			null,
			{ enableHighAccuracy: true }
		);
		asyncGetPlaces();
	}, []);

	// useEffect(() => {
	// 	window.addEventListener('beforeunloadddddd', () => {
	// 		console.log('borrar');

	// 		localStorage.removeItem('jwt');
	// 	});
	// });

	console.log(currentPosition);

	if (currentPosition.lat === 0) return null;

	return (
		<div className='map-container'>
			<MapContainer
				center={[currentPosition.lat, currentPosition.long]}
				zoom={14}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
				/>
				<NewMarker />
				<Markers data={places} />
			</MapContainer>
		</div>
	);
}

export default MapPage;
