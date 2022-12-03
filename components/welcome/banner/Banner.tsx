import {
	Box,
	Button,
	ButtonGroup,
	Divider,
	Flex,
	Spacer,
	Stack,
} from "@chakra-ui/react";
import { images } from "assets";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import SubTitle from "./SubTitle";
import Title from "./Title";

const Banner = () => {
	const router = useRouter();
	return (
		<>
			<Flex
				padding={"5"}
				minWidth='max-content'
				alignItems='center'
				bg={"black"}
				gap='2'>
				<Spacer />
				<ButtonGroup gap='2'>
					<Button
						onClick={() => router.push("/auth")}
						size={"lg"}
						color={"white"}
						variant='outline'>
						Sign Up
					</Button>
					<Button
						onClick={() => router.push("/auth")}
						size={"lg"}
						color={"white"}
						variant='outline'>
						{"  Login  "}
					</Button>
				</ButtonGroup>
			</Flex>
			<Divider />
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
