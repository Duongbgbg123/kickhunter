import { Box } from "@chakra-ui/react";
import { OrderSummaryDataSection } from "../cart/OrderSummaryDataSection";
import { PlaceOrderBtn } from "./PlaceOrderBtn";

const CheckoutOrderSummary = ({ onClick, orderSummary }: any) => {
	return (
		<Box>
			<OrderSummaryDataSection {...orderSummary} />
			<PlaceOrderBtn onClick={onClick} />
		</Box>
	);
};

export default CheckoutOrderSummary;
