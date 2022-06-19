import * as actionTypes from './actionTypes';

export const startLoading = () => {
	return {
		type: actionTypes.START_LOADING,
	};
};

export const finishLoading = () => {
	return {
		type: actionTypes.FINISH_LOADING,
	};
};
