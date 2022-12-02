export const convertObject = (obj: any) => {
	let ans: any = {};
	for (let k1 in obj) {
		ans[k1] = [];
		for (let k2 in obj[k1]) {
			obj[k1][k2] && ans[k1].push(k2);
		}
	}
	return ans;
};

export const setToast = (
	toast: any,
	title: string,
	status: string,
	duration = 2000,
	description?: string
) => {
	toast({
		title,
		description,
		status,
		duration,
		isClosable: true,
		position: "top",
	});
};

// export const getGender = (gender: any) => {
//   return !(gender === 'men' || gender === 'women' || gender === 'kids');
// };

export const shortString = (text: string, limit = 15) => {
	return text.slice(0, limit) + (text.length > limit ? "..." : "");
};

export const numberWithCommas = (x: any) => {
	return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};
