import { Popup } from 'react-leaflet';
import './PlacePopup.css'

function PlacePoup({ place }: any) {
	return (
		<Popup>
			<div className='container'>
				<h1 className='title'>{place.title}</h1>
				<div>{place.subtitle}</div>
				{place.images.length > 0 && (
					<img src={place.images[0]} width='100px' height='100px' />
				)}
				<a
					href={`http://google.com/maps/place/${place.location.lat},${place.location.lng}`}
					target='_blank'
				>
					<button className='btn-go'>Go</button>
				</a>
			</div>
		</Popup>
	);
}

export default PlacePoup;
