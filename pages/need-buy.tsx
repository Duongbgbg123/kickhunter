import { NextSeo } from "next-seo";
import { useEffect, useState } from "react";
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
	Stack,
	InputGroup,
	Input,
	InputRightElement,
	useDisclosure,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerHeader,
	DrawerBody,
	CheckboxGroup,
	Checkbox,
	RangeSlider,
	RangeSliderTrack,
	RangeSliderFilledTrack,
	RangeSliderMark,
	RangeSliderThumb,
} from "@chakra-ui/react";
import { ImageModal } from "components/product/ImageModal";
import { useRouter } from "next/router";
import { BiFilterAlt, BiSearchAlt } from "react-icons/bi";
import { TfiViewListAlt } from "react-icons/tfi";
import {
	filterProducts,
	getAllBrands,
	getALlColors,
	searchingProducts,
} from "utils/processProducts";
import { MdGraphicEq } from "react-icons/md";
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
	const { isOpen, onOpen, onClose } = useDisclosure();

	const brands = getAllBrands(shoeData);
	const colors = getALlColors(shoeData);

	const [search, setSearch] = useState("");
	const [brandsSearch, setBrandsSearch] = useState<string[]>([]);
	const [sizeSearch, setSizeSearch] = useState([32, 45]);
	const [colorSearch, setColorSearch] = useState([...colors]);
	const [viewKey, setViewKey] = useState(1);

	const filteredProducts =
		!loading && !error
			? filterProducts(
					shoeData.filter(({ data: prod }: any) => prod.isMergency),
					brandsSearch as string[],
					colorSearch,
					sizeSearch
			  )
			: [];

	const searchedProducts = searchingProducts(shoeData, search);

	useEffect(() => {
		dispatch(getShoeData() as any);
	}, [dispatch]);

	return (
		<Flex alignItems='center' direction='column' padding={20}>
			<NextSeo title='Need Buy' />
			<NextSeo title='All Products' />
			<Box textAlign='center' marginBottom={10}>
				<Heading as='h1'>Hot Deal for you</Heading>
				<Text maxWidth={80}>All products we need to buy</Text>
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
				gridTemplateColumns={{
					lg: `repeat(${viewKey ? 2 : 5}, 1fr)`,
					md: `repeat(${viewKey ? 1 : 3}, 1fr)`,
				}}
				justifyItems='center'>
				{(
					filteredProducts ||
					shoeData.filter(({ data: prod }: any) => prod.isMergency)
				).map(({ data: shoe, productId }: any, key: number) =>
					viewKey ? (
						<GridItem
							maxW={335}
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
								width={"100%"}
								mt={2}
								onClick={() => {
									router.push(
										`/${shoe.category}/${productId}`
									);
								}}>
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
}

export default NeedBuy;
