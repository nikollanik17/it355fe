import React from "react";

import Header from "partials/Header";


function Layout({ children }) {


	return (
		<div className="flex h-screen overflow-hidden">

			{/* Content area */}
			<div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
				{/*  Site header */}
				<Header />

				<main>{children}</main>
			</div>
		</div>
	);
}

export default Layout;
