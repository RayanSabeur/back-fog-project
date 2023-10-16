import React, { useEffect, useState } from 'react';
import Navbar from '../Navigation/Navbar';
import { useParams } from 'react-router';
import axios from 'axios';
import { dateParser } from '../Utils/DateHelper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faGamepad, faPen, faPlay, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';
import ModalComponent from '../admin/Modal/Modal';

const GameDetails = () => {
    const [signUp, setSignUp] = useState(true);
    const game = useParams().id;
    const [currentgame, setCurrentGame] = useState([])
    let currentuser = useSelector((state) => state.userReducer)
    useEffect(() => {
        
      const fetchCurrentUser = () => {
      axios.get(
            `${process.env.REACT_APP_API_URL}api/gameproduct/details/${game}`,
            ).then((res) => {
                setCurrentGame(res.data.game)
            })
            .catch((err) => console.log(err))
      }
      fetchCurrentUser()
    },[game])
    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          width:'40%',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '1px 2px #888888',
          zIndex: 1,
          height: '50%'
        },
      };
    const handleEdit = (game) => {

    }
    let [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
      }

    return (
        <>
        <Navbar setSignUp={setSignUp} signUp={signUp}/>
        <div className='detail-game-main' role='main'>
               <div className='container-detail-game'>
        <div className='detail-game-section'>
            
             <div>
              {currentgame.picture && <> <img src={currentgame.picture[0]} alt='imggame' className='img-detail-section'></img> </>}
              <div className='detail-game-add-review'>
                <div >ADD UNE REVIEW </div>

              <div style={{marginTop: '1rem'}}> 
                <ul className='detail-menu-game'>
                <li><FontAwesomeIcon icon={faPlay} style={{color: "#7617c4", fontSize: '2rem'}} /></li> 
                <li><FontAwesomeIcon icon={faGamepad} style={{color: "#7617c4", fontSize: '2rem'}} /></li>
                <li> <FontAwesomeIcon icon={faBook} style={{color: "#7617c4", fontSize: '2rem'}} /> </li>
                {
                    currentuser.status == 'admin' ? (<> <span onClick={() => {
                        if (window.confirm('voulez vous supprimer ce jeu ?'))
                        {
                            handleEdit(currentgame._id)
                        }
                    }}> 
                    </span>
                 <span>   <FontAwesomeIcon icon={faTrash} style={{color: "#7617c4",fontSize: '2rem'}} /></span>
                    
                  <span onClick={openModal}>   <FontAwesomeIcon icon={faPen} style={{color: "#7617c4",fontSize: '2rem'}} /></span>
                  {
                    modalIsOpen == true ? (
                    <>
                        <ModalComponent
                        modalIsOpen={modalIsOpen}
                        style={customStyles}
                        setIsOpen={setIsOpen}
                        action={'edit'}
                        game={currentgame}
                        />
                    </>
                    ) : (
                    ""
                    )
                }
                    </>) : ('')
                }
                 </ul>
            </div>
              </div>
          
                </div>

        <div id='profile-quickview' className='row mx-0 my-3 detail-game-section-desc'>

             <div className='detail-game-section-elm-1' >
                <div style={{display: 'flex'}}> 
                <div className='detail-game-section-elm2'>
            <h1>{currentgame.title}</h1>
            {currentgame.release && currentgame.author  && <p>sortie  le {dateParser(currentgame.release[0])} par
             {currentgame.author.map(
                (elm) => {return <> <a href="">{elm}</a></>
                })
            }
            </p> }
            <p>Genres:</p> 
            {currentgame.genres && currentgame.genres.map((genre) => {
                return ( <a>{genre + ','}</a>)
            })}
            </div>
            <div className='detail-game-section-plateform'>
             <div className='detail-game-section-plateform-elm-1'>    <p>Disponible sur:</p></div>
              <div className='detail-game-section-plateform-elm-1'>
              {
                    currentgame.plateform && currentgame.plateform.map((plateform) => {
                        return (
                        <>
                            <a href="">{plateform} </a>
                        </>
                        )
                    })
                }
              </div>
            </div>
            </div>
             </div>
             <div className='detail-game-section-elm-2'>
              <div>  <p>{currentgame.description}</p></div>
             </div>
        </div>
        
        </div>

        <div className='menu-profil'>
          <ul>

          </ul>
        </div>

 
        <main className='main' role='main'>
         <div className='container'>

        <div class="row mx-0 home-heading">
		
		</div>

        <div class="page-content">
     
        </div>
</div>


 
<div className='reviewcontent'>

<div class="blog">


</div>

    <div class="test">

  </div>
</div>
        </main>
 
      
     
        </div>
       
        </div>
    
        </>
    );

};


export default GameDetails;