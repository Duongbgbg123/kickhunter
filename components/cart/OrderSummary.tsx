import { Box, Input, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
	applyCouponRequest,
	removeCouponRequest,
} from "../../redux/feature/cart/actions";
import { couponValidator } from "../../utils/couponValidator";
import { setToast } from "../../utils/extraFunctions";
import { CheckoutBtn } from "./CheckoutBtn";
import { OrderSummaryDataSection } from "./OrderSummaryDataSection";

export const OrderSummary = () => {
	const orderSummary = useSelector(
		(state: any) => state.cartReducer.orderSummary
	);
	const { token } = useSelector((state: any) => state.authReducer);

	const [coupon, setCoupon] = useState("");
	const toast = useToast();
	const dispatch = useDispatch();
	const router = useRouter();

	const handleCouponCode = ({ target: { textContent } }: any) => {
		switch (textContent) {
			case "Apply Coupon":
				return applyCouponCode();
			case "Remove Coupon":
				return removeCouponCode();
		}
	};

	const applyCouponCode = () => {
		if (!token) {
			setToast(toast, "Please login first", "error");
			return router.push("/auth");
		}
		if (orderSummary.total === 0) {
			return setToast(
				toast,
				"Please add some products in the cart",
				"error"
			);
		}
		if (!coupon) {
			return setToast(toast, "Please enter coupon code", "error");
		}
		const discountPercent = couponValidator(coupon);
		if (!discountPercent) {
			return setToast(toast, "Invalid Coupon Code", "error");
		}
		dispatch(applyCouponRequest(discountPercent, toast) as any);
	};

	const removeCouponCode = () => {
		dispatch(removeCouponRequest(toast) as any);
		setCoupon("");
	};

	const handleMemberCheckout = () => {
		if (!token) {
			setToast(toast, "Please login first", "error");
			return router.push("/auth");
		}
		if (orderSummary.total === 0) {
			return setToast(
				toast,
				"Please add some products in the cart",
				"error"
			);
		}
		router.push("/checkout");
	};

	return (
		<>
			<Box>
				<OrderSummaryDataSection {...orderSummary} />

				<Input
					onChange={(e) => {
						setCoupon(e.target.value);
					}}
					placeholder={"Coupon"}
					disabled={orderSummary.discount > 0}
					value={coupon}
					type={"text"}
					mb={"20px"}
				/>

				<CheckoutBtn
					onClick={handleCouponCode}
					name={
						orderSummary.discount > 0
							? "Remove Coupon"
							: "Apply Coupon"
					}
					bgColor={"white"}
					color={"black"}
					hoverBorder={"black"}
					borderColor={"#cecdce"}
				/>

				<CheckoutBtn
					onClick={handleMemberCheckout}
					name={"Member Checkout"}
					bgColor={"black"}
					color={"white"}
					hoverBg={"#1e1e1e"}
					borderColor={"transparent"}
				/>
			</Box>
		</>
	);
};
