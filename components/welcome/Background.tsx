import { Box, useColorMode } from "@chakra-ui/react";
import { ReactNode } from "react";

type Props = {
	children: ReactNode;
	reversedColor?: boolean;
};

const Background = (props: Props) => {
	const { children, reversedColor = false } = props;
	const { colorMode } = useColorMode();
	const bgColor = reversedColor
		? colorMode === "light"
			? "gray.900"
			: "gray.100"
		: colorMode === "light"
		? "gray.100"
		: "gray.900";
	return (
		<Box padding={"9.2rem"} bg={bgColor}>
			{children}
		</Box>
	);
};

export default Background;
