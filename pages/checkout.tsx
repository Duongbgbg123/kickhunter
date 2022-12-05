import {
	isCheckoutFormEmpty,
	validateEmail,
	validateMobile,
} from "../utils/formValidator";
// import CheckoutOrderSummary from "../components/checkout/CheckoutOrderSummary";
import { CheckoutForm } from "../components/checkout/CheckoutForm";
import {
	Box,
	Button,
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	useDisclosure,
	useToast,
} from "@chakra-ui/react";
import { setToast } from "../utils/extraFunctions";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
// import { initPayment } from "../payment/razorpay";
import { useState } from "react";
import { updateCartDetails } from "../redux/feature/cart/actions";
import { useRouter } from "next/router";
import { v4 } from "uuid";
import { getItem } from "utils/localStorage";
import { addOrder } from "../firebase/upload";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import FacebookMessage from "components/facebookMessage";

const CheckoutOrderSummary = dynamic(
	() => import("../components/checkout/CheckoutOrderSummary"),
	{
		ssr: false,
	}
);

const Checkout = () => {
	const { orderSummary, cartProducts } = useSelector(
		(state: any) => state.cartReducer,
		shallowEqual
	);
	const token = useSelector((state: any) => state.authReducer.token);

	const { total } = orderSummary;
	const initState = {
		username: "",
		addressLine: "",
		city: "",
		country: "",
		email: "",
		mobile: "",
	};
	const [loading, setLoading] = useState(false);
	const [form, setForm] = useState(initState);
	const toast = useToast();
	const { isOpen, onOpen, onClose } = useDisclosure();
	const dispatch = useDispatch();
	// const navigate = useNavigate();
	const router = useRouter();
	const userId = getItem("user");
	const { name, price, quantity, size, color, id } = cartProducts[0];
	const productForm = { name, price, quantity, size, color, id };
	const handleInputChange = ({ target: { name, value } }: any) => {
		setForm({
			...form,
			[name]: value,
			...productForm,
		});
	};
	const [isFormValid, setIsFormValid] = useState(false);
	const handleFormValidation = (form: any) => {
		const isEmpty = isCheckoutFormEmpty(form);
		if (!isEmpty.status) {
			setToast(toast, isEmpty.message as string, "error");
			return isEmpty.status;
		}
		const isEmail = validateEmail(form.email);
		if (!isEmail.status) {
			setToast(toast, isEmail.message as string, "error");
			return isEmail.status;
		}
		// const isPinCode = validatePinCode(form.pinCode);
		// if (!isPinCode.status) {
		// 	setToast(toast, isPinCode.message as string, "error");
		// 	return isPinCode.status;
		// }
		const isMobile = validateMobile(form.mobile);
		if (!isMobile.status) {
			setToast(toast, isMobile.message as string, "error");
			return isMobile.status;
		}
		return true;
	};
	const handleFormSubmit = async (e: any) => {
		e.preventDefault();
		const date = new Date();
		var current_date =
			date.getFullYear() +
			"-" +
			(date.getMonth() + 1) +
			"-" +
			date.getDate();

		if (!handleFormValidation(form)) return;
		const order = {
			...form,
			id: v4(),
			date: current_date,
			products: cartProducts,
			price: total,
			userId: userId.uid,
			status: "Ordered",
		};
		addOrder(order, setLoading, toast);
		onOpen();
		// router.push("/payment");
		//To get order id
		// const { data } = await axios.post('/api/payment/order', { amount: orderSummary.total });

		//Passing order id to razorpay function

		// initPayment(form, data, orderSummary, cartProducts, token, toast, dispatch, navigate);
	};

	return (
		<>
			<Box
				p={"20px"}
				my={"30px"}
				mx={"auto"}
				maxW={"1200px"}
				display={"grid"}
				gap={["40px", "40px", "40px", "10%", "10%"]}
				gridTemplateColumns={[
					"100%",
					"100%",
					"100%",
					"55% 35%",
					"60% 30%",
				]}>
				<CheckoutForm onChange={handleInputChange} />

				<CheckoutOrderSummary
					onClick={handleFormSubmit}
					orderSummary={orderSummary}
				/>
				<Modal isOpen={isOpen} onClose={onClose}>
					<ModalOverlay />
					<ModalContent>
						<ModalHeader>
							Copy this and send us with Messenger
						</ModalHeader>
						<ModalCloseButton />
						<ModalBody>{JSON.stringify(form, null, 2)}</ModalBody>
						<ModalFooter>
							<Button mr={3} onClick={onClose} variant='ghost'>
								Maybe later...
							</Button>
							<Button
								color='black.200'
								colorScheme='blue'
								onClick={() => {
									copyTextToClipboard(JSON.stringify(form));
									setIsFormValid(true);
									onClose();
									setForm(initState);
								}}>
								Copy
							</Button>
						</ModalFooter>
					</ModalContent>
				</Modal>
				{isFormValid && <FacebookMessage />}
			</Box>
		</>
	);
};

function fallbackCopyTextToClipboard(text: string) {
	var textArea = document.createElement("textarea");
	textArea.value = text;

	// Avoid scrolling to bottom
	textArea.style.top = "0";
	textArea.style.left = "0";
	textArea.style.position = "fixed";

	document.body.appendChild(textArea);
	textArea.focus();
	textArea.select();

	try {
		var successful = document.execCommand("copy");
		var msg = successful ? "successful" : "unsuccessful";
		console.log("Fallback: Copying text command was " + msg);
	} catch (err) {
		console.error("Fallback: Oops, unable to copy", err);
	}

	document.body.removeChild(textArea);
}
function copyTextToClipboard(text: string) {
	if (!navigator.clipboard) {
		fallbackCopyTextToClipboard(text);
		return;
	}
	navigator.clipboard.writeText(text).then(
		function () {
			console.log("Async: Copying to clipboard was successful!");
		},
		function (err) {
			console.error("Async: Could not copy text: ", err);
		}
	);
}

export default Checkout;
