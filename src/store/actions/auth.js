import * as actionTypes from "./actionTypes";
import axios from "config/axios";

import { startLoading, finishLoading } from "./loader";
import { errorsNotification, successNotification } from "./notification";

export const setUser = (payload) => {
	return {
		type: actionTypes.SET_USER,
		payload,
	};
};

export const setLoginErr = (payload) => {
	return {
		type: actionTypes.SET_LOGIN_ERR,
		payload,
	};
};

export const setRegisterErr = (payload) => {
	return {
		type: actionTypes.SET_REGISTER_ERR,
		payload,
	};
};

export const login = (user) => {
	return (dispatch) => {
		dispatch(startLoading());
		axios
			.post("users/login", { username: user.username, password: user.password })
			.then((response) => {
				localStorage.setItem("user", JSON.stringify(response.data));
				localStorage.setItem("user-id", response.data?.id);
				dispatch(setLoginErr(null));
				dispatch(setUser(response.data));
				dispatch(successNotification("Success login"));
				dispatch(finishLoading());
			})
			.catch((error) => {
				dispatch(errorsNotification("Inncorrect username or password"));
				dispatch(finishLoading());
				return false;
			});
	};
};

export const register = (data, callback) => {
	return (dispatch) => {
		dispatch(startLoading());
		axios
			.post("users/register", data)
			.then((response) => {
				// localStorage.setItem('jwToken', response.data.token);
				// localStorage.setItem('user', JSON.stringify(response.data.data));
				dispatch(setRegisterErr(null));
				dispatch(successNotification("Successfully registered"));
				dispatch(finishLoading());
				callback();
			})
			.catch((error) => {
				if (error.response?.status === '409') {
					dispatch(errorsNotification("Username taken"));
				} else {
					dispatch(errorsNotification("Register error"));
				}
				// dispatch(errorsNotification(error?.response?.data?.message));
				// dispatch(setRegisterErr(error?.response?.data?.message));
				dispatch(finishLoading());
			});
	};
};

export const getCurrentUser = () => {
	return (dispatch) => {
		dispatch(startLoading());
		axios
			.get(`users/${localStorage.getItem('user-id')}`)
			.then((response) => {
				localStorage.setItem("user", JSON.stringify(response.data));
				localStorage.setItem("user-id", response.data?.id);
				dispatch(setUser(response.data));
				dispatch(finishLoading());
			})
			.catch((error) => {
				dispatch(finishLoading());
			});
	};
};

export const updateProfile = (user, callback) => {
	return (dispatch) => {
		axios
			.put(`users/me`, {
				username: user.username,
				password: user.password,
			})
			.then(({ data }) => {
				dispatch(getCurrentUser());
				dispatch(successNotification("Password updated"));
				callback && callback();
			})
			.catch((error) => {
				dispatch(errorsNotification("Error updating password"));
				callback && callback();
			});
	};
};

export const deleteProfile = (callback, logoutCallback) => {
	return (dispatch) => {
		axios
			.delete(`profile`)
			.then(({ data }) => {
				dispatch(successNotification(data.message));
				callback();
				logoutCallback();
			})
			.catch((error) => {
				dispatch(errorsNotification(error?.response?.data?.message));
				callback();
			});
	};
};
