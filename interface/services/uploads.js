import axios from 'axios';
import FormData from 'form-data';

const urlAffix = "uploads/"
const Api = require('../constants/api.json');

export const upload = async(file) => {
	const config = {headers: Api.multipartFormDataHeader};
	const endpoint = Api.url + urlAffix;
	var bodyFormData = new FormData();
	bodyFormData.append('in_file', file);
	const res = await axios.post(endpoint,bodyFormData,config);
	return res;
}


export const fetch = () => {

}
