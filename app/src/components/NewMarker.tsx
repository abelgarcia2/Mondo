import { useState } from 'react';
import { Marker, Popup, useMapEvents } from 'react-leaflet';
import { NewPlaceIcon } from './Icons/NewPlaceIcon';
import NewPlacePopUp from './NewPlacePopup/NewPlacePopup';

function NewMarker() {
	const [selectedPosition, setSelectedPosition] = useState({ lat: 0, lng: 0 });
	useMapEvents({
		click: (e) => {
			setSelectedPosition({ lat: e.latlng.lat, lng: e.latlng.lng });
		},
	});
	return (
		<Marker position={selectedPosition} icon={NewPlaceIcon}>
			<NewPlacePopUp location={selectedPosition} />
		</Marker>
	);
}

export default NewMarker;
