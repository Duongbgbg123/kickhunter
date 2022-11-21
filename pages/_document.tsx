import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
	return (
		<Html lang='en'>
			<Head>
				<link
					href='https://fonts.googleapis.com/css2?family=Anton&display=swap'
					rel='stylesheet'></link>
				<link
					href='https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;600;700;900&display=swap'
					rel='stylesheet'></link>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
