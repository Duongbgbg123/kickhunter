import { NextPage } from "next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Error } from "components/Error";
import { Loading } from "components/Loading";
import { getShoeData } from "redux/feature/home/actions";
import { NextSeo } from "next-seo";
import {
	Box,
	Button,
	Checkbox,
	CheckboxGroup,
	Drawer,
	DrawerBody,
	DrawerContent,
	DrawerHeader,
	DrawerOverlay,
	Flex,
	GridItem,
	Heading,
	Input,
	InputGroup,
	InputRightElement,
	RangeSlider,
	RangeSliderFilledTrack,
	RangeSliderMark,
	RangeSliderThumb,
	RangeSliderTrack,
	SimpleGrid,
	Stack,
	Text,
	useDisclosure,
	Image,
	Spacer,
	Center,
	useToast,
} from "@chakra-ui/react";
import { BiSearchAlt, BiFilterAlt } from "react-icons/bi";
import { TfiViewListAlt } from "react-icons/tfi";
import { ImageModal } from "components/product/ImageModal";
import { DescText } from "components/products/DescText";
import {
	filterProducts,
	getAllBrands,
	getALlColors,
	searchingProducts,
} from "utils/processProducts";
import { AiOutlineStar } from "react-icons/ai";
import { MdGraphicEq } from "react-icons/md";
import { useRouter } from "next/router";
import { setItemSession } from "utils/sessionStorage";
import { addToCartRequest } from "redux/feature/cart/actions";
// import Image from "next/image";

