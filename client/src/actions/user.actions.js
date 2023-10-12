import axios from "axios";

export const GET_USER = "GET_USER";


export const getUser = (uid) => { // on se passe en parametre le  uid de notre user

    return (dispatch) => {

        return axios
        .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`) //on recup les infos du user avec axios
        .then((res) => { //c une promesse donc .then
            dispatch({type: GET_USER, payload: res.data}) //ça partira au reducer, avec comme type get user , et le payload = cqu'on envoie, donc les data recup du get (res.data)
         }) //= la data qu'on envoie
            .catch((err) => console.log(err))
        
    }
}