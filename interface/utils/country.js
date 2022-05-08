import { countries } from "../constants/countries";

export const CountryDetector = (countryCode, lang) => {
	let object = countries.filter((obj) => obj["code"] === countryCode);
	if (lang === "fa") {
		try {
			return object[0]["persian"];
		} catch {}
	} else {
		try {
			return object[0]["label"];
		} catch {}
	}
};