const HomePage: NextPage = () => {
	const formatter = new Intl.NumberFormat("en-US", {
		style: "currency",
		currency: "USD",
	});
	const { token } = useSelector((state: any) => state.authReducer);
	const dispatch = useDispatch();

	const router = useRouter();

	const {
		loading,
		error,
		shoeData = [],
	} = useSelector((state: any) => state.homeReducer);

	const brands = getAllBrands(shoeData);
	const colors = getALlColors(shoeData);

	const { isOpen, onOpen, onClose } = useDisclosure();

	const [brandsSearch, setBrandsSearch] = useState<string[]>([]);
	const [sizeSearch, setSizeSearch] = useState([32, 45]);
	const [colorSearch, setColorSearch] = useState([...colors]);
	const [search, setSearch] = useState("");
	const [viewKey, setViewKey] = useState(1);

	const filteredProducts = filterProducts(
		shoeData,
		brandsSearch as string[],
		colorSearch,
		sizeSearch
	);
	const toast = useToast();
	const searchedProducts = searchingProducts(shoeData, search);

	const handleCheckout = (payload: any) => {
		const payloadData = { ...payload, quantity: 1 };

		dispatch(addToCartRequest(payloadData, toast) as any);
		router.push("/checkout");
	};

	useEffect(() => {
		dispatch(getShoeData() as any);
	}, []);

	return loading ? (
		<Loading />
	) : error ? (
		<Error />
	) : (
		<Flex alignItems='center' direction='column' padding={20}>
			<NextSeo title='All Products' />
			<Box textAlign='center' marginBottom={10}>
				<Heading as='h1'>List a product</Heading>
				<Text maxWidth={80}>
					Search here for all products you can sell, and those
					we&apos;re currently looking for.
				</Text>
			</Box>
			<Stack
				alignItems={"center"}
				direction={["column", "row"]}
				spacing={4}
				marginBottom={10}>
				<Button width={180} leftIcon={<BiFilterAlt />} onClick={onOpen}>
					<Text textTransform='uppercase' fontWeight='bold'>
						filters
					</Text>
				</Button>
				<InputGroup>
					<Input
						placeholder='Search for a product...'
						onChange={(evt) => setSearch(evt.target.value)}
					/>
					<InputRightElement>
						<BiSearchAlt />
					</InputRightElement>
				</InputGroup>
				<Button
					width={180}
					rightIcon={<TfiViewListAlt />}
					onClick={() => setViewKey(viewKey ? 0 : 1)}>
					<Text textTransform='uppercase' fontWeight='bold'>
						view
					</Text>
				</Button>
			</Stack>
			{(searchedProducts || []).length == 0 && search.length > 0 && (
				<Text>Not found any products you searching...</Text>
			)}
			<Drawer placement='right' onClose={onClose} isOpen={isOpen}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerHeader borderBottomWidth='1px'>FILTERS</DrawerHeader>
					<DrawerBody>
						<Flex mt={2} justifyContent='space-between'>
							<Box>
								<Text>BRANDS</Text>
								<CheckboxGroup
									colorScheme='green'
									value={brandsSearch}
									onChange={(value) =>
										setBrandsSearch(value as any)
									}>
									<Stack spacing={2} direction='column'>
										{brands.map((brand) => (
											<Checkbox
												textTransform='capitalize'
												value={brand}
												key={brand}>
												{brand}
											</Checkbox>
										))}
									</Stack>
								</CheckboxGroup>
							</Box>
							<Box>
								<Text>COLORS</Text>
								<CheckboxGroup
									defaultValue={[32, 45]}
									colorScheme='green'
									onChange={(value) =>
										setColorSearch(value as any)
									}
									value={colorSearch}>
									<Stack spacing={2} direction='column'>
										{colors.map((color) => (
											<Checkbox
												textTransform='capitalize'
												value={color}
												key={color}>
												{color}
											</Checkbox>
										))}
									</Stack>
								</CheckboxGroup>
							</Box>
						</Flex>
						<Box mt={6}>
							<Text>SIZE</Text>
							<RangeSlider
								aria-label={["min", "max"]}
								defaultValue={[32, 45]}
								min={32}
								max={45}
								onChange={(value) => setSizeSearch(value)}>
								<RangeSliderTrack bg='red.100'>
									<RangeSliderFilledTrack bg='tomato' />
								</RangeSliderTrack>
								{Array.from({ length: 45 - 32 + 1 }, (_, i) => (
									<RangeSliderMark
										key={i}
										value={i + 32}
										mt='4'
										ml='-2.5'
										fontSize='sm'>
										{i + 32}
									</RangeSliderMark>
								))}
								<RangeSliderThumb boxSize={6} index={0}>
									<Box color='tomato' as={MdGraphicEq} />
								</RangeSliderThumb>
								<RangeSliderThumb boxSize={6} index={1}>
									<Box color='tomato' as={MdGraphicEq} />
								</RangeSliderThumb>
							</RangeSlider>
						</Box>
						<Text mt={8}>
							Found {(filteredProducts || []).length} products
						</Text>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
			<SimpleGrid
				mt={5}
				spacing={`${viewKey ? 40 : 20}px`}
				minChildWidth={250}
				gridTemplateColumns={{
					lg: `repeat(${viewKey ? 2 : 5}, 1fr)`,
					md: `repeat(${viewKey ? 2 : 3}, 1fr)`,
				}}
				justifyItems='center'>
				{(searchedProducts || filteredProducts || shoeData).map(
					({ data: shoe, productId }: any) =>
						viewKey ? (
							<GridItem
								maxW={290}
								padding={5}
								background='#ffffff1c'
								borderRadius={10}
								flexDirection='column'
								w='100%'
								key={productId}
								gap={5}>
								<ImageModal img={shoe.image} />

								<Box mt={2}>
									<Text
										textOverflow={"ellipsis"}
										fontSize={"%"}
										textTransform='uppercase'
										fontWeight='bold'>
										{shoe.name} ({shoe.category})
									</Text>
								</Box>
								<Flex
									alignItems='center'
									justifyContent='space-between'></Flex>
								<DescText
									fontSize={"%"}
									custom={{
										overflow: "hidden",
										whiteSpace: "nowrap",
										width: "100%",
										textOverflow: "ellipsis",
									}}>
									Size: {shoe.size.join()}
								</DescText>
								<Button
									mt={4}
									width={"100%"}
									onClick={() => handleCheckout(shoe)}>
									Sell for us!
								</Button>
							</GridItem>
						) : (
							<ImageModal img={shoe.image} key={productId} />
						)
				)}
			</SimpleGrid>
		</Flex>
	);
};

export default HomePage;
