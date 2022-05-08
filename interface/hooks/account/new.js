import { base } from "../../services/users";

export const contactInformationRequest = async (payload, id) => {
	base("put", payload, id)
		.then((result) => console.log(result))
		.catch((error) => console.log(error));
};
