import { NextPage } from "next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Error } from "components/Error";
import { Loading } from "components/Loading";
import { ShoeSection } from "components/home/ShoeSection";
import { getShoeData } from "redux/feature/home/actions";
import { NextSeo } from "next-seo";

const HomePage: NextPage = () => {
	const dispatch = useDispatch();
	const { loading, error, shoeData } = useSelector(
		(state: any) => state.homeReducer
	);

	useEffect(() => {
		dispatch(getShoeData() as any);
	}, []);
	return loading ? (
		<Loading />
	) : error ? (
		<Error />
	) : (
		<>
			<NextSeo title='Home' />
			{shoeData.map((data: any, index: any) => {
				return <ShoeSection key={index} {...data} />;
			})}
		</>
	);
};
export default HomePage;
