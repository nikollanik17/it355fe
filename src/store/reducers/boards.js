import * as actionTypes from '../actions/actionTypes';

const initialState = {
	boards: [],
	singleBoard: null
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_BOARDS:
			return {
				...state,
				boards: action.payload
			};
		case actionTypes.SET_SINGLE_BOARD:
			return {
				...state,
				singleBoard: action.payload
			};
		default:
			return state;
	}
};

export default reducer;
