import {
	Button,
	Checkbox,
	CheckboxGroup,
	Stack,
	Text,
	Wrap,
} from "@chakra-ui/react";

export const FilterSizeComponent = ({ title, item, change }: any) => {
	return (
		<>
			<Stack direction={"row"}>
				<Wrap spacing={"24px"}>
					{item.map((e: any, i: any) => (
						<Checkbox
							onChange={(e) => {
								change(e);
							}}
							value={e}
							name={title}
							key={i}>
							<Text fontSize={["13px", "16px"]}>{e}</Text>
						</Checkbox>
					))}
				</Wrap>
			</Stack>
		</>
	);
};
