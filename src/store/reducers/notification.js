import * as actionTypes from '../actions/actionTypes';

const initialState = {
	type: null,
	message: '',
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SUCCESS_NOTIFICATION:
			return {
				...state,
				type: 'success',
				message: action.message,
			};
		case actionTypes.ERROR_NOTIFICATION:
			return {
				...state,
				type: 'error',
				message: action.message,
			};
		default:
			return state;
	}
};

export default reducer;
