import axios from "axios"
export const GET_GAMES= "GET_GAMES";
export const GET_ALL_GAMES = "GET_ALL_GAMES";


export const getGames = (num) => {

    return (dispatch) => {

        return axios
        .get(`${process.env.REACT_APP_API_URL}api/gameproduct`)
        .then((res) => {
            const array = res.data.slice(0,num)
            dispatch({type: GET_GAMES, payload: array })
            dispatch({type: GET_ALL_GAMES, payload: res.data}) //tte la data
        })
        .catch((err) => console.log(err))
    }
}