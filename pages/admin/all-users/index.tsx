import {
	Table,
	TableCaption,
	TableContainer,
	Tbody,
	Td,
	Tfoot,
	Th,
	Thead,
	Tr,
} from "@chakra-ui/react";
import { db } from "../../../firebase/config";
import { collection, getDocs } from "firebase/firestore";
import { Divider } from "@chakra-ui/react";

const AllUsers = ({ users }: any) => {
	return (
		<>
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
						</Tr>
					</Thead>
					{users.map((item: any, index: number) => {
						return (
							<>
								<Tbody key={item.uid}>
									<Tr>
										<Td>{index + 1}</Td>
										<Td>{item.data.email}</Td>
										<Td>{item.data.name}</Td>
										<Td>{item.data.phoneNumber}</Td>
										<Td>{item.uid}</Td>
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
