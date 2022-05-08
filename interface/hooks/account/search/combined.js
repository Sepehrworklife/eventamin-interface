import { searchUser } from "../../../services/users";
import { getUserMetadata } from "../../../services/usersMetadata";

export async function fetchUserMetaData(user_ids = []) {
	let metadata = [];
	for await (const id of user_ids) {
		await getUserMetadata(id)
			.then((response) => metadata.push(response.data))
			.catch((error) => {
				throw new Error(error);
			});
	}
	return metadata;
}

export async function renderMetadataAsOneObject(list = []) {
	let computedMetadata = [];
	for await (let metadata of list) {
		let instanceObject = {};
		metadata.map(
			(metadatum, index) =>
				(instanceObject[metadatum["meta_key"]] = metadatum["meta_value"])
		);
		computedMetadata.push(instanceObject);
	}
	return computedMetadata;
}

export async function userSearchRequest(
	company = "",
	company_fa = "",
	country = ""
) {
	let users;
	await searchUser({
		company: company,
		company_fa: company_fa,
		country: country,
		role: "provider",
	})
		.then((response) => {
			users = response.data;
		})
		.catch((error) => {
			throw new Error(error);
		});
	return users;
}
