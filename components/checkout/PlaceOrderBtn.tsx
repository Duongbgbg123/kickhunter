import { Input, Text, useColorModeValue } from "@chakra-ui/react";

export const PlaceOrderBtn = ({ onClick }: any) => {
	const color = useColorModeValue("white", "black");
	return (
		<>
			<Input
				onClick={onClick}
				as={"button"}
				type={"submit"}
				h={"60px"}
				bg={"#a6b5c4"}
				color={"black"}
				border={`1px solid ${color}`}
				borderRadius={"50px"}
				w={"100%"}
				fontSize={"17px"}
				mt={"20px"}
				_hover={{ borderColor: "black" }}>
				<Text fontWeight={"bold"}>SELL NOW</Text>
			</Input>
		</>
	);
};
