import { Marker, Popup } from 'react-leaflet';
import { Icon } from './Icons/Icon';

import PlacePoup from './PlacePopup/PlacePopup';

function Markers(props: any) {
	const { data } = props;

	const markers = data.map((place: any) => {
		const { location } = place;

		return (
			<Marker
				key={place._id}
				position={[location.lat, location.lng]}
				icon={Icon}
			>
				<PlacePoup place={place} />
			</Marker>
		);
	});

	return markers;
}

export default Markers;
