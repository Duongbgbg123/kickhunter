import { v4 } from "uuid";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { setToast } from "utils/extraFunctions";
import { db, storage } from "./config";
import { addDoc, collection } from "firebase/firestore";
export const upload = async (
	images: any,
	setListUrls: any,
	toast: any
) => {
	const files: any[] = Object.values(images);
	for (let file of files) {
		const imageRef = ref(storage, `images/${v4()}${file.name}`);
		await uploadBytes(imageRef, file)
			.then((snap: any) =>
				getDownloadURL(snap.ref)
					.then((url) => {
						setListUrls((prev: any) => [...prev, url]);
					})
					.catch((error) => setToast(toast, error.message, "error"))
			)
			.catch((e) => setToast(toast, e.message, "error"));
	}
};

export const addProduct = async (product: any,toast:any) => {
    try {
        const docRef = await addDoc(collection(db, 'products'), product);
        setToast(toast,'Add Product Successful...!!','success');
    } catch (e) {
        setToast(toast,'Add product failed!!','error');
		
    }
};


export const addOrder = async (order: any, setLoading: any,toast:any) => {
    setLoading(true);
    try {
        const docRef = await addDoc(collection(db, 'orders'), order);
        setLoading(false);
        setToast(toast,'Order Successful...!!','success')
    } catch (e) {
        setLoading(false);
        setToast(toast,'Orders failed!!','error');
    }
};
