import axios from 'axios';
const API = require("../constants/api.json");


const urlAffix= 'exhibition/';


export const create  = async(data) => {
	let config = { headers: API.authHeader }
	let endpoint = API.url + urlAffix;
	const response = await axios.post(endpoint, data, config);
	return response;
}


export const update = async(id, data) => {
	let config = { headers: API.authHeader, params: { id:id } }
	let endpoint = API.url + urlAffix;
	const response = await axios.put(endpoint, data, config)
	return response
}


export const getMulti = async (limit=20, skip=0) => {
	let config = { headers: API.authHeader, params: { skip: skip, limit: limit } }
	let endpoint = API.url + urlAffix;
	const response = await axios.get(endpoint, config);
	return response;
}


export const get = async (id) => {
	let config = { headers: API.authHeader }
	let endpoint = API.url + urlAffix + id;
	const response = await axios.get(endpoint, config);
	return response;
}

export const remove = async (id) => {
	let config = { headers: API.authHeader }
	let endpoint = API.url + urlAffix + id;
	const response = await axios.delete(endpoint, config);
	return response;
}
