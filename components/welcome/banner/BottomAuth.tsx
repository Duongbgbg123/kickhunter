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
import { shallowEqual, useDispatch, useSelector } from "react-redux";
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
import { showLoginPage } from "redux/feature/auth/actions";
export const BottomAuth = () => {
	const { colorMode } = useColorMode();
	const token = useSelector(
		(state: any) => state.authReducer.token,
		shallowEqual
	);
	// const [admin, setAdmin] = useState<any>();
	const userId = useSelector((state: any) => state.authReducer?.user?.uid);
	const router = useRouter();
	const isLogin = useSelector((state: any) => state.authReducer.isLogin);
	const isReset = useSelector((state: any) => state.authReducer.isReset);
	const dispatch = useDispatch();

	const displayLogin = () => {
		dispatch(showLoginPage());
		router.push("/auth");
	};

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
			<Flex h={"60px"} flexDirection={"row"} px={"20px"} py={10}>
				<Center>
					<Box w={"160px"}>
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

				<Box display={["flex", "flex", "flex", "flex", "flex"]}>
					<Center>
						<Button
							// w={20}
							onClick={() => router.push("/auth")}
							size={"md"}
							color={"white"}
							variant='outline'
							bg={"black"}
							borderColor={"white"}
							borderRadius={0}>
							{"  SIGN IN  "}
						</Button>
					</Center>
					{/* <Button
							w={20}
							onClick={() => router.push("/auth")}
							size={"sm"}
							color={"white"}
							variant='outline'
							bg={"black"}
							borderColor={"white"}
							borderRadius={0}>
							{"  SIGN UP  "}
						</Button> */}
				</Box>
			</Flex>
		</Box>
	);
};
