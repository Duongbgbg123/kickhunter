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
				image={images.consignmentImage}
				title='Consign'
				subTitle='No more waiting for offers : book your slot and ship your product to us.'
				buttonTitle='Start a consignment'
				to='/cosign'
			/>
			<Card
				image={images.directImage}
				title='Instant sales'
				subTitle='Get our best offers offers and sell your product in a blink of an eye.'
				buttonTitle='See offers'
				to='/sales'
			/>
			<Card
				image={images.listtingImage}
				title='All Products'
				subTitle='List your size, quantity and price and get our real-time offers.'
				buttonTitle='See all products'
				to='/all-products'
			/>
			<Card
				image={images.listtingImage}
				title='Hot buys'
				subTitle='List your size, quantity and price and get our real-time offers.'
				buttonTitle='Check hot buys'
				to='/hot-buys'
			/>
		</Flex>
	);
};

export default ListCard;
