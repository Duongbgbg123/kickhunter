import { collection, getDocs, query, where } from "firebase/firestore";

import {
	GET_DATA_ERROR_HOME,
	GET_DATA_LOADING_HOME,
	GET_DATA_SUCCESS_CLOTH,
	GET_DATA_SUCCESS_SHOE,
} from "./actionType";
import { db } from "../../../firebase/config";

export const getDataLoadingHome = () => ({ type: GET_DATA_LOADING_HOME });

export const getDataSuccessShoe = (payload: any) => ({
	type: GET_DATA_SUCCESS_SHOE,
	payload,
});

export const getDataErrorHome = () => ({ type: GET_DATA_ERROR_HOME });

export const getShoeData = () => async (dispatch: any) => {
	try {
		let products: any = [];
		const q = query(collection(db, "products"));
		const querySnapshot = await getDocs(q);
		querySnapshot.forEach((doc: any) => {
			products.push(doc.data());
			dispatch(getDataSuccessShoe(products));
		});
	} catch (err) {
		console.log(err);
		dispatch(getDataErrorHome());
	}
};
