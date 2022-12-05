import {
	Box,
	Button,
	Center,
	Flex,
	Grid,
	Spacer,
	Text,
	useColorMode,
	useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IoOptionsOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { getRequest } from "redux/feature/products/actions";
import { setToast } from "utils/extraFunctions";
import { LeftSideFilter } from "components/products/LeftSideFilter";
import { SortFilters } from "components/products/SortFilter";
import { setItemSession } from "utils/sessionStorage";
import { ProductDisplayBox } from "components/products/ProductDisplayBox";
import { Loading } from "components/Loading";
import { Error } from "components/Error";
import { NextSeo } from "next-seo";

const Products = () => {
	const router = useRouter();
	const { category } = router.query;
	// console.log(category);

	const { colorMode } = useColorMode();
	const [isFilter, setIsFilter] = useState(true);
	const { products, isLoading, isError } = useSelector(
		(state: any) => state.prodReducer
	);

	//   const path = getItemSession('');
	const dispatch = useDispatch();
	const toast = useToast();
	// const navigate = useNavigate();

	const resetFilter = () => {
		setIsFilter(!isFilter);
		dispatch(getRequest(category) as any);
		setToast(toast, "Filter Reset Successfully", "success", 2000);
	};
	const handleSingleProduct = (data: any) => {
		setItemSession("singleProduct", data);
		router.push(`/${category}/${data.id}`);
	};
	
	useEffect(() => {
		dispatch(getRequest(category) as any);
	}, [category, dispatch]);

	return (
		<>
			<NextSeo title='Sales' />
			<Flex
				direction={["column", "column", "row", "row", "row"]}
				h={["100px", "100px", "60px", "60px", "60px"]}
				position={"sticky"}
				top={"0px"}
				bg={colorMode === "light" ? "white" : "#1a202c"}
				zIndex={1}>
				<Center textAlign={"start"}>
					<Text
						w={"100%"}
						ml={["20px", "20px", "30px", "40px", "50px"]}
						fontSize={["20px", "25px"]}
						fontWeight={500}>
						{category === "adidas"
							? "Adidas Products"
							: category === "nike"
							? "Nike Products"
							: category === "Jodan"
							? "Jodan Products"
							: "All Products"}{" "}
						[{products.length}]
					</Text>
				</Center>
				<Spacer />
				<Center>
					<Flex
						gap={["4px"]}
						w={"100%"}
						my={["10px", "10px", "0px", "0px", "0px"]}
						px={["8px", "8px", "20px", "20px", "20px"]}>
						<Button
							onClick={() => {
								setIsFilter(!isFilter);
							}}
							fontSize={["13px", "16px"]}
							rightIcon={<IoOptionsOutline />}>
							{isFilter ? "Hide Filter" : "Show Filter"}
						</Button>
						<Spacer />
						<Button
							onClick={resetFilter}
							fontSize={["13px", "16px"]}>
							Reset Filter
						</Button>
						<Spacer />
						<SortFilters />
					</Flex>
				</Center>
			</Flex>

			<Grid
				gap={["20px", "20px", "2%", "2%", "2%"]}
				templateColumns={[
					"100%",
					"100%",
					isFilter ? "32% 66%" : "100%",
					isFilter ? "28% 70%" : "100%",
					isFilter ? "20% 78%" : "100%",
				]}
				justifyContent={"center"}>
				{isFilter && (
					<Box
						minH={["120px", "120px", "600px", "600px", "600px"]}
						maxH={["900px", "600px"]}
						position={[null, null, "sticky", "sticky", "sticky"]}
						top={["0px", "70px"]}
						overflowY={"scroll"}
						className='scroll'
						zIndex={0}
						mt={["10px", "10px", "20px", "20px", "20px"]}>
						<LeftSideFilter />
					</Box>
				)}

				<Box minH={"400px"}>
					{isLoading ? (
						<Loading />
					) : isError ? (
						<Error />
					) : (
						<Grid
							gap={[2, 4]}
							p={["10px", "10px", "20px", "20px", "20px"]}
							templateColumns={[
								"repeat(2, 1fr)",
								"repeat(2, 1fr)",
								"repeat(2, 1fr)",
								"repeat(2, 1fr)",
								"repeat(3, 1fr)",
							]}>
							{products.map((product: any, index: any) => {
								return (
									<ProductDisplayBox
										{...product}
										key={index}
										onClick={() => {
											handleSingleProduct(product);
										}}
									/>
								);
							})}
						</Grid>
					)}
				</Box>
			</Grid>
		</>
	);
};

export default Products;
