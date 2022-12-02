// @eslint-skip
import { NextPage } from "next";
import { useEffect } from "react";
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
	Heading,
	Input,
	InputGroup,
	InputRightElement,
	Stack,
	Text,
	useCheckboxGroup,
	useDisclosure,
} from "@chakra-ui/react";
import { BiSearchAlt, BiFilterAlt } from "react-icons/bi";
import { TfiViewListAlt } from "react-icons/tfi";
import { ImageModal } from "components/product/ImageModal";
import { DescText } from "components/products/DescText";
import { filterProductsByBrands, getAllBrands } from "utils/processProducts";

const HomePage: NextPage = () => {
	const dispatch = useDispatch();
	const {
		loading,
		error,
		shoeData = [],
	} = useSelector((state: any) => state.homeReducer);

	const { isOpen, onOpen, onClose } = useDisclosure();
	const { getCheckboxProps, value: selectedBrands } = useCheckboxGroup({
		defaultValue: [],
	});

	const brands = getAllBrands(shoeData);

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
			<Stack direction='row' spacing={4} marginBottom={10}>
				<Button width={180} leftIcon={<BiFilterAlt />} onClick={onOpen}>
					<Text textTransform='uppercase' fontWeight='bold'>
						filters
					</Text>
				</Button>
				<InputGroup>
					<Input placeholder='Branch, Model, SKU' />
					<InputRightElement>
						<BiSearchAlt />
					</InputRightElement>
				</InputGroup>
				<Button width={180} rightIcon={<TfiViewListAlt />}>
					<Text textTransform='uppercase' fontWeight='bold'>
						view
					</Text>
				</Button>
			</Stack>
			<Drawer placement='right' onClose={onClose} isOpen={isOpen}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerHeader borderBottomWidth='1px'>
						FILTER BY BRANDS
					</DrawerHeader>
					<DrawerBody>
						<CheckboxGroup
							colorScheme='green'
							value={selectedBrands}>
							<Stack spacing={2} direction='column'>
								{brands.map((brand) => (
									<Checkbox
										textTransform='capitalize'
										value={brand}
										key={brand}
										{...getCheckboxProps({ value: brand })}>
										{brand}
									</Checkbox>
								))}
							</Stack>
						</CheckboxGroup>
					</DrawerBody>
				</DrawerContent>
			</Drawer>
			<Flex
				gap={10}
				flexWrap='wrap'
				justifyContent='center'
				alignItems='flex-start'>
				{(
					filterProductsByBrands(
						shoeData,
						selectedBrands as string[]
					) ?? shoeData
				).map((shoe: any, key: number) => (
					<Flex
						key={key}
						padding={5}
						background='#ffffff1c'
						borderRadius={10}
						flexDirection='column'
						gap={5}
						maxWidth={350}>
						<ImageModal img={shoe.image} />
						<Box>
							<Text textTransform='uppercase' fontWeight='bold'>
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
						<Button>Buy!</Button>
					</Flex>
				))}
			</Flex>
		</Flex>
	);
};
export default HomePage;
