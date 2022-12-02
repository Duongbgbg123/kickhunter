import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,

	updateCurrentUser,
	updateProfile,
} from "firebase/auth";
import { addDoc, collection } from "firebase/firestore";
import Router from "next/router";


import { auth, db } from "../../../firebase/config";
import { setToast } from "../../../utils/extraFunctions";
import { removeItem, setItem } from "../../../utils/localStorage";
import {
	GET_TOKEN,
	REMOVE_TOKEN,
	SHOW_LOGIN_PAGE,
	SHOW_RESET_PAGE,
} from "./actionTypes";

export const showLoginPage = () => ({ type: SHOW_LOGIN_PAGE });

export const showResetPage = () => ({ type: SHOW_RESET_PAGE });

export const getToken = (payload: any) => ({ type: GET_TOKEN, payload });

export const removeToken = () => ({ type: REMOVE_TOKEN });

export const getSignupSuccess =
	(data: any, toast: any, onClose: any, router: any) =>
	async (dispatch: any) => {
		const { email, password, username, phoneNumber } = data;
		try {
			createUserWithEmailAndPassword(auth, email, password)
				.then(async (userCredential) => {
					const token = await userCredential.user.getIdToken();
					const user = userCredential.user;
					const { email, uid, displayName } = user;
					await updateProfile(auth.currentUser, {
						displayName: username,
					}).catch((err) => console.log(err));

					if (user) {
						addDoc(collection(db, "users"), {
							email,
							uid,
							name: username,
							phoneNumber,
						});
					}
					const saveLocalStorage = {
						email,
						displayName: username,
						phoneNumber,
						uid,
					};
					setItem("token", token);
					setItem("user", saveLocalStorage);
					setToast(toast, "Signup successfully", "success");

					// onClose();
					router.push("/checkout");

				})
				.catch((err) => {
					setToast(toast, err.message, "error");
				});
		} catch (err: any) {
			console.log(err);
			setToast(toast, err.message, "error");
		}
	};

export const getLoginSuccess =
	(data: any, toast: any, router: any, onClose: any) =>
	async (dispatch: any) => {
		const { email, password } = data;
		try {
			signInWithEmailAndPassword(auth, email, password)
				.then(async (userCredential) => {
					const token = await userCredential.user.getIdToken();
					const user = userCredential.user.providerData[0];
					const userId = userCredential.user.uid;
					console.log(user);

					dispatch(getToken({ token, user }));
					setItem("token", token);
					setItem("user", { ...user, uid: userId });

					setToast(toast, "Login Successfully", "success");
					// const user = userCredential.user;
					onClose();

					router.push("/cart");
					// router.reload(window.location.pathname);
				})
				.catch((err) => {
					setToast(toast, err.message, "error");
				});
		} catch (err: any) {
			console.log(err);
			setToast(toast, err.response.data.message, "error");
		}
	};



			

export const logoutFromAccount = (toast: any) => (dispatch: any) => {
	try {
		removeItem("token");
		removeItem("user");
		dispatch(removeToken());
		setToast(toast, "Logout Successfully", "success");
	} catch (err) {
		console.log(err);
		setToast(toast, "Something went wrong", "error");
	}
};
