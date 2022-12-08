import {
	ADD_TO_FAVOURITE,
	GET_FAVOURITE_ERROR,
	GET_FAVOURITE_LOADING,
	GET_FAVOURITE_SUCCESS,
} from "./actionTypes";
import { setToast } from "../../../utils/extraFunctions";
import {
	addDoc,
	arrayRemove,
	arrayUnion,
	collection,
	deleteField,
	doc,
	FieldValue,
	getDoc,
	getDocs,
	query,
	setDoc,
	updateDoc,
	where,
} from "firebase/firestore";
import { db } from "../../../firebase/config";
import { getItem, setItem } from "../../../utils/localStorage";

export const addToFavourite = (payload: any) => {
	return { type: ADD_TO_FAVOURITE, payload };
};

export const getFavouriteLoading = () => {
	return { type: GET_FAVOURITE_LOADING };
};

export const getFavouriteSuccess = (payload: any) => {
	return { type: GET_FAVOURITE_SUCCESS, payload };
};

export const getFavouriteError = () => {
	return { type: GET_FAVOURITE_ERROR };
};

export const addToFavouriteRequest =
	(data: any, uid: any, toast: any) => async () => {
		console.log("datawerw", data);

		try {
			const dataStorage = getItem("favorites");
			// delete data._id;
			// const userDocs = await doc(db, 'users').id;
			// console.log(userDocs);

			const docRef = doc(db, "favourite", `${uid}`);
			await setDoc(
				docRef,
				{ favourites: arrayUnion(data) },
				{ merge: true }
			);
			setToast(toast, "Item added to the favourites", "success");
		} catch (err) {
			console.log(err);
			if (err === "Already present in the Favourite") {
				setToast(toast, err, "info");
			} else {
				setToast(toast, "Something went wrong", "error");
			}
		}
	};

export const getFavouriteRequest = (uid: any) => async (dispatch: any) => {
	try {
		dispatch(getFavouriteLoading());
		// const userId = await
		let favourite: any = [];
		const docRef = doc(db, "favourite", `${uid}`);
		const docSnap = await getDoc(docRef);
		if (docSnap.exists()) {
			docSnap.data().favourites.forEach((fav: any) => {
				favourite.push(fav);
			});
		}
		setItem("favourites", favourite);
		dispatch(getFavouriteSuccess(favourite));
	} catch (err) {
		console.log(err);
		dispatch(getFavouriteError());
	}
};

export const deleteFavouriteRequest =
	(index: any, id: any, uid: any, data: any, toast: any) =>
	async (dispatch: any) => {
		try {
			dispatch(getFavouriteLoading());
			const favourites = getItem("favourites");
			const removeItem = favourites.filter((fav: any) => fav.id !== id);

			const docRef = doc(db, "favourite", `${uid}`);
			await updateDoc(docRef, {
				favourites: removeItem,
			});
			dispatch(getFavouriteRequest(uid));
			setToast(toast, "Product removed from favourites", "success");
		} catch (err) {
			console.log(err);
			dispatch(getFavouriteError());
			setToast(toast, "Something went wrong", "error");
		}
	};
