import {
	GET_DATA_ERROR,
	GET_DATA_LOADING,
	GET_DATA_SUCCESS,
	GET_PRICE_RANGE,
	NAME_A_TO_Z,
	NAME_Z_TO_A,
	RATING_HIGH_TO_LOW,
	RATING_LOW_TO_HIGH,
	RESET_FILTERS,
	SET_ALL_FILTERS,
	SORT_HIGH_TO_LOW,
	SORT_LOW_TO_HIGH,
} from "./actionTypes";
import { collection, getDocs, query, where } from "firebase/firestore";

import { db } from "firebase/config";

export const getDataLoading = () => ({ type: GET_DATA_LOADING });

export const getDataSuccess = (payload: any) => ({
	type: GET_DATA_SUCCESS,
	payload,
});

export const getDataError = () => ({ type: GET_DATA_ERROR });

export const sortLowToHigh = () => ({ type: SORT_LOW_TO_HIGH });

export const sortHighToLow = () => ({ type: SORT_HIGH_TO_LOW });

export const ratingLowToHigh = () => ({ type: RATING_LOW_TO_HIGH });

export const ratingHighToLow = () => ({ type: RATING_HIGH_TO_LOW });

export const nameAtoZ = () => ({ type: NAME_A_TO_Z });

export const nameZtoA = () => ({ type: NAME_Z_TO_A });

export const getPriceRange = (payload: any) => ({
	type: GET_PRICE_RANGE,
	payload,
});

export const setAllFilters = (payload: any) => ({
	type: SET_ALL_FILTERS,
	payload,
});

export const resetFilters = () => ({ type: RESET_FILTERS });

//Action Functions
export const getRequest = (category: any) => async (dispatch: any) => {
	let products: any = [];

	try {
		dispatch(getDataLoading());

		const q = query(
			collection(db, "products"),
			where("category", "==", `${category}`)
		);
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc: any) => {
			const addId = { ...doc.data(), id: doc.id };
			products.push(addId);
			dispatch(getDataSuccess(products));
		});
		dispatch(getDataSuccess(products));
	} catch (err) {
		console.log(err);
		dispatch(getDataError());
	}
};
