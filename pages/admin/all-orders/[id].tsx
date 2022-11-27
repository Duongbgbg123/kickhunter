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
import { IoMdArrowRoundBack } from "react-icons/io";
const Order = () => {
	return (
		<>
			<Box width={"full"}>
				<IoMdArrowRoundBack fontSize={"30px"} />
				<Heading pb={10} textAlign={"center"}>
					Order Detail
				</Heading>
				<Center>
					<VStack alignItems={"start"} gap={5}>
						<Text> Order ID : 45645645645645645</Text>
						<Text> Order Amount : 45645645645645645</Text>
						<Text> Order Status : 45645645645645645</Text>
						<Text> Order User : 45645645645645645</Text>
						<Text> Shipping Address : 45645645645645645</Text>
						<Text> City : 45645645645645645</Text>
					</VStack>
				</Center>

				<TableContainer pt={10}>
					<Table size='sm'>
						<Thead>
							<Tr>
								<Th>Stt</Th>
								<Th>Product</Th>
								<Th>Order ID</Th>
								<Th>Price</Th>
								<Th>Quantity</Th>
							</Tr>
						</Thead>
						<Tbody>
							<Tr>
								<Td>1</Td>
								<Td>
									<Image
										src={
											"https://firebasestorage.googleapis.com/v0/b/shoes-shop-b8ebd.appspot.com/o/11.webp?alt=media&token=e920d2ed-5ead-4376-8dcf-4afba384869e"
										}
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
								<Td>4564564546</Td>
								<Td>$1200</Td>
								<Td>2</Td>
							</Tr>
							<Tr>
								<Td>1</Td>
								<Td>
									<Image
										src={
											"https://firebasestorage.googleapis.com/v0/b/shoes-shop-b8ebd.appspot.com/o/11.webp?alt=media&token=e920d2ed-5ead-4376-8dcf-4afba384869e"
										}
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
								<Td>4564564546</Td>
								<Td>$1200</Td>
								<Td>2</Td>
							</Tr>
							<Tr>
								<Td>1</Td>
								<Td>
									<Image
										src={
											"https://firebasestorage.googleapis.com/v0/b/shoes-shop-b8ebd.appspot.com/o/11.webp?alt=media&token=e920d2ed-5ead-4376-8dcf-4afba384869e"
										}
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
								<Td>4564564546</Td>
								<Td>$1200</Td>
								<Td>2</Td>
							</Tr>
						</Tbody>
					</Table>
				</TableContainer>
			</Box>
		</>
	);
};

export default Order;
