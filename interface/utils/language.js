import { languages } from "countries-list";

//TODO: Get the native languages first!
export const fetchLanguages = () => {
		let list = [];
		Object.keys(languages).map(key => {
			list.push({
				code: key,
				lang: languages[key].name
			})
		})
	return list
	}

export const convertLanguages = (listOfLanguages) => {
	let list = [];
	if (!Array.isArray(listOfLanguages)) return false;
	listOfLanguages.map(languageCode => {
		Object.keys(languages).map(key => {
			if (key === languageCode) list.push({
				code: key,
				lang: languages[key].name
			})
		})
	})
	return list
}


export const isStringPersian = (string) => {
	const persianRegex = /^[\u0600-\u06FF\s]+$/;
	return persianRegex.test(string);
}
