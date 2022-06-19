import * as actionTypes from '../actions/actionTypes';

const initialState = false;

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.START_LOADING:
			return true;
		case actionTypes.FINISH_LOADING:
			return false;
		default:
			return state;
	}
};

export default reducer;
