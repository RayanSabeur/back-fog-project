import React from 'react';
import  { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBookmark, faCircleXmark, faGamepad, faPen, faTrash, faXmark,faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import {faPlayCircle as anotherfaPlayCircle, faBookmark as anotherfaBookmark} from '@fortawesome/free-regular-svg-icons'
import { useSelector } from 'react-redux';





const HandleFavorite = ({currentgamefav, gameid, currentuser,   setCurrentGameFav}) => {
    const handleStatus = (status, gameid) => {
        console.log('status', status)
      
        console.log('CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC',currentgamefav, gameid, currentuser,   setCurrentGameFav);
        axios({
          method: "patch",
          url:     `${process.env.REACT_APP_API_URL}api/gameproduct/addtofavorite/${currentuser._id}`,
          data: {status, gameid},
          withCredentials: true
        }).then((res) => {
          setCurrentGameFav(res.data.user.status)
          })
          .catch((err) => console.log(err))
    
      }

    return (
      <>
                <li>
                  <FontAwesomeIcon icon={currentgamefav == 'playing' ? faPlayCircle : anotherfaPlayCircle } onClick={() => handleStatus('playing', gameid)} style={{color: currentgamefav  == 'playing' ? "#7617c4" : "white", fontSize: '2rem'}} />
              </li>
              <li>
                <FontAwesomeIcon icon={currentgamefav  == 'played' ? faGamepad : faGamepad} onClick={() => handleStatus('played', gameid)} style={{color: currentgamefav  == 'played' ? "#7617c4" : "white", fontSize: '2rem'}} />
              </li>
              <li>
                 <FontAwesomeIcon icon={currentgamefav  == 'wishlist' ? faBookmark : anotherfaBookmark} onClick={() => handleStatus('wishlist', gameid)} style={{color: currentgamefav  == 'wishlist' ? "#7617c4" : "white", fontSize: '2rem'}} />
              </li>
      </>
    );
};

export default HandleFavorite;