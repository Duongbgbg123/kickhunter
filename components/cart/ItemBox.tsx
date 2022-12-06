import {
	Box,
	Button,
	Divider,
	Flex,
	Image,
	Text,
	useToast,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
	addToCartRequest,
	removeFromCartRequest,
} from "../../redux/feature/cart/actions";
import { numberWithCommas, setToast } from "../../utils/extraFunctions";
import { BagItemBtn, QuantityBtn } from "./BagItemBtn";
import { addToFavouriteRequest } from "../../redux/feature/favourite/action";
import { useRouter } from "next/router";
import { getItem } from "../../utils/localStorage";

export const ItemBox = ({
	name,
	description,
	image,
	price,
	quantity,
	index,
	data,
}: any) => {
	const dispatch = useDispatch();
	const toast = useToast();
	const token = useSelector((state: any) => state.authReducer.token);
	const router = useRouter();
	const user = getItem("user");
	const handleRemoveItem = () => {
		dispatch(removeFromCartRequest(index, toast) as any);
	};

	const handleAddToFavourite = () => {
		if (!token) {
			setToast(toast, "Please login first", "error");
			router.push("/auth");
		} else {
			dispatch(addToFavouriteRequest(data, user.uid, toast) as any);
		}
	};

	const handleQuantityChange = ({ target: { name } }: any) => {
		if (quantity === 1 && name === "reduce") {
			return dispatch(removeFromCartRequest(index, toast) as any);
		}
		return dispatch(addToCartRequest(data, toast, name) as any);
	};

	return (
		<>
			<Box
				my={"15px"}
				minH={"150px"}
				display={"flex"}
				gap={["5px", "5px", "20px", "20px", "20px"]}>
				<Box
					w={["80px", "80px", "150px", "150px", "150px"]}
					h={["80px", "80px", "150px", "150px", "150px"]}>
					{image && (
						<Image
							h={"100%"}
							src={image[0] ?? null}
							alt={"photo"}
						/>
					)}
				</Box>
				<Box
					w={"100%"}
					display={"grid"}
					gap={"2%"}
					gridTemplateColumns={[
						"67% 30%",
						"67% 30%",
						"80% 18%",
						"80% 18%",
						"80% 18%",
					]}>
					<Box minH={"150px"}>
						<Text fontWeight={500}>{name}</Text>
						<Text color={"gray"}>{description}</Text>

						<Flex alignItems={"center"} gap={"10px"} my={"8px"}>
							<Text>Quantity:</Text>

							{/* <QuantityBtn
								text={"-"}
								name={"reduce"}
								onClick={handleQuantityChange}
							/> */}
							<Text fontWeight={600}>{quantity}</Text>

							{/* <QuantityBtn
								text={"+"}
								name={"add"}
								onClick={handleQuantityChange}
							/> */}
						</Flex>

						<Box display={"flex"} gap={"10px"}>
							{/* <BagItemBtn
								title={"Favourites"}
								onClick={handleAddToFavourite}
							/> */}

							{/* <BagItemBtn
								title={"Remove"}
								onClick={handleRemoveItem}
							/> */}
						</Box>
					</Box>

					<Box minH={"150px"}>
						<Text fontSize={"18px"} textAlign={"end"}>
							{numberWithCommas(price)} VND
						</Text>
					</Box>
				</Box>
			</Box>

			<Divider />
		</>
	);
};
