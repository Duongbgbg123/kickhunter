import { Center } from "@chakra-ui/react";
import ListCard from "./ListCard";
import Title from "./Title";

const Content = () => {
	return (
		<Center padding={"7rem 12rem"} flexDirection={"column"}>
			<Title />
			<ListCard />
		</Center>
	);
};

export default Content;
