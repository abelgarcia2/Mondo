export interface Props {
	data: [];
}

function AutocompleteResults(props: Props) {
	return (
		<ul className="autocomplete-list">
			{props.data.map((element: any) => (
				<li className="autocomplete-item" key={element.id}>{element.name}</li>
			))}
		</ul>
	);
}

export default AutocompleteResults;
