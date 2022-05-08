import axios from "axios";

const urlAffix = "message/";
const Api = require('../constants/api.json');

export const getMessageWithReceiverID = async (user_id) => {
	let config = { headers: Api.authHeader };
	let endpoint = Api.url+ urlAffix + "receiver/" + user_id;
	const res = await axios.get(endpoint, config);
	return res;
};

export const createMessage = async (payload) => {
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


export const getMessage = async (id) => {
	let config = {headers:Api.authHeader};
	let endpoint = Api.url+ urlAffix + id;
	const res = await axios.get(endpoint, config);
	return res;
}


export const removeProduct = async (id) => {
	let config = {headers: Api.authHeader};
	let endpoint = Api.url+ urlAffix + id;
	const res = await axios.delete(endpoint, config);
	return res;
}
