import { NextSeo } from "next-seo";
import Banner from "components/welcome/banner/Banner";
import Content from "components/welcome/content/Content";
import { BottomAuth } from "../components/welcome/banner/BottomAuth";
import { Navbar } from "components/navbar/Navbar";

const IndexPage = () => {
	return (
		<>
			<NextSeo title='Welcome' />
			<BottomAuth />
			<Banner />

			<Content />
		</>
	);
};

export default IndexPage;
