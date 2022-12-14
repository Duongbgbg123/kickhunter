import { Box } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import BagItems from "../components/cart/BagItems";
import { OrderSummary } from "../components/cart/OrderSummary";
// const OrderSummary = dynamic(() => import("../components/cart/OrderSummary"), {
// 	ssr: false,
// });
// const BagItems = dynamic(() => import("../components/cart/BagItems"), {
// 	ssr: false,
// });
const Cart = () => {
	return (
		<>
			<Box
				display={"grid"}
				gap={["40px", "40px", "40px", "5%", "5%"]}
				my={"30px"}
				maxW={"1200px"}
				mx={"auto"}
				p={"20px"}
				gridTemplateColumns={[
					"100%",
					"100%",
					"100%",
					"65% 30%",
					"65% 30%",
				]}>
				<BagItems />

				<OrderSummary />
			</Box>
		</>
	);
};
export default Cart;
