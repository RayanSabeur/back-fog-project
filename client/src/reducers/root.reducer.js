import { combineReducers } from "redux";
import gamesReducer from "./games.reducer";
import userReducer from "./user.reducer";


export default combineReducers({

    gamesReducer,
    userReducer
});