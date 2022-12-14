const getTotalAndQuantity = (arr: any) => {
	let subTotal = 0;
	let quantity = 0;
	for (let item of arr) {
		subTotal += item.price;
		quantity += item.quantity;
	}
	return { subTotal, quantity };
};

export const getCartTotal = (arr: any, discountPercent = 0) => {
	const { subTotal, quantity } = getTotalAndQuantity(arr);

	const shipping = subTotal < 14000 && subTotal > 0 ? 15000 : 0;
	const discount = Math.floor((subTotal * discountPercent) / 100);
	const total = subTotal + shipping - discount;

	return {
		subTotal,
		quantity,
		shipping,
		discount,
		total,
	};
};
