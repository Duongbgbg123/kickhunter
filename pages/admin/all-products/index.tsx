import {
	Box,
	Center,
	Flex,
	flexbox,
	Heading,
	Show,
	Spacer,
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
	Text,
	Th,
	Thead,
	Tr,
	useToast,
	VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import { db } from "../../../firebase/config";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import Link from "next/link";
import { setToast } from "utils/extraFunctions";
import { useEffect, useState } from "react";
const AllProduct = ({ products }: any) => {
	const myLoader = ({ src }: any) => {
		return src;
	};
	const toast = useToast();
	const [updateProduct, setUpdateProduct] = useState(products);

	const handleDelete = async (id: string, indexPro: number) => {
		try {
			const filterProduct = products.filter((item: any, index: any) => {
				return indexPro != index;
			});
			setUpdateProduct(filterProduct);
			await deleteDoc(doc(db, "products", id));
			setToast(toast, "Delete Successful...!!", "success");
			// window.location.reload();
		} catch (e) {
			setToast(toast, "Delete Failed!!", "error");
		}
	};

	return (
		<div>
			<Box width={"full"}>
				<Heading px={5}>All Products</Heading>
				<Text p={"20px"}>{products.length} Products Found</Text>
				<Box padding={"20px"}>
					<TableContainer>
						<Table variant='striped' colorScheme='teal'>
							<TableCaption>
								Imperial to metric conversion factors
							</TableCaption>
							<Thead>
								<Tr>
									<Th fontSize={"sm"}>stt</Th>
									<Th fontSize={"sm"}>Image</Th>
									<Th fontSize={"sm"}>Name </Th>
									<Th fontSize={"sm"}>Category</Th>
									<Th fontSize={"sm"}>Price</Th>
									<Th fontSize={"sm"}>Edit</Th>
									<Th fontSize={"sm"}>Delete</Th>
								</Tr>
							</Thead>
							{updateProduct.map((item: any, index: number) => {
								return (
									<Tbody key={item.uid}>
										<Tr>
											<Td>{index + 1}</Td>
											<Td>
												<Image
													loader={myLoader}
													src={item.data.image[0]}
													alt='photo'
													width={100}
													height={100}
													unoptimized={true}
												/>
											</Td>
											<Td>{item.data.name}</Td>
											<Td>{item.data.category}</Td>
											<Td>{item.data.price}</Td>
											<Td>
												<Link
													href={`/admin/${item.data.id}`}>
													<BiEdit fontSize={30} />
												</Link>
											</Td>
											<Td>
												<MdDelete
													onClick={() =>
														handleDelete(
															item.uid,
															index
														)
													}
													fontSize={30}
												/>
											</Td>
										</Tr>
									</Tbody>
								);
							})}
						</Table>
					</TableContainer>
				</Box>
			</Box>
		</div>
	);
};

export async function getStaticProps() {
	let products: any = [];
	const querySnapshot = await getDocs(collection(db, "products"));
	querySnapshot.forEach((doc: any) => {
		products.push({ uid: doc.id, data: doc.data() });
	});

	return {
		props: {
			products,
		},
	};
}

export default AllProduct;
