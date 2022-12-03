export const getAllBrands = (products: any[]) => {
	const brands = new Set(products.map((product) => product.data.category) ?? []);
	return Array.from(brands);
};

export const filterProductsByBrands = (products: any[], brands: string[]) => {
	const _return = products.filter((product) =>
		brands.includes(product.data.category)
	);
	if (_return.length === 0) return null;
	return _return;
};
