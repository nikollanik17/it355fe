import React, { Suspense } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
// Import pages

import Boards from 'containers/pages/Boards/Boards';
import SingleBoard from 'containers/pages/SingleBoard/SingleBoard';

export function PrivateRoutes() {
	return (
		<Suspense
		// fallback={<FallbackView />}
		>
			<Switch>
				<Route exact path="/boards" component={Boards} />
				<Route exact path="/boards/:boardId" component={SingleBoard} />

				<Redirect from="/auth/login" to="/" />
				<Redirect exact from="/" to="/boards" />
				<Redirect to="error/404" />
			</Switch>
		</Suspense>
	);
}
