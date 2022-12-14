import { Box, Text } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { showLoginPage } from "../redux/feature/auth/actions";
import { LoginForm } from "../components/auth/LoginForm";
import { ResetForm } from "../components/auth/ResetForm";
import { SignUpForm } from "../components/auth/SignUpForm";
import { NextPage } from "next";

const AuthPage = () => {
	const isLogin = useSelector((state: any) => state.authReducer.isLogin);
	const isReset = useSelector((state: any) => state.authReducer.isReset);
	const dispatch = useDispatch();

	const displayLogin = () => {
		dispatch(showLoginPage());
	};

	return (
		<>
			<Box w={["95%", "95%", "50%", "37%", "27%"]} m={"20px auto"}>
				<Text
					fontWeight={"700"}
					fontSize={"23px"}
					my={"40px"}
					mx={"10%"}
					textAlign={"center"}>
					{isLogin
						? "YOUR ACCOUNT FOR EVERYTHING KICKHUNT"
						: isReset
						? "RESET PASSWORD"
						: "BECOME A KICKHUNT MEMBER"}
				</Text>

				{isLogin ? (
					<LoginForm />
				) : isReset ? (
					<ResetForm />
				) : (
					<SignUpForm />
				)}

				<Box textAlign={"center"} mt={"20px"}>
					<Text display={"inline"} mt={"25px"} color={"#b0a8af"}>
						{isLogin
							? "Not a Member? "
							: isReset
							? "Or return to "
							: "Already a Member? "}
					</Text>
					<Text
						onClick={displayLogin}
						display={"inline"}
						textDecoration={"underline"}
						cursor={"pointer"}>
						{isLogin ? "SIGN UP" : "Login"}
					</Text>
				</Box>
			</Box>
		</>
	);
};

export default AuthPage;
