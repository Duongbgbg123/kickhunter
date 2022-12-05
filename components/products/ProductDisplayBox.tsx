import { Box, Flex, Image, Spacer, Text } from "@chakra-ui/react";
import { AiOutlineStar } from "react-icons/ai";
import { numberWithCommas, shortString } from "../../utils/extraFunctions";
import { DescText, PriceText } from "./DescText";

export const ProductDisplayBox = ({
	name,
	color,
	description,
	image,
	price,
	size,
	vote,
	onClick,
}: any) => {
	return (
		<>
			<Flex
				onClick={onClick}
				flexDirection={"column"}
				cursor='pointer'
				mb={"10px"}>
				<Box overflow={"hidden"}>
<<<<<<< HEAD
					<Image
						className='imgAnimation'
						src={image[0]}
						alt='photo'
					/>
=======
					<Image className='imgAnimation' src={image[0]} />
>>>>>>> b6b6a880f1b85534e7fe7808d913c572a65b576c
				</Box>
				<Box>
					<Flex justifyItems={"center"} mt={"10px"}>
						<Text
							fontSize={["13px", "15px", "17px", "17px", "18px"]}
							fontWeight={600}>
							{shortString(name)}
						</Text>
						<Spacer />
						<Box
							fontSize={["13px", "15px", "17px", "17px", "18px"]}
							mr={"3px"}
							mt={"4px"}>
							<AiOutlineStar />
						</Box>
						<Text
							fontSize={["13px", "15px", "17px", "17px", "18px"]}>
							{vote}
						</Text>
					</Flex>

					<DescText>{shortString(description, 20)}</DescText>
					<DescText>{size.join(", ")}</DescText>
<<<<<<< HEAD
					<DescText> {color} Colour</DescText>
=======
					<DescText> {color} Color</DescText>
>>>>>>> b6b6a880f1b85534e7fe7808d913c572a65b576c
					<PriceText>₹{numberWithCommas(price)}.00</PriceText>
				</Box>
			</Flex>
		</>
	);
};
