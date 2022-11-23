import { Heading, Button } from "@chakra-ui/react";

const Title = () => {
	return (
		<>
			<Heading
				as='h1'
				fontWeight={200}
				fontSize={"3rem"}
				lineHeight={"5rem"}
				fontFamily={"'Space Grotesk', sans-serif"}>
				Sell your way
			</Heading>
			<Button
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
				width={"inherit"}
				cursor={"pointer"}
				padding={"24px"}
				bg={"rgb(8, 8, 8)"}
				color={"white"}
				_hover={{
					bg: "gray.900",
				}}>
				Start selling
			</Button>
		</>
	);
};

export default Title;
