import {
	Box,
	Button,
	ButtonGroup,
	Center,
	Flex,
	Spacer,
	Text,
	useColorMode,
} from "@chakra-ui/react";
import { Logout } from "components/auth/Logout";
import { Auth } from "components/auth/Auth";
import { RiHeartLine, RiShoppingBagLine } from "react-icons/ri";
import { shallowEqual, useSelector } from "react-redux";
// import { DarkModeBtn } from "./DarkModeBtn";
// import { Category, NavIcon } from "./CategoryAndIcon";
// import { SideDrawer } from "./SideDrawer";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { images } from "assets";
import { collection, getDocs, query, where } from "firebase/firestore";
// import { db } from "../../firebase/config";
import { useRouter } from "next/router";
export const BottomAuth = () => {
	const { colorMode } = useColorMode();
	const token = useSelector(
		(state: any) => state.authReducer.token,
		shallowEqual
	);
	const [admin, setAdmin] = useState<any>();
	const userId = useSelector((state: any) => state.authReducer?.user?.uid);
	const router = useRouter();
	// useEffect(() => {
	// 	const fetchAPI = async () => {
	// 		if (userId) {
	// 			const q = query(
	// 				collection(db, "users"),
	// 				where("uid", "==", userId)
	// 			);
	// 			const querySnapshot = await getDocs(q);
	// 			querySnapshot.forEach((doc: any) => {
	// 				setAdmin(doc.data());
	// 			});
	// 		}
	// 	};
	// 	fetchAPI();
	// }, [userId]);

	return (
		<Box
			// position={"sticky"}
			// top={0}
			// left={0}
			// // zIndex={9999999}
			bg={"black"}
			// zIndex={999}

			// bg={"var(--chakra-colors-chakra-body-bg)"}
			// color={"var(--chakra-colors-chakra-body-text)"}
		>
			<Flex h={"60px"} flexDirection={"row"} px={"10px"}>
				<Center>
					<Box w={"120px"}>
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
				</Center>

				<Spacer />

				<Box mt={2} display={["flex", "flex", "flex", "flex", "flex"]}>
					<ButtonGroup gap='0'>
						<Button
							w={20}
							onClick={() => router.push("/auth")}
							size={"sm"}
							color={"white"}
							variant='outline'
							bg={"black"}
							borderColor={"white"}
							borderRadius={0}>
							{"  LOGIN  "}
						</Button>
						<Button
							w={20}
							onClick={() => router.push("/auth")}
							size={"sm"}
							color={"white"}
							variant='outline'
							bg={"black"}
							borderColor={"white"}
							borderRadius={0}>
							{"  SIGN UP  "}
						</Button>
					</ButtonGroup>
				</Box>
			</Flex>
		</Box>
	);
};
