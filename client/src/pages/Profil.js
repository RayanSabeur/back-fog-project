import React, { useContext, useEffect, useRef, useState } from 'react';
import ProfileQuickView from '../components/profile/ProfileQuickView';
import { UidContext } from '../components/ContextApi/uidContext';
import axios, { all } from 'axios';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import Favorites from '../components/Menu/Favorites';
import Navbar from '../components/Navigation/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faChevronRight, faPlus } from '@fortawesome/free-solid-svg-icons';
import { dateParser } from '../components/Utils/DateHelper';

const Profil = ({uid}) => {

    const [user, setUser] = useState({user: {}})
    const [reviewuser, setReviewUser] = useState({})
    const [profilmenu, setProfilMenu] = useState('playing')
    const [filteredfav, setFilteredFav] = useState()
    const [filteredfavlength, setFilteredFavLength] = useState()
    const [morecontent, setMoreContent] = useState({go: false, elements: 5})
    let games = useSelector((state) => state.gamesReducer);
    let currentuser = useSelector((state) => state.userReducer)
    let usr = useSelector((state) => state.userReducer)._id
    let setMenu = ['mytop5', 'playing', 'played', 'wishlist']
    let setMenuAdmin = ['mytop5', 'playing', 'played', 'wishlist', 'addedGames']
    const [signUp, setSignUp] = useState(true);
    const pseudo = useParams().pseudo;
    const [currentgamecomments, setCurrentGameComments] = useState()
    const contentprofil = useRef(null);
    

    useEffect(() => {       
        const fetchCurrentUser = async ()=> {
        const res =  await axios.get(`${process.env.REACT_APP_API_URL}api/user?pseudo=${pseudo}`)
   
       setUser(res.data)
         };
         fetchCurrentUser();
        const fetchReviewUser = async () => {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}api/user/review/${user._id}`)
            setReviewUser(res.data)
        }
        fetchReviewUser();
           
       }, [pseudo,user._id])

       useEffect(() => {
        const callApiProfil =() => {
            let fav

            if(currentuser?.status === 'user') {
                const bgmenu = document.querySelector('.' + profilmenu)
                bgmenu.style.background = 'rgb(118, 23, 196)';
                setMenu.forEach((elm) => {
                    if(elm && profilmenu !== elm) {
                        document.querySelector('.' + elm).style.background = 'none'
                    }
                })
            } else  if(currentuser?.status === 'admin') {
                const bgmenu = document.querySelector('.' + profilmenu)
                bgmenu.style.background = 'rgb(118, 23, 196)';
                setMenuAdmin.forEach((elm) => {
                    if(elm && profilmenu !== elm) {
                        document.querySelector('.' + elm).style.background = 'none'
                    }
                })
            }
           
           
            if(profilmenu !== 'addedGames') {
                fav = user.favoris?.filter(fav =>  {
                    return fav.status === profilmenu
                });

                if(fav === true) {
                    contentprofil.current.classList.remove('page-content-profile')
                    contentprofil.current.classList.add('page-content-profile-no-data')
                } else if (!fav) {
                    contentprofil.current.classList.remove('page-content-profile-no-data')
                    contentprofil.current.classList.add('page-content-profile')
                } 
            }
            else {  
            fav = games?.filter(fav => {
                return fav.posterId == user._id
            })
            setFilteredFavLength(fav.length)
            }
            morecontent.go === true ? setFilteredFav(fav?.slice(0, fav.length)) : setFilteredFav(fav?.slice(0, 5))
             return fav
           }
           callApiProfil()
       },[profilmenu,user?.favoris, morecontent.go])



       useEffect(() => {
        const callCommentOfGamesFav = async () => {
            if(user._id != null) {
                const res = await axios.get(`${process.env.REACT_APP_API_URL}api/user/allcomments/${user._id}`)
                setCurrentGameComments(res?.data.commentsuser)
            }
           }
           callCommentOfGamesFav()
       },[user._id])



    return (
        <>
        <Navbar setSignUp={setSignUp} signUp={signUp}/>
       
        <div className='profil-stats' role='main'>
            <div className='container'>

                <div id='profile-quickview' className='row mx-0 my-3'>
                    <ProfileQuickView user={user} reviewlength={reviewuser?.length} userId={user?._id} location={"profil"}/>
                    </div>
                        <hr/>

                    <div className={currentuser?.status === 'admin' ? 'sous-menu' : 'sous-menu-user' }>
                    {
                        currentuser.status == 'admin' ? (<> 
                                    {
                            setMenuAdmin.map((elm) => {
                            return (
                                <>
                                    <div style={{height: '3rem'}}   className={elm} onClick={() => setProfilMenu(elm)} > <p>{elm}</p></div>
                                </>
                            )
                            })
                    }
                        </>) : (<>
                            {
                                setMenu.map((elm) => {
                                    return (
                                        <>
                                            <div  style={{height: '3rem'}}  className={elm} onClick={() => setProfilMenu(elm)}> <p>{elm}</p></div>
                                        </>
                                    )
                                })
                            }
                    </>)
                    }
                    </div>


                    <hr/>
                    <div className='container'>
                    <hr/>
                    {
                        <><div className='up-down-game-profil'><span onClick={() => setMoreContent({go: true, elements: filteredfavlength})}><FontAwesomeIcon icon={faArrowDown} /></span><span onClick={() => setMoreContent({go: false, elements: 5})}><FontAwesomeIcon icon={faArrowUp} /></span></div> </>
                    }
                    <div class="page-content-profile" ref={contentprofil}>
                    {
                    filteredfav?.length > 0 ? (<>   {
                    filteredfav?.map((rev) => {
                        return (
                            <>         
                                <Favorites favorites={rev} games={games}/>  
                            </>
                        )
                    })
                    }   </>) : (<> <p>aucun jeu pour le moment.</p> </>)
                    }

                            </div>
                        </div>
                    <hr/>
                    <div className='bottom-section-profil'>

                    <div class="container-currentuser-comment">
                    {
                    currentgamecomments?.map((currentusergamecomment) => {
                    return (
                    <>
                    <div className="currentuser-comment">

                          <div className='user-info-comment-profil'>
                            <h4>
                              <a href={'/profil/'} style={{fontSize: '20px'}}>{currentuser?.pseudo}</a> a commenté {currentusergamecomment.titlegame} </h4>
                                    <p className="">  {dateParser(currentusergamecomment.createdAt)}
                                    <p className='text-comment-quickview'>{currentusergamecomment.text.slice(0, 30)}...</p>
                                    </p>
                              </div>  
                        <div className='arrow-comments'>
                    <p>
                        <a href={'/game-detail/' + currentusergamecomment.gameId}><FontAwesomeIcon icon={faChevronRight} /></a>
                    </p>
                        </div>              
                            <img src={'..' + currentusergamecomment.gamepicture} alt="comment of user" style={{width: '10rem'}}/>
                        </div>
                        
                    </>)

                        })
                    }
                </div>
            </div> 
            </div>
</div>
    
        </>
    );
};

export default Profil;