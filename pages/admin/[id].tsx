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
} from "@chakra-ui/react";
import { v4 } from "uuid";
import { addProduct, upload } from "../../firebase/upload";
import { FilterSizeComponent } from "components/admin/FilterSizeComponent";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { NewButton } from "components/product/NewButton";
import {
	collection,
	doc,
	getDocs,
	query,
	updateDoc,
	where,
} from "firebase/firestore";
import { db, storage } from "../../firebase/config";
import { useRouter } from "next/router";
import { Loading } from "../../components/Loading";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { setToast } from "utils/extraFunctions";
export type products = {
	uid: string;
	data: any;
};
const UpdateProduct = () => {
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

	const [allImage, setAllImages] = useState<any>();
	const [allNewImage, setAllNewImages] = useState<any>();
	const [name, setName] = useState("");
	const [category, setCategory] = useState("nike");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState<number>();
	const [manageFilter, setManageFilter] = useState(init);
	const [emergency, setEmergency] = useState("0");
	const [color, setColor] = useState("white");
	const [product, setProduct] = useState<products>();
	const { Size, Colour } = manageFilter;
	const router = useRouter();
	const toast = useToast();

	const uploadAllImageProduct = (images: any) => {
		setAllImages([]);
		upload(images, setAllNewImages, toast);
	};
	// const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
	// 	if (e.target.files) {
	// 		setAllImages([]);
	// 		for (let file of files) {
	//             const imageRef = ref(storage, `images/${v4()}${file.name}`);
	//             await uploadBytes(imageRef, file)
	//                 .then((snap: any) =>
	//                     getDownloadURL(snap.ref)
	//                         .then((url) => {
	//                             setListUrls((prev: any) => [...prev, url]);
	//                         })
	//                         .catch((error) => setToast(toast, error.message, "error"))
	//                 )
	//                 .catch((e) => setToast(toast, e.message, "error"));
	//         }
	// 	}
	// };
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

	useEffect(() => {
		const fetchAPI = async () => {
			if (router.query.id) {
				const q = query(
					collection(db, "products"),
					where("id", "==", router.query.id)
				);
				const querySnapshot = await getDocs(q);
				querySnapshot.forEach((doc: any) => {
					setProduct({ uid: doc.id, data: doc.data() });
					setName(doc.data().name);
					setCategory(doc.data().category);
					setDescription(doc.data().description);
					setPrice(doc.data().price);
					setColor(doc.data().color);
					setEmergency(doc.data().isMergency);
					setManageFilter(init);
					setAllImages(doc.data().image);
				});
			}
		};
		fetchAPI();
	}, [router.query.id]);

	const handleSubmit = async (e: any, id: string) => {
		e.preventDefault();
		try {
			if (router.query.id) {
				const docRef = doc(db, "products", id);
				await updateDoc(docRef, {
					name,
					price,
					category,
					description,
					image: allNewImage,
					color: color,
					size: filteredSize,
					isMergency: emergency == "0" ? false : true,
					vote: 5,
				});
			}
			setToast(toast, "Update Successful...!!", "success");
			router.push("/admin/all-products");
		} catch (e) {
			setToast(toast, "Update failed !!", "error");
		}
	};

	return product ? (
		<div>
			<VStack w={["95%", "95%", "85%", "85%", "85%", "85%"]} gap={"20px"}>
				<form onSubmit={(e) => handleSubmit(e, product.uid)}>
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
							defaultValue='nike'
							onChange={setCategory}
							value={category}>
							<Wrap spacing='24px'>
								<Radio value='nike'>nike</Radio>
								<Radio value='adidas'>adidas</Radio>
								<Radio value='jordan'>jordan</Radio>
								<Radio value='rebox'>rebox</Radio>
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
							{allNewImage &&
								allNewImage.map((src: any, index: any) => (
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
	) : (
		Loading()
	);
};

export default UpdateProduct;
