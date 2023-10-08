import React from 'react';
import cookie from "js-cookie";
import axios from 'axios';

const Logout = () => {

    const deleteCookie = (key) => {
        if (window !== "undefined") {
            cookie.remove(key, {expires: 1 } )
        }
    };

    const delog = async () => {
    

        await axios({
            method: "get",
            url: `${process.env.REACT_APP_API_URL}api/user/logout`,
            withCredentials: true,
        })
        .then(() => deleteCookie('jwt'))
        .catch((err) => console.log(err));

        window.location = "/";
    }
    return (
     <li onClick={delog} className="welcome" >
        <img src="../img/icons/Logout.svg" alt="logout"  />
     </li>
    );
};

export default Logout;