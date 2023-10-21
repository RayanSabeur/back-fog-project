import React, { useContext, useEffect, useState } from 'react';
import ProfileQuickView from '../components/profile/ProfileQuickView';
import { UidContext } from '../components/ContextApi/uidContext';
import axios, { all } from 'axios';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import Card from '../components/Menu/Card';
import Favorites from '../components/Menu/Favorites';
import Navbar from '../components/Navigation/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowDown, faArrowUp, faPlus } from '@fortawesome/free-solid-svg-icons';

const Profil = () => {
    const uid = useContext(UidContext);
    const [user, setUser] = useState({})

    const [reviewuser, setReviewUser] = useState({})

    const [profilmenu, setProfilMenu] = useState('playing')
    const [filteredfav, setFilteredFav] = useState()
    const [reviews, setReviews] = useState()
    const [morecontent, setMoreContent] = useState({go: false, elements: 5})
    let games = useSelector((state) => state.gamesReducer);
    let currentuser = useSelector((state) => state.userReducer)
    let setMenu = ['my top 5', 'playing', 'played', 'wishlist']
    let setMenuAdmin = ['my top 5', 'playing', 'played', 'wishlist', 'addedGames']
    const [signUp, setSignUp] = useState(true);
    const pseudo = useParams().pseudo;

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
        const callApiProfil =() => {
            let fav;
            if(profilmenu != 'addedGames') {
                console.log('dedans',profilmenu)
                fav = user?.favoris?.filter(fav =>  {
                    return fav.status === profilmenu
                });
            }
            else {
            
            fav = games.filter(fav => {
                return fav.posterId == user._id
            })
      
            }
            setFilteredFav(fav?.slice(0, morecontent.elements))
            console.log('gamesss',filteredfav)
             return fav
           }
           callApiProfil()
           
       }, [user._id, pseudo,profilmenu, morecontent])
   
       
       console.log('gamesss',filteredfav)
    console.log('currentuser',  user, pseudo)
    console.log(morecontent)
    return (
        <>
        <Navbar setSignUp={setSignUp} signUp={signUp}/>
        <div className='profil-stats' role='main'>
               <div className='container'>
        <div id='profile-quickview' className='row mx-0 my-3'>
            <ProfileQuickView user={user} reviewlength={reviewuser.length}/>
        </div>
        <hr/>
        <div className='menu-profil'>
          <ul>
            {
                currentuser.status == 'admin' ? (<> 
                          {
                 setMenuAdmin.map((elm) => {
                    return (
                        <>
                         <li onClick={() => setProfilMenu(elm)}>{elm}</li>
                        </>
                    )
                 })
            }
               {/* <li onClick={() => setProfilMenu(elm)}>{elm}</li>               */}
                </>) : (<>
                    {
                setMenu.map((elm) => {
                    return (
                        <>
                         <li onClick={() => setProfilMenu(elm)}>{elm}</li>
                        </>
                    )
                 })
            }
           
            </>)
            }
          </ul>
        </div>

        <hr/>
        <main className='main' role='main'>
         <div className='container'>
        <hr/>
     
        <div>{
                morecontent.go === false ? (<><span onClick={() => setMoreContent({go: true, elements: filteredfav?.length + 1})}><FontAwesomeIcon icon={faArrowUp} /></span></>) : (<><span onClick={() => setMoreContent({go: false, elements: 5})}><FontAwesomeIcon icon={faArrowDown} /></span> </>)
            }</div>
        <div class="page-content-profile">
            
      {
        filteredfav?.length > 0 ? (<>   {
            filteredfav?.map((rev) => {
                return (
                    <>
             
                           <Favorites favorites={rev} games={games}/>  

                    </>
                )
            })
            }   </>) : (<> <p>aucun jeu pour le moment</p> </>)
      }

        </div>
</div>
<hr/>

 
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

export default Profil;