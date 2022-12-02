const checkDuplicate = (arr: any, target: any) => {
	for (let item of arr) {
		if (item.id === target.id || item.name === target.name) {
			return true;
		}
	}
	return false;
};

export const handleCartDuplicate = (arr: any, target: any, operation: any) => {
	const isPresent = checkDuplicate(arr, target);

	if (!isPresent) {
		arr.push(target);
	} else {
		arr = arr.map((item: any) => {
			if (item.id === target.id || item.name === target.name) {
				const singlePrice = item.price / item.quantity;
				return {
					...item,
					price:
						operation === "add"
							? item.price + singlePrice
							: item.price - singlePrice,
					quantity:
						operation === "add"
							? item.quantity + 1
							: item.quantity - 1,
				};
			}
			return item;
		});
	}
	return arr;
};
