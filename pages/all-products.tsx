import { NextPage } from "next";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Error } from "components/Error";
import { Loading } from "components/Loading";
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
			<div>
				<h1>List a product</h1>
				<h3>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit.
					Omnis minus amet sit non maiores ipsam recusandae, ut
					blanditiis voluptatum inventore quidem, earum doloribus
					accusamus eligendi deleniti obcaecati consectetur optio
					ipsum.
				</h3>
			</div>
			<div>
				<input type='text' placeholder='Brand, model, SKU' />
				<i>icon</i>
			</div>
			<div>
				<div>
					<i>icon</i>
					<p>filters</p>
				</div>
				<div>
					<p>view</p>
					<i>icon</i>
				</div>
					</div>
					<div>
						<img src="/logo.png" />
						<div>
							<p>title</p>
							<span>desc</span>
						</div>
						<button>Buy!</button>
				</div>
		</>
	);
};
export default HomePage;
