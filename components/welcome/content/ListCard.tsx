import { Flex } from "@chakra-ui/react";
import { images } from "assets";
import Card from "./Card";

const ListCard = () => {
	return (
		<Flex
			width={"100%"}
			gap={"2.4rem"}
			gridGap={"2.4rem"}
			justifyContent={"center"}
			flexWrap={"wrap"}>
			<Card
				image={images.listtingImage}
				title='List'
				subTitle='List your size, quantity and price and get our real-time offers.'
				buttonTitle='List a product'
				to='/list'
			/>
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
				to='/products/all'
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
