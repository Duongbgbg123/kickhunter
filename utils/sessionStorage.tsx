export const setItemSession = (key: any, value: any) => {
	return sessionStorage.setItem(key, JSON.stringify(value));
};

export const getItemSession = (key: any) => {
	if (typeof window !== "undefined" && window.sessionStorage) {
		if (sessionStorage.getItem(key)) {
			return JSON.parse(sessionStorage.getItem(key) as string);
		}
		return undefined;
		// do your stuff with sessionStorage
	}
};

export const removeItemSession = (key: any) => {
	return sessionStorage.removeItem(key);
};
