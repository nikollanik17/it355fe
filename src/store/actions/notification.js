import * as actionTypes from './actionTypes';

export const successNotification = (message) => {
	return {
		type: actionTypes.SUCCESS_NOTIFICATION,
		message: message,
	};
};

export const errorsNotification = (message) => {
	return {
		type: actionTypes.ERROR_NOTIFICATION,
		message: message,
	};
};
