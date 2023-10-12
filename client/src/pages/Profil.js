import React, { useContext, useEffect, useState } from 'react';
import ProfileQuickView from '../components/profile/ProfileQuickView';
import { UidContext } from '../components/ContextApi/uidContext';
import axios from 'axios';
import { useParams } from 'react-router';

const Profil = () => {
    const uid = useContext(UidContext);
    const [user, setUser] = useState({})
    const [reviewuser, setReviewUser] = useState({})
    const [games, setGames] = useState({})
    const [reviews, setReviews] = useState({})
   
    const pseudo = useParams().pseudo;

    useEffect(() => {       
         const fetchCurrentUser = async ()=> {
           const res =  await axios.get(`${process.env.REACT_APP_API_URL}api/user?pseudo=${pseudo}`)
   
       setUser(res.data)       
         };
         fetchCurrentUser();

        const fetchReviewUser = async () => {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}api/user/review/${uid}`)
            setReviewUser(res.data)
        }
        fetchReviewUser();
 

       }, [uid, pseudo])

    return (
        <div className='profil-stats' role='main'>
               <div className='container'>
        <div id='profile-quickview' className='row mx-0 my-3'>
            <ProfileQuickView user={user} reviewlength={reviewuser.length}/>
        </div> 
        </div> 
        </div>
    );
};

export default Profil;