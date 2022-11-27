import { Accordion, useToast } from "@chakra-ui/react";
import { type } from "os";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ObjectType } from "typescript";
import {
	getPriceRange,
	setAllFilters,
} from "../../redux/feature/products/actions";
import { setToast } from "../../utils/extraFunctions";
import { FilterSection, PriceFilter } from "./LeftSideFilterComponents";

type Iinit = any;

export const LeftSideFilter = () => {
	const init: Iinit = {
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

	const [priceRange, setPriceRange] = useState({
		minPrice: 0,
		maxPrice: Infinity,
	});
	const [manageFilter, setManageFilter] = useState(init);
	//   const gender = useSelector((state: any) => state.pathReducer.path);
	const dispatch = useDispatch();
	const toast = useToast();

	const handleFilterChange = ({ target: { name, value, checked } }: any) => {
		setManageFilter({
			...manageFilter,
			[name]: {
				...manageFilter[name],
				[value]: checked,
			},
		});
	};

	const handleFilterApply = (e: any) => {
		dispatch(setAllFilters(manageFilter));
		setToast(toast, "Filter Applied Successfully", "success", 1000);
	};

	const handleChange = ({ target: { value, name } }: any) => {
		setPriceRange({ ...priceRange, [name]: value });
	};

	const handleSubmit = () => {
		dispatch(getPriceRange(priceRange));
		setToast(
			toast,
			"Price Range Applied Successfully",
			"success",
			1000,
			""
		);
	};

	return (
		<Accordion allowMultiple>
			<PriceFilter
				handleChange={handleChange}
				handleSubmit={handleSubmit}
			/>

			<FilterSection
				apply={handleFilterApply}
				change={handleFilterChange}
				isSize
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
			<FilterSection
				apply={handleFilterApply}
				change={handleFilterChange}
				title={"Colour"}
				item={["Black", "White", "Green", "Red", "Blue"]}
			/>
		</Accordion>
	);
};
