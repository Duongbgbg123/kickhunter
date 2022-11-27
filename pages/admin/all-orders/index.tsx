import {
	Box,
	Center,
	Flex,
	Heading,
	SimpleGrid,
	Spacer,
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
import { FaTruck } from "react-icons/fa";
const AllOrders = () => {
	return (
		<>
			<Box width={"full"}>
				<Heading>All Orders</Heading>
				<Text py={"20px"}>Open an order to Change Order Status</Text>
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
							<Tbody>
								<Tr>
									<Td>1</Td>
									<Td>2022-11-6</Td>
									<Td>
										723cd41b-d2d3-4571-8e3d-a15559d695ef
									</Td>
									<Td>$2000</Td>
									<Td>
										<Flex>
											<Center>Delivered</Center>
											<Center px={"5px"}>
												<FaTruck fontSize={"30px"} />
											</Center>
										</Flex>
									</Td>
								</Tr>
								<Tr>
									<Td>1</Td>
									<Td>2022-11-6</Td>
									<Td>
										723cd41b-d2d3-4571-8e3d-a15559d695ef
									</Td>
									<Td>$2000</Td>
									<Td>
										<Flex>
											<Center>Delivered</Center>
											<Center px={"5px"}>
												<FaTruck fontSize={"30px"} />
											</Center>
										</Flex>
									</Td>
								</Tr>
								<Tr>
									<Td>1</Td>
									<Td>2022-11-6</Td>
									<Td>
										723cd41b-d2d3-4571-8e3d-a15559d695ef
									</Td>
									<Td>$2000</Td>
									<Td>
										<Flex>
											<Center>Delivered</Center>
											<Center px={"5px"}>
												<FaTruck fontSize={"30px"} />
											</Center>
										</Flex>
									</Td>
								</Tr>
								<Tr>
									<Td>1</Td>
									<Td>2022-11-6</Td>
									<Td>
										723cd41b-d2d3-4571-8e3d-a15559d695ef
									</Td>
									<Td>$2000</Td>
									<Td>
										<Flex>
											<Center>Delivered</Center>
											<Center px={"5px"}>
												<FaTruck fontSize={"30px"} />
											</Center>
										</Flex>
									</Td>
								</Tr>
								<Tr>
									<Td>1</Td>
									<Td>2022-11-6</Td>
									<Td>
										723cd41b-d2d3-4571-8e3d-a15559d695ef
									</Td>
									<Td>$2000</Td>
									<Td>
										<Flex>
											<Center>Delivered</Center>
											<Center px={"5px"}>
												<FaTruck fontSize={"30px"} />
											</Center>
										</Flex>
									</Td>
								</Tr>
								<Tr>
									<Td>1</Td>
									<Td>2022-11-6</Td>
									<Td>
										723cd41b-d2d3-4571-8e3d-a15559d695ef
									</Td>
									<Td>$2000</Td>
									<Td>
										<Flex>
											<Center>Delivered</Center>
											<Center px={"5px"}>
												<FaTruck fontSize={"30px"} />
											</Center>
										</Flex>
									</Td>
								</Tr>
							</Tbody>
						</Table>
					</TableContainer>
				</Box>
			</Box>
		</>
	);
};

export default AllOrders;
