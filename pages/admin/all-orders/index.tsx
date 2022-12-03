import {
	Box,
	Center,
	Flex,
	Heading,
	Table,
	TableCaption,
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
import { db } from "../../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { useState } from "react";
import { FaTruck } from "react-icons/fa";
import { useRouter } from "next/router";
const AllOrders = ({ orders }: any) => {
	console.log(orders);
	const router = useRouter();
	const [ordersData, setOrdersData] = useState<[]>(orders);
	return (
		<>
			<Box width={"full"}>
				<Heading px={5}>All Orders</Heading>
				<Text p={"20px"}>Open an order to Change Order Status</Text>
				<Box padding={"20px"}>
					<TableContainer>
						<Table variant='striped' colorScheme='teal'>
							<TableCaption>
								Imperial to metric conversion factors
							</TableCaption>
							<Thead>
								<Tr>
									<Th fontSize={"sm"}>stt</Th>
									<Th fontSize={"sm"}>Date</Th>
									<Th fontSize={"sm"}>Order ID</Th>
									<Th fontSize={"sm"}>Amount</Th>
									<Th fontSize={"sm"}>Status</Th>
								</Tr>
							</Thead>
							{ordersData.map((item: any, index: any) => {
								return (
									<Tbody key={item.uid}>
										<Tr
											onClick={() =>
												router.push(
													`/admin/all-orders/${item.data.id}`
												)
											}>
											<Td>{index + 1}</Td>
											<Td>{item.data.date}</Td>
											<Td>{item.data.id}</Td>
											<Td>{item.data.price} VND</Td>
											<Td>
												<Flex>
													<Center>
														<Text
															color={
																item.data
																	.status ==
																"Ordered"
																	? "red"
																	: item.data
																			.status ==
																	  "Delivered"
																	? "blue"
																	: "yellow.400"
															}>
															{item.data.status}
														</Text>
													</Center>
													<Center px={"5px"}>
														<FaTruck
															color={
																item.data
																	.status ==
																"Ordered"
																	? "red"
																	: item.data
																			.status ==
																	  "Delivered"
																	? "blue"
																	: "yellow"
															}
															fontSize={"30px"}
														/>
													</Center>
												</Flex>
											</Td>
										</Tr>
									</Tbody>
								);
							})}
						</Table>
					</TableContainer>
				</Box>
			</Box>
		</>
	);
};

export async function getStaticProps() {
	let orders: any = [];
	const querySnapshot = await getDocs(collection(db, "orders"));
	querySnapshot.forEach((doc: any) => {
		orders.push({ uid: doc.id, data: doc.data() });
	});

	return {
		props: {
			orders,
		},
	};
}

export default AllOrders;
