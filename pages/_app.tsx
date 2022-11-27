import "styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { store } from "redux/store/store";
import { Provider as ReduxProvider } from "react-redux";
import Layout from "components/Layout";
import { NextSeo } from "next-seo";
import { Router } from "next/router";

const colors = {
	brand: {
		900: "#1a365d",
		800: "#153e75",
		700: "#2a69ac",
	},
};
const theme = extendTheme({ colors });

export default function App({ Component, pageProps, ...appProps }: AppProps) {
	const route = ["/register", "/login", "/reset-password", "/"];
	const adminRoute = [
		"/admin",
		"/admin/all-users",
		"/admin/add-product",
		"/admin/all-products",
		"/admin/all-orders",
		"/admin/all-orders/[id]",
		"/admin/settings",
		`/admin/[id]`,
	];
	if (adminRoute.includes(appProps.router.pathname)) {
		return (
			<ReduxProvider store={store}>
				<NextSeo titleTemplate='%s | KickHunt' />
				<ChakraProvider theme={theme}>
					<Layout admin>
						<Component {...pageProps} />
					</Layout>
				</ChakraProvider>
			</ReduxProvider>
		);
	}
	if (route.includes(appProps.router.pathname)) {
		return (
			<ReduxProvider store={store}>
				<NextSeo titleTemplate='%s | KickHunt' />
				<ChakraProvider theme={theme}>
					<Component {...pageProps} />
				</ChakraProvider>
			</ReduxProvider>
		);
	} else {
		return (
			<ReduxProvider store={store}>
				<NextSeo titleTemplate='%s | KickHunt' />
				<ChakraProvider theme={theme}>
					<Layout>
						<Component {...pageProps} />
					</Layout>
				</ChakraProvider>
			</ReduxProvider>
		);
	}
}
