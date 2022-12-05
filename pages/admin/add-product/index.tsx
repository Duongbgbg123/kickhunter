import {
	Accordion,
	FormControl,
	FormHelperText,
	FormLabel,
	HStack,
	Input,
	Radio,
	RadioGroup,
	Select,
	Textarea,
	VStack,
	Wrap,
	useToast,
	SimpleGrid,
	Spacer,
	Box,
	Center,
	Heading,
	Text,
} from "@chakra-ui/react";
import { v4 } from "uuid";
import { addProduct, upload } from "../../../firebase/upload";
import { FilterSizeComponent } from "components/admin/FilterSizeComponent";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { NewButton } from "components/product/NewButton";
const AddProduct = () => {
	const init: any = {
		Size: {
			EU32: false,
			EU33: false,
			EU34: false,
			EU35: false,
			EU36: false,
			EU37: false,
			EU38: false,
			EU39: false,
			EU40: false,
			EU41: false,
			EU42: false,
			EU43: false,
		},
		Colour: {
			Black: false,
			White: false,
			Green: false,
			Red: false,
			Mix: false,
		},
	};
	// const { Size, Colour } = init;

	const toast = useToast();
	let [value, setValue] = React.useState("");
	const [allImage, setAllImages] = useState([]);
	const [name, setName] = useState("");
	const [category, setCategory] = useState("nike");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState<number>();
	const [manageFilter, setManageFilter] = useState(init);
	const [emergency, setEmergency] = useState("0");
	const [color, setColor] = useState("white");
	const { Size, Colour } = manageFilter;

	const uploadAllImageProduct = (images: any) => {
		upload(images, setAllImages, toast);
	};
	const handleFilterChange = ({ target: { name, value, checked } }: any) => {
		setManageFilter({
			...manageFilter,
			[name]: {
				...manageFilter[name],
				[value]: checked,
			},
		});
	};
	const filteredSize = Object.keys(Size).filter((key: any, index) => {
		return Size[key] == true;
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const newProduct: any = {
			id: v4(),
			name,
			price,
			category,
			description,
			image: allImage,
			color: color,
			size: filteredSize,
			isMergency: emergency == "0" ? false : true,
			vote: 5,
		};
		addProduct(newProduct, toast);
		console.log(newProduct);

		setName("");
		setCategory("");
		setDescription("");
		setPrice(undefined);
		setEmergency("0");
		setManageFilter(init);
		setAllImages([]);
	};

	return (
		<div>
			<VStack w={["95%", "95%", "85%", "85%", "85%", "85%"]} gap={"20px"}>
				<Heading textAlign={"start"}>Add Product</Heading>
				<Text>Add New Products</Text>
				<form onSubmit={(e) => handleSubmit(e)}>
					<FormControl padding={"3%"}>
						<FormLabel>Name product :</FormLabel>
						<Input
							placeholder='Name Product'
							type='text'
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>
					</FormControl>
					<FormControl padding={"3%"}>
						<FormLabel>Price :</FormLabel>
						<Input
							placeholder='Price'
							type='number'
							value={price}
							onChange={(e) => setPrice(Number(e.target.value))}
						/>
					</FormControl>
					<FormControl padding={"3%"} as='fieldset'>
						<FormLabel as='legend'>
							Choose category of shoe
						</FormLabel>
						<RadioGroup
							defaultValue='adidas'
							onChange={setCategory}
							value={category}>
							<Wrap spacing='24px'>
								<Radio value='adidas'>Adidas</Radio>
								<Radio value='air jordan'>Air Jordan</Radio>
								<Radio value='alexander mc queen'>
									Alexander Mc Queen
								</Radio>
								<Radio value='asics'>ASICS</Radio>
								<Radio value='autry'>Autry</Radio>
								<Radio value='alex arigato'>Alex Arigato</Radio>
								<Radio value='balenciaga'>Balenciaga</Radio>
								<Radio value='bape'>Bape</Radio>
								<Radio value='converse'>Converse</Radio>
							</Wrap>
						</RadioGroup>
						<FormHelperText>Select only one.</FormHelperText>
					</FormControl>
					<FormControl padding={"3%"}>
						<FormLabel>Choose Size of shoes</FormLabel>
						<FilterSizeComponent
							// apply={handleFilterApply}
							change={handleFilterChange}
							title={"Size"}
							item={[
								"EU35",
								"EU36",
								"EU37",
								"EU38",
								"EU39",
								"EU40",
								"EU41",
								"EU42",
								"EU43",
							]}
						/>
					</FormControl>
					<FormControl padding={"3%"}>
						<FormLabel>Choose Color of shoes</FormLabel>
						<RadioGroup
							defaultValue='white'
							onChange={setColor}
							value={color}>
							<Wrap spacing='24px'>
								<Radio value='black'>Black</Radio>
								<Radio value='white'>White</Radio>
								<Radio value='green'>Green</Radio>
								<Radio value='red'>Red</Radio>
								<Radio value='mix'>mix</Radio>
							</Wrap>
						</RadioGroup>
					</FormControl>
					<FormControl padding={"3%"}>
						<FormLabel>Description</FormLabel>
						<Textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							placeholder='Here is a sample placeholder'
							size='sm'
						/>
					</FormControl>
					<FormControl padding={"3%"}>
						<FormLabel>Is Emergency :</FormLabel>
						<Select
							width={"50%"}
							placeholder='Select emergency'
							onChange={(e) => setEmergency(e.target.value)}>
							<option value='0'>Normal</option>
							<option value='1'>Emergency</option>
						</Select>
					</FormControl>
					<FormControl padding={"3%"}>
						<FormLabel>File Image :</FormLabel>
						<Input
							multiple
							width={"50%"}
							placeholder='File Image'
							type='file'
							onChange={(e) =>
								uploadAllImageProduct(e.target.files)
							}
						/>
						<SimpleGrid columns={4} spacing={5}>
							{allImage &&
								allImage.map((src: any, index: any) => (
									<Image
										key={index}
										src={src}
										alt='photo'
										width={200}
										height={200}
										unoptimized={true}
									/>
								))}
						</SimpleGrid>
					</FormControl>

					<Box padding={"3%"} w={"full"} alignSelf={"end"}>
						<NewButton
							submit='submit'
							// click={handleAddToCart}
							name={"Submit"}
							bgColor={"black"}
							color={"white"}
							hoverBg={"#1e1e1e"}
							borderColor={"transparent"}
						/>
					</Box>
				</form>
			</VStack>
		</div>
	);
};

export default AddProduct;
