import { combineReducers } from "redux";

// reducers
import loader from "./loader";
import auth from "./auth";
import notification from "./notification";
import boards from "./boards";

export const rootReducer = combineReducers({
	loader,
	auth,
	notification,
	boards
});
