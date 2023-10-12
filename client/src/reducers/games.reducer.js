import { GET_GAMES } from "../actions/getgames.actions";


const initialState = {};

export default function gamesReducer(state = initialState, action)
 {

    switch(action.type) {

        case GET_GAMES:
            return action.payload;

            default:
                 return state;
    
 }
}
