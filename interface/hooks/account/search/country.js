import {userSearchRequest, renderMetadataAsOneObject, fetchUserMetaData} from './combined';

async function searchCountryRequest(country){
	try {
		const users = await userSearchRequest("","", country);
		let user_ids = [];
		users.forEach((user) => user_ids.push(user.id));
		const metadata = await fetchUserMetaData(user_ids);
		const combinedMetadata = await renderMetadataAsOneObject(metadata);
		const combinedUserAndMetadata = await users.map((item, index) =>
			Object.assign({}, item, combinedMetadata[index])
		);
		return combinedUserAndMetadata;
	} catch (error) {
		throw new Error(error);
	}
}

export default searchCountryRequest;
