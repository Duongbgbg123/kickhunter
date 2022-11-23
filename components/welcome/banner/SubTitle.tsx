import { Box, ListItem, OrderedList, Text } from "@chakra-ui/react";

const SubTitle = () => {
	return (
		<OrderedList
			color={"gray.100"}
			marginInlineStart={0}
			display={"flex"}
			flexDirection={"column"}>
			<Text paddingBottom={"1rem"} paddingTop={"2rem"}>
				Sell your new and authentic sneakers and limited products
				safely:
			</Text>
			<Box paddingBottom={"1rem"} marginLeft={"2rem"}>
				<ListItem width={"100%"}>3 intuitive selling methods</ListItem>
			</Box>
			<Box marginLeft={"2rem"} paddingBottom={"1rem"}>
				<ListItem width={"100%"}>
					Free shipping for all your products
				</ListItem>
			</Box>
			<Box marginLeft={"2rem"}>
				<ListItem>Payment in 48 hours</ListItem>
			</Box>
		</OrderedList>
	);
};

export default SubTitle;
