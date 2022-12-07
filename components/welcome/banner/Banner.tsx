import {
	Box,
	Button,
	ButtonGroup,
	Center,
	Divider,
	Flex,
	Show,
	Spacer,
	Stack,
	Text,
	useColorMode,
} from "@chakra-ui/react";
import { images } from "assets";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
// import { BottomAuth } from "./bottomAuth";
import SubTitle from "./SubTitle";
import Title from "./Title";

const Banner = () => {
	const router = useRouter();
	const { colorMode } = useColorMode();
	// const userData = useSelector((state: any) => state.authReducer.user);
	return (
		<>
			<Stack
				bg={"black"}
				mx='auto'
				pl={"40px"}
				py={{ base: 20, md: 28 }}
				pt={10}
				direction={{ base: "column", md: "row" }}
				align='center'
				justify={"space-evenly"}>
				<Box>
					<Title />
					<SubTitle />
				</Box>
				<Box>
					<Image
						priority
						src={images.logoLanding2}
						alt='Nike Shoes'
					/>
				</Box>
			</Stack>
		</>
	);
};

export default Banner;
