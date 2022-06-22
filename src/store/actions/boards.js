import * as actionTypes from "./actionTypes";
import axios from "config/axios";

import { startLoading, finishLoading } from "./loader";
import { errorsNotification, successNotification } from "./notification";
import { getCurrentUser } from "./auth";

export const setBoards = (payload) => {
	return {
		type: actionTypes.SET_BOARDS,
		payload
	}
}

export const setSingleBoard = (payload) => {
	return {
		type: actionTypes.SET_SINGLE_BOARD,
		payload
	}
}

export const getBoards = () => {
	return (dispatch) => {
		dispatch(startLoading());
		axios
			.get("boards")
			.then((response) => {
				dispatch(setBoards(response.data));
				dispatch(finishLoading());
			})
			.catch((error) => {
				dispatch(finishLoading());
				dispatch(errorsNotification("Error fetching boards"));
				return false;
			});
	};
}

export const getSingleBoard = (id) => {
	return (dispatch) => {
		dispatch(startLoading());
		axios
			.get(`boards/${id}`)
			.then((response) => {
				dispatch(setSingleBoard(response.data));
				dispatch(finishLoading());
			})
			.catch((error) => {
				dispatch(finishLoading());
				dispatch(errorsNotification("Error fetching board"));
				return false;
			});
	};
}

export const createBoard = (name, callback) => {
	return (dispatch) => {
		dispatch(startLoading());
		axios
			.post("boards", { name })
			.then((response) => {
				dispatch(getCurrentUser());
				dispatch(successNotification("Successfully created board"));
				dispatch(finishLoading());
				callback && callback();
			})
			.catch((error) => {
				dispatch(finishLoading());
				dispatch(errorsNotification("Error creating board"));
				return false;
			});
	};
}

export const updateBoard = (boardId, name, callback) => {
	return (dispatch) => {
		dispatch(startLoading());
		axios
			.put(`boards/${boardId}`, { name })
			.then((response) => {
				dispatch(getCurrentUser());
				dispatch(successNotification("Successfully updated board"));
				dispatch(finishLoading());
				callback && callback();
			})
			.catch((error) => {
				dispatch(finishLoading());
				dispatch(errorsNotification("Error updating board"));
				return false;
			});
	};
}

export const deleteBoard = (boardId, callback) => {
	return (dispatch) => {
		dispatch(startLoading());
		axios
			.delete(`boards/${boardId}`)
			.then((response) => {
				dispatch(getCurrentUser());
				dispatch(successNotification("Successfully deleted board"));
				dispatch(finishLoading());
				callback && callback();
			})
			.catch((error) => {
				dispatch(finishLoading());
				dispatch(errorsNotification("Error deleting board"));
				return false;
			});
	};
}