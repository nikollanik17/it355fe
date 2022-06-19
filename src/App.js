import React from "react";

import "./css/style.scss";
import Notifications from "hoc/Notifications/Notifications";
import Loader from "hoc/Loader/Loader";
import { useSelector } from "react-redux";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Redirect } from "react-router-dom";
import { PublicRoutes } from "routing/PublicRoutes";
import { PrivateRoutes } from "routing/PrivateRoutes";
import Layout from "hoc/Layout/Layout";

function App() {
	const isLoading = useSelector((state) => state.loader);
	const isAuthorized =
		useSelector((state) => state.auth.account) || localStorage.getItem("user");

	console.log('isAuthorized', isAuthorized);

	return (
		<>
			{isLoading && <Loader />}
			<Notifications />
			<BrowserRouter>
				{!isAuthorized ? (
					<PublicRoutes />
				) : (
					<Redirect from="/auth/login" to="/" />
				)}
				{!isAuthorized ? (
					<Redirect to="/auth/login" />
				) : (
					<Layout>
						<PrivateRoutes />
					</Layout>
				)}
			</BrowserRouter>
		</>
	);
}

export default App;
