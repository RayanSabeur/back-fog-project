import React, { useContext, useEffect, useState } from 'react';
import ProfileQuickView from '../profile/ProfileQuickView';
import axios from 'axios';
import { UidContext } from '../ContextApi/uidContext';
import Card from './Card';
import DateHelper, { dateParser } from '../Utils/DateHelper';
import ReviewQuickView from '../Reviews/ReviewQuickView';
import { Icon } from '@iconify/react';
import { useDispatch, useSelector } from 'react-redux';


const WelcomeCard = () => {

    const uid = useContext(UidContext);
    const [user, setUser] = useState([])
    const [reviewuser, setReviewUser] = useState({})
    const [reviews, setReviews] = useState({})
    const usersData = useSelector((state) => state.userReducer)
    const games = useSelector((state) => state.gamesReducer)
    console.log('games',games)
    useEffect(() => {

        const fetchReviewUser = async () => {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}api/user/review/${uid}`)
            setReviewUser(res.data)
        }


        const fetchAllReviews = async () => {
          const res = await axios.get(`${process.env.REACT_APP_API_URL}api/user/review/all`)
          setReviews(res.data)
      }
        
        fetchReviewUser();
        fetchAllReviews()

       }, [uid])
       
    

       
       const gamesTrend = Object.keys(games).map((i) => games[i]) //on s'est recupe en mode objet nos poste pour faire un sort (un trie)
       let sortedArray = gamesTrend.sort(
        (a,b) => {
           return b.likers.length - a.likers.length;
       }).slice(0,5)

       let sortedArrayGames =  gamesTrend.filter((game) => 
       DateHelper(game.release[0]) != false
       ).slice(0,9)
       console.log('games',sortedArrayGames)

       const reviewTrend = Object.keys(reviews).map((i) => reviews[i])

       let sortedArrayReviews = reviewTrend.filter((review) => 
            DateHelper(review.release[0]) != false
       )


       const findPlateForms = (gamePlateforms) => {
        let element;
        if(gamePlateforms === 'PC') {
            element = <Icon icon="bi:pc" color="#7617c4" />
        }
        if(gamePlateforms === 'Playstation') {
            element = <Icon icon="ri:playstation-fill" color="#7617c4" />
        }
        if(gamePlateforms === 'Nintendo Switch') {
            element =   <Icon icon="mdi:nintendo-switch" color="#7617c4" />
        }
        if(gamePlateforms === 'Xbox') {
            element = <Icon icon="ri:xbox-fill" color="#7617c4" />
        }

        return element;
   }
    


    return (
        <main className='main' role='main'>
         <div className='container'>
        <div id='profile-quickview' className='row mx-0 my-3'>
            <ProfileQuickView user={usersData} reviewlength={reviewuser.length}/>
        </div>
        <hr/>
        <div class="row mx-0 home-heading">
			<h2>Popular this Month - <a href="/games/lib/popular/">See More</a></h2>
		</div>

        <div class="page-content">
            {
                sortedArray.map((card, index) => {

                    return (
                        <> 
                            <Card card={card} index={index}/>
                        </>
                    )
                })
            }         
        </div>
</div>
<hr/>
<div class="row mx-0 mb-3 title-recent-review">
		<div class="px-0">
			<div class="test2" id="news-article">
				<h1>- Les reviews du mois d'Octobre</h1>
			</div>
            
		</div>
      
	</div>
 
<div className='reviewcontent'>

<div class="blog">

{
 sortedArrayReviews.map((card,index) => {
    return (
      <ReviewQuickView reviewSorted={card} index={index}/>
    )
  })
}
  
</div>

    <div class="test">
    <div> <h1>Les nouveautés du mois</h1></div>
{
    sortedArrayGames.map((game) => {

        return (
            <>
        <div class="description">
 
        <div> <img src={'..' + game.picture[0]} className='quickviewNewRelease'/></div>
         

       <div> 
        <h1>{game.title}</h1>
        <div><ul className='details-quickview-release-games'>
            <li>
                {dateParser(game.release[0])}
                </li>
                <li>
                   {game.plateform.map((allgamesplateform) => {
                     return findPlateForms(allgamesplateform)
                   })}
            </li>
            </ul> 
            
            </div>
        <p className='desc-newgamesrelease'>{game.description}</p>
       </div>
        </div>
       <hr/>
            </>
        )
    })
}
  </div>
</div>
        </main>
    );
};

export default WelcomeCard;