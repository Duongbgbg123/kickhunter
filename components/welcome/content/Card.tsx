import { Button, Flex, Heading, Text, useColorMode } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

interface Props {
	image: string;
	title: string;
	subTitle: string;
	buttonTitle: string;
	to: string;
}

const Card = (props: Props) => {
	const { image, title, subTitle, buttonTitle, to } = props;
	const { colorMode } = useColorMode();
	const textColor = colorMode === "light" ? "gray.700" : "gray.200";

	return (
		<Flex
			maxWidth={"22rem"}
			gap={"1rem"}
			border={"1px solid #ccc"}
			padding={"2.4rem"}
			borderRadius={"7px"}
			marginBottom={"1.2rem"}
			position={"relative"}
			flexDirection={"column"}
			justifyContent={"space-between"}>
			<Image
				priority
				src={image}
				alt={title}
				style={{
					width: "100%",
					height: "12.4rem",
					objectFit: "cover",
					objectPosition: "center",
				}}
			/>
			<Heading
				as='h2'
				fontFamily={"'Space Grotesk', sans-serif"}
				color={textColor}>
				{title}
			</Heading>
			<Text color={textColor} fontWeight={400}>
				{subTitle}
			</Text>
			<Link href={to} as={to}>
				<Button
					fontFamily={'"Space Grotesk", sans-serif'}
					position={"relative"}
					fontWeight={400}
					border={"1px solid #666"}
					display={"flex"}
					flexDirection={"row"}
					alignItems={"center"}
					justifyContent={"center"}
					borderRadius={4}
					textAlign={"center"}
					lineHeight={1}
					transition={"background-color 0.2s linear 0s"}
					fontSize={"1em"}
					width={"inherit"}
					cursor={"pointer"}
					padding={"24px"}
					bg={"transparent"}
					_hover={{
						bg: "gray.100",
						color: "#000",
					}}>
					{buttonTitle}
				</Button>
			</Link>
		</Flex>
	);
};

export default Card;
