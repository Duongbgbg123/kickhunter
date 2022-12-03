import { Box, Center, Flex, Spacer, useColorMode } from "@chakra-ui/react";
import { Logout } from "components/auth/Logout";
import { Auth } from "components/auth/Auth";
import { RiHeartLine, RiShoppingBagLine } from "react-icons/ri";
import { shallowEqual, useSelector } from "react-redux";
import { DarkModeBtn } from "./DarkModeBtn";
import { Category, NavIcon } from "./CategoryAndIcon";
import { SideDrawer } from "./SideDrawer";
import Link from "next/link";
import { useEffect } from "react";
import Image from "next/image";
import { images } from "assets";

export const Navbar = () => {
	const { colorMode } = useColorMode();
	const token = useSelector(
		(state: any) => state.authReducer.token,
		shallowEqual
	);

	useEffect(() => {}, [token]);

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
				<Box w={"140px"}>
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

				<Box display={["none", "none", "flex", "flex", "flex"]}></Box>

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
