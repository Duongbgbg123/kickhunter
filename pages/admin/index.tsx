import { Box, Flex, Heading, Spacer, Text, VStack } from "@chakra-ui/react";
import { db } from "../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { BsCurrencyDollar, BsCartCheck, BsCartPlus } from "react-icons/bs";
const HomeAdmin = () => {
	const [products, setProducts] = useState([]);
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		const fetchAPI = async () => {
			const products: any = [];
			const orders: any = [];
			const querySnapshot = await getDocs(collection(db, "products"));
			querySnapshot.forEach((doc: any) => {
				products.push(doc.data());
			});
			const querySnapshot2 = await getDocs(collection(db, "orders"));
			querySnapshot2.forEach((doc: any) => {
				orders.push(doc.data());
			});
			setProducts(products);
			setOrders(orders);
		};

		fetchAPI();
	}, []);
	return (
		<>
			<Heading px={5}>Statistical</Heading>
			<Text mb={10} p={"20px"}>
				Simple Statistical release
			</Text>
			<VStack height={"full"} w={["95%"]} mx={"auto"} gap={"40px"}>
				<Box
					padding={3}
					borderRadius={10}
					w='100%'
					h='100px'
					bg='blue.600'>
					<Text fontSize={20} fontWeight='bold' color={"white"}>
						Earnings
					</Text>
					<Flex>
						<Text fontSize={20} color={"white"}>
							{orders.reduce((a, b: any) => a + b.price, 0)}
						</Text>
						<Spacer />
						<Text fontWeight={"bold"} fontSize={20} color={"white"}>
							VND
						</Text>
					</Flex>
				</Box>
				<Box
					padding={3}
					borderRadius={10}
					w='100%'
					h='100px'
					bg='blue.600'>
					<Text fontSize={20} fontWeight='bold' color={"white"}>
						Products
					</Text>
					<Flex>
						<Text fontSize={20} color={"white"}>
							{products && products.length}
						</Text>
						<Spacer />
						<Text fontSize={30} fontWeight={"bold"} color={"white"}>
							<BsCartCheck />
						</Text>
					</Flex>
				</Box>
				<Box
					padding={3}
					borderRadius={10}
					w='100%'
					h='100px'
					bg='blue.600'>
					<Text fontSize={20} fontWeight='bold' color={"white"}>
						Orders
					</Text>
					<Flex>
						<Text fontSize={20} color={"white"}>
							{orders && orders.length}
						</Text>
						<Spacer />
						<Text fontSize={30} color={"white"}>
							<BsCartPlus />
						</Text>
					</Flex>
				</Box>
			</VStack>
		</>
	);
};

export default HomeAdmin;
