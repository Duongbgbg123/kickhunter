import {
	Button,
	Divider,
	Flex,
	Menu,
	MenuButton,
	MenuItem,
	MenuList,
	useToast,
} from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa";
import { BsCart2, BsFillCaretDownFill } from "react-icons/bs";
import { RiLuggageCartLine, RiCoupon3Line } from "react-icons/ri";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { logoutFromAccount } from "../../redux/feature/auth/actions";
import { useRouter } from "next/router";
import { useEffect } from "react";
// import { Coupon } from "../../pages/coupon/Coupon";

export const Logout = () => {
	const user = useSelector(
		(state: any) => state.authReducer.user?.displayName,
		shallowEqual
	);

	const dispatch = useDispatch();
	const toast = useToast();
	const router = useRouter();
	// const navigate = useNavigate();

	const handleLogoutBtn = () => {
		dispatch(logoutFromAccount(toast) as any);
	};

	return (
		<>
			<Menu>
				<MenuButton
					as={Button}
					size='sm'
					bg={"transparent"}
					rightIcon={<BsFillCaretDownFill />}>
					{user}
				</MenuButton>
				<MenuList zIndex={2}>
					<Flex
						flexDirection={"column"}
						gap={"5px"}
						fontSize={"17px"}>
						{/* <MenuItem
              onClick={() => {
                router.push('/favourite');
              }}
              icon={<FaRegHeart />}
            >
              Wishlist
            </MenuItem> */}
						{/* <MenuItem
              onClick={() => {
                router.push('/orders');
              }}
              icon={<RiLuggageCartLine />}
            >
              Orders
            </MenuItem> */}

						<MenuItem
							onClick={() => {
								router.push("/cart");
							}}
							icon={<BsCart2 />}>
							Cart
						</MenuItem>
						<Divider />
						<MenuItem onClick={handleLogoutBtn} icon={<FiLogOut />}>
							Logout
						</MenuItem>
					</Flex>
				</MenuList>
			</Menu>
		</>
	);
};
