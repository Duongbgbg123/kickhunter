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
import SubTitle from "./SubTitle";
import Title from "./Title";

const Banner = () => {
	const router = useRouter();
	const { colorMode } = useColorMode();
	const userData = useSelector((state: any) => state.authReducer.user);
	return (
		<>
			<Box bg={"black"}>
				<Flex
					padding={"5"}
					minWidth='max-content'
					alignItems='center'
					bg={"whiteAlpha.50"}
					gap='2'>
					<Show above='sm'>
						<Box w={"200px"}>
							<Link href={"/"}>
								<Image
									src={images.logoKickHunt}
									alt='logo'
									priority
									style={{
										filter: `invert(${
											colorMode === "dark" ? "100%" : "0%"
										})`,
									}}
								/>
							</Link>
						</Box>
					</Show>
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
							borderColor={"white"}
							borderRadius={0}>
							SIGN UP
						</Button>
						<Button
							w={125}
							onClick={() => router.push("/auth")}
							size={"lg"}
							color={"white"}
							variant='outline'
							bg={"black"}
							borderColor={"white"}
							borderRadius={0}>
							{"  LOGIN  "}
						</Button>
					</ButtonGroup>
				</Flex>
			</Box>

			<Stack
				bg={"black"}
				mx='auto'
				pl={"40px"}
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
