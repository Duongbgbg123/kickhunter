import { Box, Button, Flex, Image, Text, useToast } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { deleteFavouriteRequest } from "../../redux/feature/favourite/action";
import { numberWithCommas, shortString } from "../../utils/extraFunctions";
import { getItem } from "../../utils/localStorage";
import { setItemSession } from "../../utils/sessionStorage";

export const FavouriteItemBox = ({
	id,
	name,
	description,
	price,
	image,
	data,
	index,
}: any) => {
	const toast = useToast();
	const dispatch = useDispatch();
	const token = useSelector((state: any) => state.authReducer.token);
	const userId = getItem("user");
	const handleDeleteRequest = () => {
		dispatch(
			deleteFavouriteRequest(index, id, userId.uid, data, toast) as any
		);
	};

	const handleDisplayProduct = () => {
		setItemSession("singleProduct", data);
		// navigate("/description");
	};

	return (
		<>
			<Flex flexDirection={"column"} mb={"30px"}>
				<Box overflow={"hidden"}>
					<Image
						onClick={handleDisplayProduct}
						className='imgAnimation'
						cursor={"pointer"}
						src={image[0]}
					/>
				</Box>
				<Box mt={"15px"}>
					<Flex
						fontSize={["14px", "14px", "16px", "16px", "18px"]}
						justifyContent={"space-between"}>
						<Text>{shortString(name)}</Text>
						<Text>{numberWithCommas(price)} VND</Text>
					</Flex>
					<Text
						fontSize={["12px", "12px", "15px", "15px", "17px"]}
						color={"gray"}
						my={"2px"}>
						{shortString(description, 20)}
					</Text>
					<Button
						variant={"ghost"}
						borderRadius={"20px"}
						border={"1px solid #cecdce"}
						mt={"20px"}
						onClick={handleDeleteRequest}>
						Remove
					</Button>
				</Box>
			</Flex>
		</>
	);
};
