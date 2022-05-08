import axios from "axios";
import FormData from 'form-data';

const Api = require('../constants/api.json');
const urlAffix = "user/";

export const base = async (method, payload = null, affix = null) => {
	let res;
	let config = { headers: Api.authHeader };
	let endpoint = Api.url+ urlAffix;

	if (method === "post") {
		res = axios.post(endpoint, payload, config);
	}
	else if(method === "get") {
		res = axios.get(endpoint + affix, config);
	}
	else if(method === "put") {
		res = axios.put(endpoint + affix, payload, config);
	}
	else if(method === "delete") {
		res = axios.delete(endpoint + affix, config);
	}
	return res;
};


export const login = async (username, password) => {
	let endpoint = Api.url+ 'auth/token';
	let config = {headers: Api.urlEncodedHeader};
	const data = new FormData();
	data.append('username', username);
	data.append('password', password);

	const res = axios.post(endpoint, data, config);
	return res;
}


export const fetchUser = async (id) => {
	let endpoint = Api.url+ urlAffix + id;
	let config = {headers: Api.authHeader};
	const res = axios.get(endpoint, config);
	return res;
}

export const activateUser = async (user, userId, code) => {
	let endpoint = Api.url+ "otp/";
	let config = {headers: Api.authHeader, params:{
		code: code,
		user: user,
		user_id: userId
	}};
	const res = axios.get(endpoint, config);
	return res;
}


/** 
 * Search through users table
 * Payload parameters should be: company, city, country, company_fa
 * @param {object} payload
 * @return {array}
 */
export const searchUser = async(payload) => {
	let endpoint = Api.url + urlAffix + 'search';
	let config = {headers: Api.authHeader, params: payload};
	const res = await axios.get(endpoint, config);
	return res;
	
}
