import { faBook, faGamepad, faPlay, faTrash, faV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


const Favorites = ({favorites, games }) => {

    let currentuser = useSelector((state) => state.userReducer)
    const [pushobj, setPushObj] = useState({})
    const [pushpath, setPushPath] = useState('')

       useEffect(() => {
        if(favorites.gameId) {
            games.map((element) => {
           
                if(element._id === favorites.gameId) {
                setPushObj(element)
                setPushPath(element.picture[0])
                }
                    });
    
        } else {
            setPushPath(favorites.picture[0])
        setPushObj(favorites)
        }
        

       },[favorites])
       
       let divStyle = {
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundImage: 'url(' + '..' + pushpath + ')',
    }
 
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

    console.log("g",favorites, games, pushpath)

        return (
            <>
                 {/* <a href={'/game-detail/' + pushobj._id}>        */}
                <div class="card" style={divStyle} id='card'   >
          
                <div class="content" >    
                <h2 class="title">{pushobj.title}</h2>
                <p class="copy">
                    </p>
                    <ul className='fav-menu'><li><FontAwesomeIcon icon={faPlay} style={{color: "#7617c4", fontSize: '2rem'}} /></li> 
                <li><FontAwesomeIcon icon={faGamepad} style={{color: "#7617c4", fontSize: '2rem'}} /></li>
                <li> <FontAwesomeIcon icon={faBook} style={{color: "#7617c4", fontSize: '2rem'}} /> </li>
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
                {/* </a>  */}
                        </>
             
    );
};

export default Favorites;