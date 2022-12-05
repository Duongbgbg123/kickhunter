import { NextSeo } from "next-seo";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getShoeData } from "redux/feature/home/actions";
import {
	Box,
	Flex,
	SimpleGrid,
	GridItem,
	Heading,
	Text,
} from "@chakra-ui/react";
import { ImageModal } from "components/product/ImageModal";
import { DescText } from "components/products/DescText";
import { AiOutlineStar } from "react-icons/ai";
function NeedBuy() {
	const dispatch = useDispatch();
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});

	const {
		loading,
		error,
		shoeData = [],
	} = useSelector((state: any) => state.homeReducer);

	console.log(shoeData);

	const filteredProducts =
		!loading && !error
			? shoeData.filter((item: any) => item.data.isMergency)
			: [];

	useEffect(() => {
		dispatch(getShoeData() as any);
	}, [dispatch]);

	console.log(filteredProducts);

	return (
		<Flex alignItems='center' direction='column' padding={20}>
			<NextSeo title='Need Buy' />
			<NextSeo title='All Products' />
			<Box textAlign='center' marginBottom={10}>
				<Heading as='h1'>Need Buy</Heading>
				<Text maxWidth={80}>All products we need...</Text>
			</Box>
			<SimpleGrid mt={5} spacing='40px' minChildWidth={250}>
				{filteredProducts.map(({ data: shoe }: any, key: number) => (
					<GridItem
						key={key}
						padding={5}
						background='#ffffff1c'
						borderRadius={10}
						flexDirection='column'
						w='100%'>
						<ImageModal img={shoe.image} />
						<Box>
							<Text
								textTransform='uppercase'
								fontWeight='bold'
								mt={4}>
								{shoe.name} ({shoe.category})
							</Text>
							<DescText
								custom={{
									overflow: "hidden",
									whiteSpace: "nowrap",
									width: "100%",
									textOverflow: "ellipsis",
								}}>
								{shoe.description}
							</DescText>
						</Box>
						<Flex
							alignItems='center'
							justifyContent='space-between'>
							<Text>Color: {shoe.color}</Text>
							<Flex>
								<Text>{formatter.format(shoe.price)}</Text>
								<Flex marginLeft={3}>
									<Text>{shoe.vote}</Text>
									<AiOutlineStar />
								</Flex>
							</Flex>
						</Flex>
						<Text>Size: {shoe.size.join()}</Text>
					</GridItem>
				))}
			</SimpleGrid>
		</Flex>
	);
}

export default NeedBuy;
