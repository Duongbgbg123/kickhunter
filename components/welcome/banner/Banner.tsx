import { Box, Center, Flex, Stack } from "@chakra-ui/react";
import { images } from "assets";
import Image from "next/image";
import SubTitle from "./SubTitle";
import Title from "./Title";

const Banner = () => {
	return (
		<>
			<Stack
				bg={"black"}
				px={{ base: 10, md: 26 }}
				py={{ base: 20, md: 28 }}
				direction={{ base: "column", md: "row" }}
				align='center'
				justify={"space-evenly"}>
				<Box>
					<Title />
					<SubTitle />
				</Box>
				<Image src={images.nikeShoes} alt='Nike Shoes' priority />
			</Stack>
		</>
	);
};

export default Banner;
