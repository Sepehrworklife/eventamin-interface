import axios from "axios";

const urlAffix = "news/";
const Api = require("../constants/api.json");

export const createNews = async (payload) => {
	let config = { headers: Api.authHeader };
	let endpoint = Api.url + urlAffix;
	const res = await axios.post(endpoint, payload, config);
	return res;
};

export const updateNews = async (id, payload) => {
	let config = { headers: Api.authHeader, params: { id: id } };
	let endpoint = Api.url + urlAffix;
	const res = await axios.put(endpoint, payload, config);
	return res;
};

export const getNews = async (id) => {
	let config = { headers: Api.authHeader };
	let endpoint = Api.url + urlAffix + id;
	const res = await axios.get(endpoint, config);
	return res;
};

export const getMultiNews = async (limit = 20, skip = 0) => {
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

export const removeNews = async (id) => {
	let config = { headers: Api.authHeader };
	let endpoint = Api.url + urlAffix + id;
	const res = await axios.delete(endpoint, config);
	return res;
};
