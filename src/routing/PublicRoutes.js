import Login from 'containers/pages/Login/Login';
import Register from 'containers/pages/Register/Register';
import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

export function PublicRoutes() {
	return (
		<Switch>
			<Route path="/auth/login" component={Login} />
			<Route path="/auth/register" component={Register} />
			<Redirect from="/auth" exact={true} to="/auth/login" />
			<Redirect to="/auth/login" />
		</Switch>
	);
}
