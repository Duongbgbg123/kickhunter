import { Heading, useColorMode } from "@chakra-ui/react";

const Title = () => {
	const { colorMode } = useColorMode();
	return (
		<Heading
			as='h1'
			textAlign={"center"}
			margin={"3.2rem auto"}
			fontSize={"3rem"}
			maxWidth={"48rem"}
			lineHeight={"3.1rem"}
			fontWeight={"400"}
			fontFamily={"'Space Grotesk', sans-serif"}
			color={colorMode === "light" ? "#080808" : "gray.200"}>
			Choose your preferred selling method:
		</Heading>
	);
};

export default Title;
