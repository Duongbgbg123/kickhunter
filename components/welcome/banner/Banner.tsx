import { Box, Center } from "@chakra-ui/react";
import { images } from "assets";
import Image from "next/image";
import SubTitle from "./SubTitle";
import Title from "./Title";

const Banner = () => {
	return (
		<Center
			padding={"4.6rem 9.2rem 4.6rem 9.2rem"}
			bg={"black"}
			color='white'>
			<Box>
				<Box>
					<Title />
					<SubTitle />
				</Box>
			</Box>
			<Image src={images.nikeShoes} alt='Nike Shoes' priority />
		</Center>
	);
};

export default Banner;
