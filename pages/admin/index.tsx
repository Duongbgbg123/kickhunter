import {
	Box,
	Card,
	CardBody,
	Flex,
	Spacer,
	Stack,
	Text,
	VStack,
} from "@chakra-ui/react";
import { BsCurrencyDollar, BsCartCheck, BsCartPlus } from "react-icons/bs";
const HomeAdmin = () => {
	return (
		<VStack w={["95%"]} mx={"auto"} gap={"8px"}>
			<Box padding={3} borderRadius={10} w='100%' h='80px' bg='blue.600'>
				<Text fontSize={20} fontWeight='bold' color={"white"}>
					Earnings
				</Text>
				<Flex>
					<Text fontSize={20} color={"white"}>
						40000$
					</Text>
					<Spacer />
					<Text fontSize={20} color={"white"}>
						<BsCurrencyDollar />
					</Text>
				</Flex>
			</Box>
			<Box padding={3} borderRadius={10} w='100%' h='80px' bg='blue.600'>
				<Text fontSize={20} fontWeight='bold' color={"white"}>
					Products
				</Text>
				<Flex>
					<Text fontSize={20} color={"white"}>
						20
					</Text>
					<Spacer />
					<Text fontSize={20} color={"white"}>
						<BsCartCheck />
					</Text>
				</Flex>
			</Box>
			<Box padding={3} borderRadius={10} w='100%' h='80px' bg='blue.600'>
				<Text fontSize={20} fontWeight='bold' color={"white"}>
					Orders
				</Text>
				<Flex>
					<Text fontSize={20} color={"white"}>
						10
					</Text>
					<Spacer />
					<Text fontSize={20} color={"white"}>
						<BsCartPlus />
					</Text>
				</Flex>
			</Box>
		</VStack>
	);
};

export default HomeAdmin;
