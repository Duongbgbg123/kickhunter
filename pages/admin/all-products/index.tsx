import {
	Box,
	Center,
	Flex,
	flexbox,
	Image,
	Show,
	Spacer,
	Text,
	VStack,
} from "@chakra-ui/react";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

const AllProduct = () => {
	return (
		<div>
			<VStack w={["100%"]} gap={"20px"}>
				<Box width={"100%"} minH={"40px"}>
					<Flex justifyContent={"space-between"}>
						<Center>
							<Show above='sm'>
								<Box>1</Box>
							</Show>
						</Center>
						<Center>
							<Box
								w={["40px", "40px", "75px", "75px", "75px"]}
								h={["40px", "40px", "75px", "75px", "75px"]}>
								<Image
									borderRadius={"8px"}
									src={
										"https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/2a617295-4b1a-46e1-91e2-6963fd252c59/dunk-high-retro-se-shoes-tXRLdK.png"
									}
								/>
							</Box>
						</Center>

						<Center>
							<Text fontSize={"sm"}>Nike air Force</Text>
						</Center>
						<Center>
							<Show above='sm'>
								<Box>Nike</Box>
							</Show>
						</Center>
						<Center>
							<Text>4000</Text>
						</Center>
						<Center>
							<Box padding={"5px"}>
								<Text fontSize={"30px"}>
									<BiEdit />
								</Text>
							</Box>
							<Box padding={"5px"}>
								<Text fontSize={"30px"}>
									<MdDelete />
								</Text>
							</Box>
						</Center>
					</Flex>
				</Box>
				<Box width={"100%"} minH={"40px"}>
					<Flex justifyContent={"space-between"}>
						<Center>
							<Show above='sm'>
								<Box>1</Box>
							</Show>
						</Center>
						<Center>
							<Box
								w={["40px", "40px", "75px", "75px", "75px"]}
								h={["40px", "40px", "75px", "75px", "75px"]}>
								<Image
									borderRadius={"8px"}
									src={
										"https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/2a617295-4b1a-46e1-91e2-6963fd252c59/dunk-high-retro-se-shoes-tXRLdK.png"
									}
								/>
							</Box>
						</Center>

						<Center>
							<Text fontSize={"sm"}>Nike air Force</Text>
						</Center>
						<Center>
							<Show above='sm'>
								<Box>Nike</Box>
							</Show>
						</Center>
						<Center>
							<Text>4000</Text>
						</Center>
						<Center>
							<Box padding={"5px"}>
								<Text fontSize={"30px"}>
									<BiEdit />
								</Text>
							</Box>
							<Box padding={"5px"}>
								<Text fontSize={"30px"}>
									<MdDelete />
								</Text>
							</Box>
						</Center>
					</Flex>
				</Box>
				<Box width={"100%"} minH={"40px"}>
					<Flex justifyContent={"space-between"}>
						<Center>
							<Show above='sm'>
								<Box>1</Box>
							</Show>
						</Center>
						<Center>
							<Box
								w={["40px", "40px", "75px", "75px", "75px"]}
								h={["40px", "40px", "75px", "75px", "75px"]}>
								<Image
									borderRadius={"5px"}
									src={
										"https://static.nike.com/a/images/t_PDP_864_v1/f_auto,b_rgb:f5f5f5/2a617295-4b1a-46e1-91e2-6963fd252c59/dunk-high-retro-se-shoes-tXRLdK.png"
									}
								/>
							</Box>
						</Center>

						<Center>
							<Text fontSize={"sm"}>Nike air Force</Text>
						</Center>
						<Center>
							<Show above='sm'>
								<Box>Nike</Box>
							</Show>
						</Center>
						<Center>
							<Text>4000</Text>
						</Center>
						<Center>
							<Box padding={"5px"}>
								<Text fontSize={"30px"}>
									<BiEdit />
								</Text>
							</Box>
							<Box padding={"5px"}>
								<Text fontSize={"30px"}>
									<MdDelete />
								</Text>
							</Box>
						</Center>
					</Flex>
				</Box>
			</VStack>
		</div>
	);
};

export default AllProduct;
