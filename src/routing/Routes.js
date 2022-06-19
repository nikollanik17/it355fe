/**
 * High level router.
 *
 * Note: It's recommended to compose related routes in internal router
 * components (e.g: `src/app/modules/Auth/pages/AuthPage`, `src/app/BasePage`).
 */

import React from "react";
import { Redirect, Switch, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import { PrivateRoutes } from "./PrivateRoutes";
import { PublicRoutes } from "./PublicRoutes";
import Layout from "hoc/Layout/Layout";

const Routes = () => {
	// const isAuthorized = useSelector<RootState>(({ auth }) => auth.user, shallowEqual);
	const isAuthorized =
		useSelector((state) => state.auth.account) || localStorage.getItem("user");
	// const isLoading = useSelector<RootState>((state) => state.loader);

	return (
		<>
			<Switch>
				{!isAuthorized ? (
					/* Render auth page when user at `/auth` and not authorized. */
					<Route>
						<PublicRoutes />
					</Route>
				) : (
					/* Otherwise redirect to root page (`/`) */
					<Redirect from="/login" to="/" />
				)}

				{/* <Route path="/error" component={ErrorsPage} />
				 <Route path="/logout" component={Logout} /> */}

				{!isAuthorized ? (
					<Redirect to="/login" />
				) : (
					<>
						<Layout>
							<PrivateRoutes />
						</Layout>
					</>
				)}
			</Switch>
		</>
	);
};

export { Routes };
