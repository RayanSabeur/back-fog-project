import { faBook, faBookmark, faGamepad, faPlay, faTrash, faV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import HandleFavorite from '../button/HandleFavorite';

const Favorites = ({favorites, games, filteredfav, setFilterdFav }) => {

    let currentuser = useSelector((state) => state.userReducer)
    const [pushobj, setPushObj] = useState({})
    const [pushpath, setPushPath] = useState('')
    const [currentgamefav, setCurrentGameFav] = useState();

       useEffect(() => {
        if(favorites.gameId) {
            games?.map((element) => {
           
                if(element._id === favorites.gameId) {
                setPushObj(element)
                setPushPath(element.picture[0])
                }
                    });
    
        } else {
            setPushPath(favorites?.picture[0])
            setPushObj(favorites)
        }
        

       },[favorites, games])
 
    const deleteGame = (gameId) => {
    
        axios.delete(
            `${process.env.REACT_APP_API_URL}api/gameproduct/${gameId}`,
            {
                withCredentials: true
            }
            ).then((res) => {
                console.log(res)
            })
            .catch((err) => console.log(err))

    }
    const handleStatus = (status, gameid) => {
        console.log('status', status)

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
      

    console.log("g",favorites, games, pushpath)

        return (
            <>
                  
                <div className="card data-card-style" style={{backgroundImage: 'url(' + '..' + pushpath + ')'}} id='card'   >
          
                <div className="content" >   
                <a href={'/game-detail/' + pushobj._id}>    
                <h2 className="title">{pushobj.title}</h2>
                </a> 
                <p className="copy">
                    </p>
                    <ul className='fav-menu'>
                    <HandleFavorite currentgamefav={currentgamefav}    gameid={pushobj._id}   currentuser={currentuser} setCurrentGameFav={setCurrentGameFav} filteredfav={filteredfav} setFilterdFav={setFilterdFav} />
                {
                    currentuser.status == 'admin' ? (<> <span onClick={() => {
                        if (window.confirm('voulez vous supprimer ce jeu ?'))
                        {
                            deleteGame(pushobj._id)
                        }
                    }}> <FontAwesomeIcon icon={faTrash} style={{color: "#7617c4",fontSize: '2rem'}} /></span></>) : ('')
                }
                 </ul>
                </div>
                </div>
                
                        </>
             
    );
};

export default Favorites;