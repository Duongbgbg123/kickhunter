import { NextSeo } from "next-seo";
import { Box } from "@chakra-ui/react";
import Banner from "components/welcome/banner/Banner";
import Content from "components/welcome/content/Content";

const IndexPage = () => {
	return (
		<>
			<NextSeo title='Welcome' />

			<Banner />
			<Content />
		</>
	);
};

export default IndexPage;
