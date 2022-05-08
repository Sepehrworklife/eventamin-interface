import axios from "axios";

const Api = require('../constants/api.json');
const urlAffix = "user/metadata/";
const config = { headers: Api.authHeader };

export const bulkCreate = async (payload) => {
	const res = await axios.post(Api.url+ urlAffix, payload, config);
	return res;
};


export const getUserMetadata = async (id) => {
	const endpoint = Api.url+ urlAffix;
	const config = {
		params: { user_id: id },
		headers: Api.authHeader
	}
	const res = await axios.get(endpoint, config);
	return res;
}


export const updateUserMetadata = async (payload) => {
	const endpoint = Api.url+ urlAffix;
	const res = await axios.put(endpoint, payload, config);
	return res;
}
