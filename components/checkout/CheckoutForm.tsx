import { Box, Flex, Input, Text } from "@chakra-ui/react";

export const CheckoutForm = ({ onChange }: any) => {
	return (
		<>
			<Box>
				<Text fontSize={"20px"} fontWeight={600} mb={"20px"}>
					Enter your name :
				</Text>

				<Flex flexDirection={"column"} gap={"20px"}>
					<Input
						onChange={onChange}
						type={"text"}
						name={"username"}
						placeholder={"Name*"}
					/>

					<Text fontSize={"20px"} fontWeight={600} mt={"30px"}>
						What is your contact information?
					</Text>
					<Input
						onChange={onChange}
						type={"email"}
						name={"email"}
						placeholder={"Email*"}
					/>
					<Input
						onChange={onChange}
						type={"number"}
						name={"mobile"}
						placeholder={"Mobile*"}
					/>
				</Flex>
			</Box>
		</>
	);
};
