import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { setToast } from "utils/extraFunctions";
import { db, storage } from "./config";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import { v4 } from "uuid";

export const upload = async (images: any, setListUrls: any, toast: any) => {
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


export const addOrder = async (order: any, setLoading: any,toast:any,router:any) => {
    setLoading(true);
    try {
        const docRef = await addDoc(collection(db, 'orders'), order);
        setLoading(false);
        setToast(toast, 'Order Successful...!!', 'success')
        router.push("/all-products");
    } catch (e) {
        setLoading(false);
        setToast(toast,'Orders failed!!','error');
    }

};

export const updateStatus = async (id: any, status: string,toast:any) => {
    try {
        const docRef = doc(db, 'orders', id);
        await updateDoc(docRef, {
            status: status,
        });
        setToast(toast,'Update Successful...!!','success');
    } catch {
        setToast(toast,'Update failed!!','error');
    }
};

export const updateAdmin = async (id: any, isAdmin: any,toast:any) => {
    try {
        const docRef = doc(db, 'users', id);
        await updateDoc(docRef, {
            isAdmin: isAdmin,
        });
        setToast(toast,'Update Successful...!!','success');
    } catch {
        setToast(toast,'Update failed!!','error');
    }
};