import React, { useContext, useEffect, useState } from 'react';
import ProfileQuickView from '../profile/ProfileQuickView';
import axios from 'axios';
import { UidContext } from '../ContextApi/uidContext';
import Card from './Card';

const WelcomeCard = () => {

    const uid = useContext(UidContext);
    const [user, setUser] = useState([])
    const [reviewuser, setReviewUser] = useState({})
    const [games, setGames] = useState({})

    useEffect(() => {
    
        const fetchUser = async ()=> {
        const res =  await axios.get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
        setUser([res.data])         
        };

        const fetchReviewUser = async () => {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}api/user/review/${uid}`)
            setReviewUser(res.data)
        }

        const fetchAllGames = async () => {
            const res = await axios.get(`${process.env.REACT_APP_API_URL}api/gameproduct`)
            setGames(res.data)
        }
        
        fetchUser();
        fetchReviewUser();
        fetchAllGames();

       }, [uid])
    
       const gamesTrend = Object.keys(games).map((i) => games[i]) //on s'est recupe en mode objet nos poste pour faire un sort (un trie)
       let sortedArray = gamesTrend.sort(
        (a,b) => {
           return b.likers.length - a.likers.length;
       }).slice(0,5)
    return (
        <main className='main' role='main'>
         <div className='container'>
        <div id='profile-quickview' className='row mx-0 my-3'>
            <ProfileQuickView user={user} reviewlength={reviewuser.length}/>
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

<div class="row mx-0 mb-3 title-recent-review">
		<div class="px-0">
			<div class="test2" id="news-article">
				<h1>- Les reviews du mois (octobre)</h1>
			</div>
            
		</div>
      
	</div>
      <hr/>
<div className='reviewcontent'>

<div class="blog">

<div class="blog-card">
    <div class="description">
      <h1>Learning to Code</h1>
      <h2>Opening a door to the future</h2>
      <p> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.</p>
      <p class="read-more">
        <a href="#">Read More</a>
      </p>
    </div>
  </div>
  <div class="blog-card alt">

    <div class="description">
      <h1>Mastering the Language</h1>
      <h2>Java is not the same as JavaScript</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.</p>
      <p class="read-more">
        <a href="#">Read More</a>
      </p>
    </div>
  </div>
  <div class="blog-card alt">

    <div class="description">
      <h1>Mastering the Language</h1>
      <h2>Java is not the same as JavaScript</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.</p>
      <p class="read-more">
        <a href="#">Read More</a>
      </p>
    </div>
  </div>
  <div class="blog-card alt">

    <div class="description">
      <h1>Mastering the Language</h1>
      <h2>Java is not the same as JavaScript</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.</p>
      <p class="read-more">
        <a href="#">Read More</a>
      </p>
    </div>
  </div>
  <div class="blog-card alt">

    <div class="description">
      <h1>Mastering the Language</h1>
      <h2>Java is not the same as JavaScript</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.</p>
      <p class="read-more">
        <a href="#">Read More</a>
      </p>
    </div>
</div>
</div>

    <div class="test">

<div class="description">
  <h1>Mastering the Language</h1>
  <h2>Java is not the same as JavaScript</h2>
  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ad eum dolorum architecto obcaecati enim dicta praesentium, quam nobis! Neque ad aliquam facilis numquam. Veritatis, sit.</p>
  <p class="read-more">
    <a href="#">Read More</a>
  </p>
</div>
  </div>
</div>
        </main>
    );
};

export default WelcomeCard;