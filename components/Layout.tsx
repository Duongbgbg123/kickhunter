import { Box } from "@chakra-ui/react";
import React, { ReactNode } from "react";
import { SidebarWithHeader } from "./admin/SidebarWithHeader";
import { Footer } from "./footer";
import { Navbar } from "./navbar/Navbar";

type Props = {
	children: ReactNode;
	admin?: boolean;
};

const Layout = ({ children, admin }: Props) => {
	if (!admin) {
		return (
			<div>
				<Navbar />
				{children}
				<Footer />
			</div>
		);
	} else {
		return <SidebarWithHeader>{children}</SidebarWithHeader>;
	}
};

export default Layout;
