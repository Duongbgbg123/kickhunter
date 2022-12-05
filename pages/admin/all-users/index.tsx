import {
	Heading,
	Switch,
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
	useToast,
} from "@chakra-ui/react";
import { db } from "../../../firebase/config";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Divider } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { updateAdmin } from "../../../firebase/upload";
const AllUsers = ({ users }: any) => {
	const [admin, setAdmin] = useState(false);
	const toast = useToast();
	const handleUpdateAdmin = (id: any) => {
		updateAdmin(id, admin, toast);
	};
	return (
		<>
			<Heading px={5}>Manage All Users</Heading>
			<Text p={"20px"}>switch to choose admin </Text>
			<TableContainer>
				<Table variant='striped' colorScheme='teal'>
					<TableCaption>
						Imperial to metric conversion factors
					</TableCaption>
					<Thead>
						<Tr>
							<Th>STT</Th>
							<Th>Email</Th>
							<Th>UserName</Th>
							<Th>Phone Number</Th>
							<Th>User ID</Th>
							<Th>Is Admin</Th>
						</Tr>
					</Thead>
					{users.map((item: any, index: number) => {
						return (
							<>
								<Tbody key={index}>
									<Tr>
										<Td>{index + 1}</Td>
										<Td>{item.data.email}</Td>
										<Td>{item.data.name}</Td>
										<Td>{item.data.phoneNumber}</Td>
										<Td>{item.uid}</Td>
										<Td>
											<Switch
												colorScheme='blue'
												size='md'
												defaultChecked={
													item.data.isAdmin
												}
												// isChecked={item.data.isAdmin}
												onChange={() => {
													setAdmin(!admin);
													handleUpdateAdmin(item.uid);
												}}
											/>
										</Td>
									</Tr>
								</Tbody>
								<Divider />
							</>
						);
					})}
				</Table>
			</TableContainer>
		</>
	);
};

export async function getStaticProps() {
	let users: any = [];
	const querySnapshot = await getDocs(collection(db, "users"));
	querySnapshot.forEach((doc: any) => {
		users.push({ uid: doc.id, data: doc.data() });
	});

	return {
		props: {
			users,
		},
	};
}

export default AllUsers;
