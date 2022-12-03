export const setItem = (key: any, data: any) => {
	return localStorage.setItem(key, JSON.stringify(data));
};

export const getItem = (key: any) => {
	if (typeof window !== "undefined" && window.localStorage) {
		if (localStorage.getItem(key)) {
			return JSON.parse(localStorage.getItem(key) as string);
		}
	}

	return undefined;
};

export const removeItem = (key: any) => {
	return localStorage.removeItem(key);
};
