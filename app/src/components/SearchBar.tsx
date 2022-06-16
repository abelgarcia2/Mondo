import { useState } from 'react';
import { getPlacesSuggestion } from '../services/RestService';
import AutocompleteResults from './AutocompleteResults';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function SearchBar() {
	const [foundPlaces, setFoundPlaces] = useState<any>([]);

	const handleType = (e: any) => {
		const typedPlace: string = e.target.value;

		const asyncGetPlaces = async () =>
			setFoundPlaces(await getPlacesSuggestion(typedPlace));

		asyncGetPlaces();
	};

	return (
		<div className='search-bar-autocomplete'>
			<div className='search-bar-container'>
				<FontAwesomeIcon icon={faSearch} className='search-icon' />
				<input
					className='search-bar'
					type='text'
					placeholder='Introduce una ciudad, un pais, un lugar'
					onChange={handleType}
				/>
			</div>

			{foundPlaces.length > 0 && <AutocompleteResults data={foundPlaces} />}
		</div>
	);
}

export default SearchBar;
