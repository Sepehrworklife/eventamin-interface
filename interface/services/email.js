import axios from "axios";

const urlAffix = "email/";
const Api = require("../constants/api.json");

export const sendSingleEmail = async (email, subject, body) => {
  let params = {
    email: email,
    subject: subject,
    body: body,
  };
  let config = { headers: Api.authHeader, params: params };
  let endpoint = Api.url + urlAffix + "single";
  const response = await axios.post(endpoint, null, config);
  return response;
};
