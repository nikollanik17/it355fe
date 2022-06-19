import * as actionTypes from "../actions/actionTypes";
import _ from "underscore";

const initialState = {
	account: null,
	loginErr: null,
	registerErr: null,
};

const reducer = (state = initialState, action) => {
	switch (action.type) {
		case actionTypes.SET_USER:
			if (
				_.isEqual(state, {
					...state,
					account: action.payload,
				})
			) {
				return state;
			}

			return {
				...state,
				account: action.payload,
			};
		case actionTypes.SET_REGISTER_ERR:
			return {
				...state,
				registerErr: action.payload,
			};
		case actionTypes.SET_LOGIN_ERR:
			return {
				...state,
				loginErr: action.payload,
			};
		default:
			return state;
	}
};

export default reducer;
