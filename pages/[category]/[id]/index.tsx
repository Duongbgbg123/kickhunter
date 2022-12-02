import {
	Box,
	Divider,
	Grid,
	ListItem,
	Text,
	UnorderedList,
	useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { numberWithCommas, setToast } from "../../../utils/extraFunctions";
import { ImageModal } from "../../../components/product/ImageModal";
import { SelectSize } from "../../../components/product/SelectSize";
import { NewButton } from "../../../components/product/NewButton";
import { getItemSession } from "../../../utils/sessionStorage";
import { addToCartRequest } from "../../../redux/feature/cart/actions";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/config";
import { addToFavouriteRequest } from "../../../redux/feature/favourite/action";
import { getItem } from "../../../utils/localStorage";

const Product = () => {
	const router = useRouter();
	const data = getItemSession("singleProduct");
	const [mySize, setMySize] = useState(false);

	const [myData, setMyData] = useState<any>();
	const token = useSelector((state: any) => state.authReducer.token);
	const toast = useToast();
	const userId = getItem("user");
	const dispatch = useDispatch();

	const handleAddToCart = () => {
		if (mySize === false) {
			setToast(toast, "Please select a Size", "error", 2000);
		} else {
			const payload = { ...data, size: mySize, quantity: 1 };
			dispatch(addToCartRequest(payload, toast) as any);
		}
	};
	useEffect(() => {
		const fetchAPI = async () => {
			if (router.query.id) {
				const productRef = doc(db, "products", `${router.query.id}`);
				const docSnap = await getDoc(productRef);
				if (docSnap.exists()) {
					setMyData(docSnap.data());
				} else {
					console.log("No such document!");
				}
			}
		};
		fetchAPI();
	}, [router.query.id]);
	console.log(myData);

	const handleAddToFavourite = () => {
		if (!token) {
			setToast(toast, "Please login first", "", 2000, "error");
			router.push("/auth");
		} else {
			dispatch(addToFavouriteRequest(data, userId.uid, toast) as any);
		}
	};

	return (
		<>
			<Grid
				p={"10px"}
				gap={["40px", "40px", "4%", "4%", "4%"]}
				templateColumns={[
					"100%",
					"100%",
					"55% 41%",
					"62% 34%",
					"62% 34%",
				]}
				w={["100%", "100%", "100%", "100%", "90%"]}
				m={[
					"40px auto 100px",
					"40px auto 100px",
					"40px auto 60px",
					"40px auto 60px",
					"40px auto 60px",
				]}>
				<ImageModal img={myData?.image ?? []} />

				<Box px={["20px", "40px"]}>
					<Text fontSize={"29px"}>{myData?.name}</Text>
					<Text>{myData?.description}</Text>
					<Text fontSize={"22px"} mt='20px'>
						₹ {numberWithCommas(myData?.price)}
					</Text>
					<Text color={"gray"}>incl. of taxes and duties</Text>
					<Text fontSize={"18px"} mt={"30px"} mb={"10px"}>
						Select Size
					</Text>
					<Box mb={"30px"}>
						<SelectSize size={myData?.size} setMySize={setMySize} />
					</Box>

					<NewButton
						click={handleAddToCart}
						name={"Add to Bag"}
						bgColor={"black"}
						color={"white"}
						hoverBg={"#1e1e1e"}
						borderColor={"transparent"}
					/>
					<NewButton
						click={handleAddToFavourite}
						name={"Favourite"}
						bgColor={"white"}
						color={"black"}
						hoverBorder={"black"}
						borderColor={"#cecdce"}
					/>

					<Divider my={"30px"} />

					<Text
						fontSize={"18px"}
						mb={"10px"}
						textDecoration={"underline"}>
						Product Detail
					</Text>
					<UnorderedList fontSize={"18px"}>
						<ListItem>Category: {myData?.category}</ListItem>
						<ListItem>Color: {myData?.color}</ListItem>
						<ListItem>Vote: {myData?.vote}</ListItem>
					</UnorderedList>
				</Box>
			</Grid>
		</>
	);
};
export default Product;
