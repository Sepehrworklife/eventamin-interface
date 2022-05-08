import axios from "axios";

const urlAffix = "product/";
const Api = require('../constants/api.json');

export const getProductWithUserID = async (user_id) => {
	let config = { headers: Api.authHeader };
	let endpoint = Api.url+ urlAffix + "user/" + user_id;
	const res = await axios.get(endpoint, config);
	return res;
};

export const createProduct = async (payload) => {
	let config = { headers: Api.authHeader };
	let endpoint = Api.url+ urlAffix;
	const res = await axios.post(endpoint, payload, config);
	return res;
};

export const updateProduct = async (id, payload) => {
	let config = { headers: Api.authHeader, params: { id: id } };
	let endpoint = Api.url+ urlAffix;
	const res = await axios.put(endpoint, payload, config);
	return res;
};


export const getProduct = async (id) => {
	let config = {headers:Api.authHeader};
	let endpoint = Api.url+ urlAffix + id;
	const res = await axios.get(endpoint, config);
	return res;
}

export const getMultiProducts = async (limit= 20, skip= 0) => {
	let config = {headers:Api.authHeader, params:{
		limit: limit,
		skip: skip
	}};
	let endpoint = Api.url+ urlAffix ;
	const res = await axios.get(endpoint, config);
	return res;
}

export const filterProducts = async (country= '', keywords = '',limit= 20, skip= 0) => {
	let config = {headers:Api.authHeader, params:{
		country: country,
		keywords: keywords,
		limit: limit,
		skip: skip
	}};
	let endpoint = Api.url+ urlAffix+ 'search' ;
	const res = await axios.get(endpoint, config);
	return res;
}


export const removeProduct = async (id) => {
	let config = {headers: Api.authHeader};
	let endpoint = Api.url+ urlAffix + id;
	const res = await axios.delete(endpoint, config);
	return res;
}

