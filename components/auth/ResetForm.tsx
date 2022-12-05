import { Input, Text, useToast, VStack } from "@chakra-ui/react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useState } from "react";
import { setToast } from "utils/extraFunctions";
import { AuthBtn } from "./AuthBtn";
import { useRouter } from "next/router";

export const ResetForm = () => {
	const [email, setEmail] = useState("");
	const [loading, setLoading] = useState(false);
	const toast = useToast();
	const router = useRouter();

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);

		sendPasswordResetEmail(auth, email)
			.then(() => {
				setToast(
					toast,
					"Check your email for a reset link (and check spam)...!!",
					"success"
				);
				setLoading(false);
			})
			.catch((error) => {
				setToast(toast, error.message, "error");
				setLoading(false);
			});
	};
	return (
		<>
			<form onSubmit={handleSubmit}>
				<VStack
					w={["95%", "95%", "85%", "85%", "85%", "85%"]}
					mx={"auto"}
					gap={"15px"}>
					<Text color={"gray"} textAlign={"center"}>
						This feature is not available now, will be available in
						future, till then you can create a new account.
					</Text>

					<Input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type={"email"}
						placeholder='Email address'
					/>

					<AuthBtn value={"RESET"} />
				</VStack>
			</form>
		</>
	);
};
