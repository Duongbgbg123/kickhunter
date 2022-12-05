export const getAllBrands = (products: any[]) => {
	const brands = new Set(products.map((product) => product.category) ?? []);
	return Array.from(brands);
};

export const getALlColors = (products: any[]) => {
	const colors = new Set(products.map((product) => product.color) ?? []);
	return Array.from(colors);
};

export const filterProducts = (
	products: any[],
	brands: string[],
	colors: string[],
	sizes: number[]
) => {
	const _return1 = products.filter((product) => {
		return brands.includes(product.category);
	});
	const _return2 = _return1.filter((product) => {
		return colors.includes(product.color);
	});
	const _return = _return2.filter((product) => {
		const sizes_prod = product.size.map((s: string) =>
			Number(s.replace("EU", ""))
		);
		const min_size = Math.min(...sizes_prod);
		const max_size = Math.max(...sizes_prod);
		const min_size_req = Math.min(...sizes);
		const max_size_req = Math.max(...sizes);
		return min_size_req <= min_size && max_size_req >= max_size;
	});
	if (_return.length === 0) return null;
	return _return;
};

export const searchingProducts = (products: any[], search: string) => {
	if (search === "" || search === null) return null;
	const _return = products.filter((product) =>
		product.name.toLowerCase().includes(search.toLowerCase())
	);
	if (_return.length === 0) return null;
	return _return;
};
