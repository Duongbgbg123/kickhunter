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
	Button,
} from "@chakra-ui/react";
import { ImageModal } from "components/product/ImageModal";
import { useRouter } from "next/router";
function NeedBuy() {
	const dispatch = useDispatch();
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});

	const router = useRouter();

	const {
		loading,
		error,
		shoeData = [],
	} = useSelector((state: any) => state.homeReducer);

	const filteredProducts =
		!loading && !error
			? shoeData.filter((item: any) => item.data.isMergency)
			: [];

	useEffect(() => {
		dispatch(getShoeData() as any);
	}, [dispatch]);

	return (
		<Flex alignItems='center' direction='column' padding={20}>
			<NextSeo title='Need Buy' />
			<NextSeo title='All Products' />
			<Box textAlign='center' marginBottom={10}>
				<Heading as='h1'>Need Buy</Heading>
				<Text maxWidth={80}>All products we need...</Text>
			</Box>
			<SimpleGrid mt={5} spacing='40px' minChildWidth={250}>
				{filteredProducts.map(
					({ data: shoe, productId }: any, key: number) => (
						<GridItem
							key={key}
							padding={5}
							background='#ffffff1c'
							borderRadius={10}
							flexDirection='column'
							w='100%'>
							<ImageModal img={shoe.image} />
							<Box mt={2}>
								<Text
									textTransform='uppercase'
									fontWeight='bold'>
									{shoe.name} ({shoe.category})
								</Text>
							</Box>
							<Flex
								justifyContent='space-between'
								alignItems='center'>
								<Flex
									mt={1}
									alignItems='center'
									justifyContent='space-between'>
									<Text>Color: {shoe.color}</Text>
								</Flex>
								<Text>{formatter.format(shoe.price)}</Text>
							</Flex>
							<Button
								mt={2}
								onClick={() => {
									router.push(
										`/${shoe.category}/${productId}`
									);
								}}>
								Sell for us!
							</Button>
						</GridItem>
					)
				)}
			</SimpleGrid>
		</Flex>
	);
}

export default NeedBuy;
