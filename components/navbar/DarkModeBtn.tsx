import { Button, Icon, useColorMode } from "@chakra-ui/react";
import { FaSun, FaMoon } from "react-icons/fa";

export const DarkModeBtn = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Button
			w='20px'
			h='32px'
			ml={"10px"}
			cursor={"pointer"}
			onClick={toggleColorMode}>
			<Icon
				w={"15px"}
				h={"15px"}
				as={colorMode === "dark" ? FaSun : FaMoon}
			/>
		</Button>
	);
};
