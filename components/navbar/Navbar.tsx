import { Box, Center, Flex, Spacer, useColorMode } from "@chakra-ui/react";
import { Logout } from "components/auth/Logout";
import { Auth } from "components/auth/Auth";
import { RiHeartLine, RiShoppingBagLine } from "react-icons/ri";
import { shallowEqual, useSelector } from "react-redux";
import { DarkModeBtn } from "./DarkModeBtn";
import { Category, NavIcon } from "./CategoryAndIcon";
import { SideDrawer } from "./SideDrawer";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { images } from "assets";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/config";

export const Navbar = () => {
	const { colorMode } = useColorMode();
	const token = useSelector(
		(state: any) => state.authReducer.token,
		shallowEqual
	);
	const [admin, setAdmin] = useState<any>();
	const userId = useSelector((state: any) => state.authReducer.user.uid);

	useEffect(() => {
		const fetchAPI = async () => {
			if (userId) {
				const q = query(
					collection(db, "users"),
					where("uid", "==", userId)
				);
				const querySnapshot = await getDocs(q);
				querySnapshot.forEach((doc: any) => {
					setAdmin(doc.data());
				});
			}
		};
		fetchAPI();
	}, [userId]);

	return (
		<Box
			position={"sticky"}
			top={0}
			left={0}
			// zIndex={9999999}

			zIndex={999}
			bg={"var(--chakra-colors-chakra-body-bg)"}
			color={"var(--chakra-colors-chakra-body-text)"}>
			<Box h={"36px"}>
				<Center
					h={"36px"}
					justifyContent={"right"}
					mr={"40px"}
					fontSize={"16px"}
					cursor={"pointer"}>
					{token ? <Logout /> : <Auth />}
					<DarkModeBtn />
				</Center>
			</Box>

			<Flex h={"60px"} flexDirection={"row"} px={"20px"}>
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

				<Spacer />

				<Box display={["none", "none", "flex", "flex", "flex"]}>
					{admin?.isAdmin && (
						<Category
							name={"Admin System"}
							text={"Admin System"}
							link={"/admin"}
						/>
					)}
					<Category
						name={"All Product"}
						text={"All Product"}
						link={"/all-products"}
					/>
					<Category
						name={"All Product"}
						text={"All Product"}
						link={"/all-products"}
					/>
				</Box>

				<Spacer />
				<Spacer />

				<Box display={["flex", "flex", "none", "none", "none"]}>
					<Center mr={"10px"}>
						<SideDrawer />
					</Center>
				</Box>
			</Flex>
		</Box>
	);
};
