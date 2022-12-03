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
			<Box height={20} position={"fixed"} top={0} right={0} zIndex={999}>
				<Flex
					padding={"5"}
					minWidth='max-content'
					alignItems='center'
					bg={"whiteAlpha.50"}
					gap='2'>
					<Spacer />
					<ButtonGroup gap='3'>
						<Button
							w={125}
							onClick={() => router.push("/auth")}
							size={"lg"}
							color={"white"}
							variant='outline'
							_hover={{
								bg: "gray.900",
							}}
							bg={"black"}
							borderRadius={0}>
							Sign Up
						</Button>
						<Button
							w={125}
							onClick={() => router.push("/auth")}
							size={"lg"}
							color={"white"}
							variant='outline'
							bg={"black"}
							borderRadius={0}>
							{"  Login  "}
						</Button>
					</ButtonGroup>
				</Flex>
			</Box>

			<Stack
				bg={"black"}
				px={{ base: 20, md: 28 }}
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
