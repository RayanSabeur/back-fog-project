import React, { useContext, useEffect, useState } from 'react';
import ProfileQuickView from '../profile/ProfileQuickView';
import axios from 'axios';
import { UidContext } from '../ContextApi/uidContext';
import Card from './Card';
import DateHelper, { dateParser } from '../Utils/DateHelper';
import ReviewQuickView from '../Reviews/ReviewQuickView';
import { Icon } from '@iconify/react';
import {useSelector } from 'react-redux';


const WelcomeCard = () => {
  const uid = useContext(UidContext);
  const [user, setUser] = useState([]);
  const [reviewuser, setReviewUser] = useState({});
  const [reviews, setReviews] = useState({});
  const usersData = useSelector((state) => state.userReducer);
  const games = useSelector((state) => state.gamesReducer);

  useEffect(() => {
    const fetchReviewUser = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}api/user/review/${uid}`
      );
      setReviewUser(res.data);
    };

    const fetchAllReviews = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}api/user/review/all`
      );
      setReviews(res.data);
    };

    fetchReviewUser();
    fetchAllReviews();
  }, [uid]);

  const gamesTrend = Object.keys(games).map((i) => games[i]);
  let sortedArray = gamesTrend
    .sort((a, b) => {
      return b.likers.length - a.likers.length;
    })
    .slice(0, 5);

  let sortedArrayGames = gamesTrend
    .filter((game) => DateHelper(game.release[0]) !== false)
    .slice(0, 9);

  const reviewTrend = Object.keys(reviews).map((i) => reviews[i]);

  let sortedArrayReviews = reviewTrend.filter(
    (review) => DateHelper(review.release[0]) !== false
  );

  const findPlateForms = (gamePlateforms) => {
    let element;
    if (gamePlateforms === "PC") {
      element = <Icon icon="bi:pc" color="#7617c4" />;
    }
    if (gamePlateforms === "PlayStation") {
      element = <Icon icon="ri:playstation-fill" color="#7617c4" />;
    }
    if (gamePlateforms === "Nintendo") {
      element = <Icon icon="mdi:nintendo-switch" color="#7617c4" />;
    }
    if (gamePlateforms === "Xbox") {
      element = <Icon icon="ri:xbox-fill" color="#7617c4" />;
    }

    return element;
  };

  return (
    <div>
      <div className="container">
        <div id="profile-quickview" className="row mx-0 my-3">
          <ProfileQuickView
            user={usersData}
            reviewlength={reviewuser.length}
            location={"homepage"}
          />
        </div>
        <hr />
        <div className="row mx-0 home-heading" style={{marginTop: '3rem'}}>
          <h1>Populaire ce mois ci </h1>
        </div>

        <div class="page-content">
          {sortedArray.map((card, index) => {
            return (
              <>
                <Card card={card} index={index} />
              </>
            );
          })}
        </div>
      </div>
      
      <hr />
      <div class="row mx-0 mb-3 title-recent-review">
        <h2>Les reviews du mois</h2>
      </div>

      <div className="reviewcontent">
        <div class="blog">
          {sortedArrayReviews.map((card, index) => {
            return <ReviewQuickView reviewSorted={card} index={index} />;
          })}
        </div>
        <div class="test">
          <h2 className="title-news">Les nouveautés du mois</h2>
          {sortedArrayGames.map((game) => {
            return (
              <>
                <div class="description">
                  <div>
                    {" "}
                    <img
                      src={".." + game.picture[0]}
                      alt="game"
                      className="quickviewNewRelease"
                    />
                  </div>

                  <div>
                    <h2>{game.title}</h2>
                    <div>
                      <ul className="details-quickview-release-games">
                        <li>{dateParser(game.release[0])}</li>
                        <li>
                          {game.plateform.map((allgamesplateform) => {
                            return findPlateForms(allgamesplateform);
                          })}
                        </li>
                      </ul>
                    </div>
                    <p className="desc-newgamesrelease">
                      {game.description.slice(0, 200)}...
                    </p>
                  </div>
                </div>
                <hr/>
              </>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;