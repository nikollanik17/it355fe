import * as actionTypes from "./actionTypes";
import axios from "config/axios";

import { startLoading, finishLoading } from "./loader";
import { errorsNotification, successNotification } from "./notification";
import { getSingleBoard } from "./boards";

export const setTasks = (payload) => {
	return {
		type: actionTypes.SET_TASKS,
		payload
	}
}

export const createTask = (boardId, name, description, status, callback) => {
	return (dispatch) => {
		dispatch(startLoading());
		axios
			.post(`tasks/${boardId}`, { name, description, status })
			.then((response) => {
				dispatch(getSingleBoard(boardId));
				dispatch(finishLoading());
				dispatch(successNotification("Task created"));
				callback && callback();
			})
			.catch((error) => {
				dispatch(finishLoading());
				dispatch(errorsNotification("Error creating task boards"));
				return false;
			});
	};
}

export const updateTask = (taskId, name, description, status, callback) => {
	return (dispatch) => {
		dispatch(startLoading());
		axios
			.put(`tasks/${taskId}`, { name, description, status })
			.then((response) => {
				dispatch(finishLoading());
				dispatch(successNotification("Task updated"));
				callback && callback();
			})
			.catch((error) => {
				dispatch(finishLoading());
				dispatch(errorsNotification("Error updating task boards"));
				return false;
			});
	};
}

export const deleteTask = (taskId, callback) => {
	return (dispatch) => {
		dispatch(startLoading());
		axios
			.delete(`tasks/${taskId}`)
			.then((response) => {
				dispatch(finishLoading());
				dispatch(successNotification("Task deleted"));
				callback && callback();
			})
			.catch((error) => {
				dispatch(finishLoading());
				dispatch(errorsNotification("Error deleting task"));
				return false;
			});
	};
}