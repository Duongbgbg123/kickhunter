import { Box, Center, Flex, Grid, Icon, Link, Text } from "@chakra-ui/react";
import { FaLinkedin, FaGithub, FaTelegram } from "react-icons/fa";
import { MdOutlinePersonPin } from "react-icons/md";
import { FcLike } from "react-icons/fc";
import { SiZalo } from "react-icons/si";

import { IconLink } from "../../components/footer/IconLink";

export const Footer = () => {
	return (
		<Box h={"300px"} bg={"black"} color={"white"} mt={"40px"}>
			<Center h={"80px"}>
				<Flex
					mt={"20px"}
					gap={"15px"}
					flexDirection={"row-reverse"}
					justifyContent={[
						"center",
						"right",
						"right",
						"right",
						"right",
					]}
					color={"gray"}
					mr={["0px", "30px", "80px", "80px", "80px"]}>
					<IconLink
						icon={SiZalo}
						link={"https://zalo.me/g/ytkfkq961"}
					/>
					<IconLink
						icon={FaGithub}
						link={"https://github.com/Duongbgbg123/"}
					/>
				</Flex>
			</Center>

			<Grid
				h={"220px"}
				p={"10px"}
				templateColumns={[
					"100%",
					"48% 2% 50%",
					"48% 2% 50%",
					"25% 25% 50%",
				]}>
				<Center>
					<Flex
						fontSize={["11px", "13px", "14px", "14px", "14px"]}
						gap={"10px"}
						fontWeight={600}
						flexDirection={"column"}>
						<Text>FIND A NEARBY STORE</Text>
						<Text>BECOME A MEMBER</Text>
						<Text>ALREADY A MEMBER</Text>
						<Text>SIGNUP FOR EMAIL</Text>
						<Text>SEND US FEEDBACK</Text>
					</Flex>
				</Center>

				<Center>
					<Flex
						display={["none", "none", "none", "flex", "flex"]}
						fontSize={"14px"}
						gap={"10px"}
						flexDirection={"column"}
						color={"gray"}>
						<Text color={"white"} fontWeight={600}>
							GET HELP
						</Text>
						<Text>Order Status</Text>
						<Text>Delivery</Text>
						<Text>Returns</Text>
						<Text>Payment Options</Text>
					</Flex>
				</Center>

				{/* <Flex
					mt={"20px"}
					gap={"15px"}
					flexDirection={"column"}
					justifyContent={[
						"center",
						"right",
						"right",
						"right",
						"right",
					]}
					color={"gray"}
					mr={["0px", "30px", "80px", "80px", "80px"]}>
					<Text>Phone : +1 (0) 000 0000 001 </Text>
					<Text>Email :frogflue4@gmail.com</Text>
					<Text>Address 1234 Street Name City, AA 99999:</Text>
				</Flex> */}
			</Grid>
		</Box>
	);
};
