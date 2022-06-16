const baseUrl = 'https://fuscia-debt-production.up.railway.app';
const baseGeoCodeUrl = 'https://geocode.maps.co/search?q=';

export async function getPlacesSuggestion(place: string): Promise<[{}]> {
	const suggestedPlaces: [{}] = [{}];

	const res: Response = await fetch(baseGeoCodeUrl + place);
	const suggestions: [{}] = await res.json();

	suggestions.forEach((suggestion: any) => {
		suggestedPlaces.push({
			id: suggestion.place_id,
			name: suggestion.display_name,
			location: { lat: suggestion.lat, lng: suggestion.lon },
		});
	});

	suggestedPlaces.shift();
	return suggestedPlaces;
}

export async function getPlaces(): Promise<[{}]> {
	let allPlaces: [{}] = [{}];

	const res: Response = await fetch(`${baseUrl}/places`);
	allPlaces = await res.json();

	return allPlaces;
}

export async function sendLogin(email: string, password: string) {
	const req = await fetch(`${baseUrl}/users/login`, {
		method: 'POST',
		headers: {
			'Accept': '*/*',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			email: email,
			password: password,
		}),
	});

	const res = await req.json();

	return res;
}

export async function sendRegister(
	user: string,
	email: string,
	password: string
) {
	const req = await fetch(`${baseUrl}/users/register`, {
		method: 'POST',
		headers: {
			Accept: '*/*',
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			username: user,
			email: email,
			password: password,
		}),
	});

	const res = await req.json();

	return res;
}

export async function getRandomPlace() {
	const req = await fetch(`${baseUrl}/places/random`);
	const res = await req.json();

	return res;
}

export async function sendPlace(place: any, jwt: string) {
	const headers = new Headers();
	headers.append('Content-Type', 'application/json');
	headers.append('jwt', jwt);

	const res = await fetch(`${baseUrl}/places/new`, {
		method: 'POST',
		headers: headers,
		body: JSON.stringify(place),
	});

	const resJson = await res.json();

	return { message: resJson.message, status: res.status };
}
