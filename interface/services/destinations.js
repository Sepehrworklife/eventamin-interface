import axios from "axios";

const Api = require("../constants/api.json");
const urlAffix = "destination/";

export const fetchDestinationByUser = async (user_id) => {
	let config = { headers: Api.authHeader };
	let endpoint = Api.url + urlAffix + "user/" + user_id;
	const res = await axios.get(endpoint, config);
	return res;
};

export const createDestination = async (payload) => {
	let config = { headers: Api.authHeader };
	let endpoint = Api.url + urlAffix;
	const res = await axios.post(endpoint, payload, config);
	return res;
};

export const updateDestination = async (id, payload) => {
	let config = { headers: Api.authHeader, params: { id: id } };
	let endpoint = Api.url + urlAffix;
	const res = await axios.put(endpoint, payload, config);
	return res;
};

export const getDestination = async (id) => {
	let config = { headers: Api.authHeader };
	let endpoint = Api.url + urlAffix + id;
	const res = await axios.get(endpoint, config);
	return res;
};

export const removeDestination = async (id) => {
	let config = { headers: Api.authHeader };
	let endpoint = Api.url + urlAffix + id;
	const res = await axios.delete(endpoint, config);
	return res;
};

export const getMultiDestination = async (limit = 20, skip = 0) => {
	let config = {
		headers: Api.authHeader,
		params: {
			limit: limit,
			skip: skip,
		},
	};
	let endpoint = Api.url + urlAffix;
	const res = await axios.get(endpoint, config);
	return res;
};

export const  searchDestinations = async(country = null, city= null) => {
	let config = { headers: Api.authHeader, params: {
		country: country,
		city: city
	} };
	let endpoint = Api.url + urlAffix + 'search';
	const res = await axios.get(endpoint, config);
	return res;

}
