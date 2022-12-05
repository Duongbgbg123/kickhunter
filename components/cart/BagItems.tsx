import { Box, Button, Center, Flex, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { ItemBox } from "./ItemBox";

const BagItems = () => {
	const route = useRouter();
	const cartProducts = useSelector(
		(state: any) => state.cartReducer.cartProducts
	);

	return (
		<>
			{cartProducts.length != 0 ? (
				<Box>
					<Text mb={"20px"} fontSize={"20px"} fontWeight={600}>
						Bag
					</Text>

					{cartProducts &&
						cartProducts.map((item: any, index: any) => (
							<ItemBox
								key={index}
								{...item}
								index={index}
								data={item}
							/>
						))}
				</Box>
			) : (
				<Flex justify={"center"}>
					<Button
						onClick={() => {
							route.push("/all-products");
						}}
						fontFamily={'"Space Grotesk", sans-serif'}
						position={"relative"}
						fontWeight={400}
						border={"1px solid #fff"}
						display={"flex"}
						flexDirection={"row"}
						alignItems={"center"}
						justifyContent={"center"}
						borderRadius={4}
						textAlign={"center"}
						lineHeight={1}
						transition={"background-color 0.2s linear 0s"}
						fontSize={"1em"}
						width={"30%"}
						cursor={"pointer"}
						padding={"24px"}
						bg={"rgb(8, 8, 8)"}
						color={"white"}
						_hover={{
							bg: "gray.900",
						}}>
						Start selling
					</Button>
				</Flex>
			)}
		</>
	);
};

export default BagItems;
