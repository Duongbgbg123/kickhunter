import React, { ReactNode } from "react";
import { Navbar } from "./navbar/Navbar";

type Props = {
	children: ReactNode;
	admin?: boolean;
};

const Layout = ({ children }: Props) => {
	return (
		<>
			<Navbar />
			{children}
		</>
	);
};

export default Layout;
