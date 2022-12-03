import {
	Box,
	Center,
	Flex,
	Heading,
	Image,
	Spacer,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Tfoot,
	Th,
	Thead,
	Tr,
	VStack,
} from "@chakra-ui/react";
import { Loading } from "components/Loading";
import { db } from "../../../firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

import { OrderType, ProductType } from "../../../models/@type";

const Order = () => {
	const router = useRouter();
	const [status, setStatus] = useState("Ordered");
	const [order, setOrder] = useState<OrderType>();
	const [id, setId] = useState("");
	useEffect(() => {
		const fetchAPI = async () => {
			if (router.query.id) {
				const q = query(
					collection(db, "orders"),
					where("id", "==", router.query.id)
				);
				const querySnapshot = await getDocs(q);
				querySnapshot.forEach((doc: any) => {
					setOrder(doc.data());
					setId(doc.id);
				});
			}
		};
		fetchAPI();
	}, [router.query.id]);
	return order ? (
		<>
			<Box width={"full"} padding={4}>
				<IoMdArrowRoundBack
					fontSize={"30px"}
					onClick={() => router.back()}
				/>
				<Heading pb={10} textAlign={"center"}>
					Order Detail
				</Heading>
				<Center>
					<VStack alignItems={"start"} gap={5}>
						<Text> Order ID : {order.id}</Text>
						<Text> Order Amount : {order.price}</Text>
						<Text> Order Status : {order.status}</Text>
						<Text> Order User : {order.username}</Text>
						<Text> Shipping Address : {order.addressLine}</Text>
						<Text> City : {order.city}</Text>
					</VStack>
				</Center>

				<TableContainer pt={10}>
					<Table size='sm'>
						<Thead>
							<Tr>
								<Th>Stt</Th>
								<Th>Product</Th>
								<Th>Product ID</Th>
								<Th>Price</Th>
								<Th>Quantity</Th>
							</Tr>
						</Thead>
						{order.products.map(
							(item: ProductType, index: number) => {
								return (
									<Tbody key={item.id}>
										<Tr>
											<Td>{index + 1}</Td>
											<Td>
												<Image
													src={item.image[0]}
													alt={item.name}
													objectFit={"cover"}
													w={[
														"60px",
														"60px",
														"80px",
														"100px",
														"100px",
													]}
												/>
											</Td>
											<Td>{item.id}</Td>
											<Td>{item.price}</Td>
											<Td>
												<Center>{item.quantity}</Center>
											</Td>
										</Tr>
									</Tbody>
								);
							}
						)}
					</Table>
				</TableContainer>
			</Box>
		</>
	) : (
		<Loading />
	);
};

export default Order;
