import React, { ReactNode } from "react";
import { SidebarWithHeader } from "./admin/SidebarWithHeader";
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
			</div>
		);
	} else {
		return (
			<div>
				<SidebarWithHeader>{children}</SidebarWithHeader>
			</div>
		);
	}
};

export default Layout;
