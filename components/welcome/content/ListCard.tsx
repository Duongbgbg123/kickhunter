import { Flex } from "@chakra-ui/react";
import { images } from "assets";
import Card from "./Card";

const ListCard = () => {
	return (
		<Flex
			width={"100%"}
			gap={"10rem"}
			gridGap={"10rem"}
			justifyContent={"center"}
			flexWrap={"wrap"}>
			<Card
				image={images.listtingImage}
				title='All Products'
				subTitle='List your size, quantity and price and get our real-time offers.'
				buttonTitle='See all products'
				to='/all-products'
			/>
			<Card
				image={images.listtingImage}
				title='Hot Deal'
				subTitle='List your size, quantity and price and get our real-time offers.'
				buttonTitle='See all hot deal '
				to='/need-buy'
			/>
		</Flex>
	);
};

export default ListCard;
