import axios from "axios";
import { getDestination } from "../../../services/destinations";
import { getMultiProducts } from "../../../services/products";
import { base } from "../../../services/users";

export const initialProductsFetch = async (limit = 20, skip = 0) => {
	const products = await getMultiProducts(limit, skip);
	console.log(combineData(products.data));
};

const combineData = (products = []) => {
	let combined = [];
	products.map(async (product) => {
		const user = await getUserInProduct(product);
		const destinations = await getDestinationInProduct(product);
		console.log(destinations);
		product["user"] = user;
		product["destinations"] = destinations;
		combined.push(product);
	});
	return combined;
};

const getUserInProduct = async (product = {}) => {
	const user = await base("get", null, product.user_id);
	return user.data;
};

const getDestinationInProduct = async (product = {}) => {
	const destinationIds = product.destinations.split(",");
	let destinations = [];
	await Promise.all(destinationIds.map(async(id) => {
		const destination = await getDestination(id);
		console.log(destination.data);
		destinations.push(destination.data);
	}))
	return destinations.data;
};
