import React from 'react';
import cookie from "js-cookie";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

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
        .then((res) => console.log(res))
        .catch((err) => console.log(err));

        window.location = "/";
    }
    return (
        <a href="/logout">

<span onClick={delog}className="option-text">
        deconnexion <FontAwesomeIcon icon={faRightFromBracket} />
     </span>
        </a>
    


    );
};

export default Logout;