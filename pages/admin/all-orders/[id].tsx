import {
	Box,
	Button,
	Card,
	CardBody,
	CardHeader,
	Center,
	Flex,
	FormControl,
	FormLabel,
	Heading,
	Image,
	Spacer,
	Stack,
	StackDivider,
	Switch,
	Table,
	TableContainer,
	Tbody,
	Td,
	Text,
	Tfoot,
	Th,
	Thead,
	Tr,
	useToast,
	VStack,
} from "@chakra-ui/react";
import { Loading } from "components/Loading";
import { db } from "../../../firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

import { OrderType, ProductType } from "../../../models/@type";
import { updateStatus } from "../../../firebase/upload";

const Order = () => {
	const router = useRouter();
	const toast = useToast();
	const [order, setOrder] = useState<OrderType>();
	const [status, setStatus] = useState("Ordered");
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

	const handleUpdateStatus = () => {
		updateStatus(id, status, toast);
	};

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
				<Flex justify={"space-between"}>
					<VStack alignItems={"start"} gap={5}>
						<Text> Order ID : {order.id}</Text>
						<Text> Order Amount : {order.price}</Text>
						<Text> Order Status : {order.status}</Text>
						<Text> Order User : {order.username}</Text>
						<Text> Sdt : {order.mobile}</Text>
					</VStack>
					<Card w={300}>
						<CardHeader>
							<Heading size='md'>Update Status</Heading>
						</CardHeader>

						<CardBody>
							<Stack divider={<StackDivider />} spacing='4'>
								<Box>
									<FormControl
										alignItems='center'
										display={{ "md": "flex" }}>
										<FormLabel htmlFor='Ordered' mb='0'>
											Ordered
										</FormLabel>
										<Switch
											colorScheme='blue'
											size='md'
											value={"Ordered"}
											defaultChecked={
												order.status == "Ordered"
													? true
													: false
											}
											isChecked={
												status == "Ordered"
													? true
													: false
											}
											onChange={(e: any) =>
												setStatus(e.target.value)
											}
										/>
									</FormControl>
								</Box>
								<Box>
									<FormControl
										alignItems='center'
										display={{ "md": "flex" }}>
										<FormLabel htmlFor='Delivered' mb='0'>
											Delivered
										</FormLabel>
										<Switch
											id='Delivered'
											value={"Delivered"}
											defaultChecked={
												order.status == "Delivered"
													? true
													: false
											}
											isChecked={
												status == "Delivered"
													? true
													: false
											}
											onChange={(e: any) =>
												setStatus(e.target.value)
											}
										/>
									</FormControl>
								</Box>
								<Box>
									<FormControl
										alignItems='center'
										display={{ "md": "flex" }}>
										<FormLabel htmlFor='Shipped' mb='0'>
											Shipped
										</FormLabel>
										<Switch
											id='Shipped'
											value={"Shipped"}
											defaultChecked={
												order.status == "Shipped"
													? true
													: false
											}
											isChecked={
												status == "Shipped"
													? true
													: false
											}
											onChange={(e: any) =>
												setStatus(e.target.value)
											}
										/>
									</FormControl>
								</Box>
								<Button
									onClick={handleUpdateStatus}
									colorScheme='blue'
									size='sm'>
									update status
								</Button>
							</Stack>
						</CardBody>
					</Card>
				</Flex>

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
				<Center></Center>
			</Box>
		</>
	) : (
		<Loading />
	);
};

export default Order;
