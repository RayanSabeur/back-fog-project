import React from 'react';
import EditDeleteCommenter from '../components/Details/EditDeleteCommenter';
import  { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import DateHelper, {dateParser} from '../components/Utils/DateHelper';
import Navbar from '../components/Navigation/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBookmark, faCircleXmark, faGamepad, faPen, faTrash, faXmark,faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import {faPlayCircle as anotherfaPlayCircle, faBookmark as anotherfaBookmark} from '@fortawesome/free-regular-svg-icons'
import { useSelector } from 'react-redux';
import {  faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as anotherFaStar } from '@fortawesome/free-regular-svg-icons'
import ModalReview from '../components/Reviews/ModalReview';
import ReviewComment from '../components/Reviews/ReviewComment';


const Review = ({uid}) => {
    const navigate = useNavigate(); 
    const [signUp, setSignUp] = useState(true);
    const game = useParams().id;
    const [currentgame, setCurrentGame] = useState([])
    const [currentreviewcomments, setCurrentReviewComments] = useState([])
    const [currentmsg, setCurrentMsg] = useState()
    const [reviews, setReviews] = useState([])
    const [textcomment, setTextComment] = useState('')
    const currentuser = useSelector((state) => state.userReducer);
    const currentuserfav = useSelector((state) => state.userReducer).favoris;
    // const gameid = useParams().id;
    const reviewid = useParams().id;
    const gamepseudo = useParams().postername

    const [isAuthor, setIsAuthor] = useState(false);
    const [edit, setEdit] = useState(false);
    const [currentgamefav, setCurrentGameFav] = useState();
    const [user, setUser] = useState({user: []})

    const reviewTrend = Object.keys(reviews).map((i) => reviews[i])
    let sortedArrayReviews = reviewTrend.filter((review) => 
    review.gameId == '').slice(0, 5)

    useEffect(() => {

    //   const fetchAllReviews = async () => {
    //     const res = await axios.get(`${process.env.REACT_APP_API_URL}api/user/review/all`)
    //     setReviews(res.data)
    // }

    const fetchCurrentReview = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}api/user/review/currentreview/${reviewid}`)
        setReviews(res.data)
    }

    fetchCurrentReview()

      
    //  fetchAllReviews() 
      const fetchCurrentGame = () => {
      axios.get(
            `${process.env.REACT_APP_API_URL}api/gameproduct/details/${reviews?.gameId}`,
            ).then((res) => {
                setCurrentGame(res.data.game)
            })
            .catch((err) => console.log(err))
      }
      fetchCurrentGame()



      const fetchAllComments = () => {
      axios.get(`${process.env.REACT_APP_API_URL}api/user/review/allcomments/${reviewid}`).then(
        (res) => {
        setCurrentReviewComments(res.data)
      })
      .catch((err) => console.log(err))
    }
    fetchAllComments()
//     const fetchCurrentUser =  async() => {
//    try{
//     await axios.get(`${process.env.REACT_APP_API_URL}api/user/${uid}`).then((res) => {

//       const reviewTrend = Object.keys(res.data.favoris).map((i) => res.data.favoris[i])
//       let rr = reviewTrend.find((res) => {
//         return res.gameId == ''
//       })
//       setCurrentGameFav(rr.status);
//     })
   
//     console.log('iu',user)
//    } catch(err) {
//     console.log(err)
//    }
//       };
//       fetchCurrentUser();
    
    const checkAuthor = () => {
      // console.log(isAuthor, edit)
      // if (currentuser._id === comment.commenterId) {
      //     console.log( 'crr', currentuser._id,comment.commenterId )
      //     setIsAuthor(true);
      //   }
  };
  checkAuthor();
    },[game, uid, user, reviewid, reviews.gameId])
    

    console.log('LE RRRRRRRRRRRRRRRRRRRRRRRRR',reviews)
    const ratingReview = (rating) => {
        let ratingvar = [];
        let r = rating;
        if( r === 1) ratingvar = [true, false,false, false, false]
        if( r === 2)  ratingvar = [true, true,false, false, false]
        if( r === 3) ratingvar = [true, true,true, false, false]
        if( r === 4) ratingvar = [true, true,true, true, false]
        if( r === 5) ratingvar = [true, true,true, true, true] 

        return (
        <>
         {
          ratingvar.map(
            (elm) => {
            return(
              <>
                <FontAwesomeIcon icon={elm == false ? anotherFaStar : elm == true ? faStar : ''} style={{color: "#7617c4", fontSize: '2rem'}}/>
              </>
            )
          })
         }
        </>
        )
      }

      const getRecommandation = (rating) => { 

        let rate;

        if(rating === 5 ) rate = 'tres recommandé';
        if( rating === 4)  rate = 'recommander';
        if( rating === 3)  rate = 'recommander';
        if( rating === 2)  rate = 'non recommander';
        if( rating === 1)  rate = 'non recommander';
        if( rating === 0)  rate = 'non recommander';
        
        return( <span> {rate} </span>)
      }
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
    const handleDelete = async (review) => {
     await axios.delete(
        `${process.env.REACT_APP_API_URL}api/user/review/${review}`,
        {
            withCredentials: true
        }
        ).then((res) => {
            console.log(res)
            navigate('/game-library')
            window.location.reload()
        })
        .catch((err) => console.log(err))
    }
    let [modalIsOpen, setIsOpen] = useState(false);
    function openModal() {
        setIsOpen(true);
      }
 
      const handleComment = async (e) => {
        e.preventDefault();
        const comment = {
          commenterId: currentuser._id,
          commenterPseudo: currentuser.pseudo,
          text: textcomment,
          reviewid: reviews._id,
        }
    
        return await axios({
          method: "patch",
          url:   `${process.env.REACT_APP_API_URL}api/user/review/comment-review/${reviews._id}`,
          data: comment,
          withCredentials: true
        })
          .then((res) => {
            console.log(res)        
          })
          .catch((err) => console.log(err));
      };
      
      const handleEditComment = (commenterId) => {
        setEdit(!edit)
        setCurrentMsg(commenterId);

      }
      const handleDeleteComment = (commentid) => {

      
         axios({
          method: "patch",
          url:     `${process.env.REACT_APP_API_URL}api/user/review/delete-comment-review/${reviews._id}`,
          data: {commentid},
          withCredentials: true
        }).then((res) => {
            console.log(res)
           
          })
          .catch((err) => console.log(err))
        
      }

     

      console.log('currentCOMMENTREVIEWS',currentreviewcomments)
      console.log('aaaaaaaaaaaaaaaaaa', currentmsg)


    return (
        <>
        <Navbar setSignUp={setSignUp} signUp={signUp}/>
        <div className='detail-review-main' role='main'>
           <h1> Test de : <a href="">{currentgame?.title}</a> <span style={{marginTop: '1rem'}}> 
     

   
          
             
            
                {
                    currentuser?._id == reviews?.posterId || currentuser?.status == 'admin' ? (<>
                     <span onClick={() => {
                        if (window.confirm('voulez vous supprimer ce jeu ?'))
                        {
                            handleDelete(reviews._id)
                        }
                    }}> 
                     <FontAwesomeIcon icon={faTrash} style={{color: "#7617c4",fontSize: '2rem'}} />
                    </span>
             
                    
                  <span onClick={openModal}>
                    <FontAwesomeIcon icon={faPen} style={{color: "#7617c4",fontSize: '2rem'}} /></span>
                  {
                    modalIsOpen == true ? (
                    <>
                        <ModalReview
                        modalIsOpen={modalIsOpen}
                        style={customStyles}
                        setIsOpen={setIsOpen}
                        action={'edit'}
                        review={reviews}
                        game={currentgame}
                        currentuser={gamepseudo}
                        />
                    </>
                    ) : (
                    ""
                    )
                }
                    </>) : ('')
                }
            
            </span></h1>
        <br/>
               <div className='container-detail-game'>
        <div className='detail-review-section-left'>
     
             <div className='left-side-img-review'>
              {reviews?.pictures && <> <img src={reviews?.pictures[0]} alt='imggame' className='img-review-section'></img> </>}
              <div className='tags-section'>
             
                <ul class="tags">

                 {
                    currentgame?.genres?.map((tag) => {
                        return (
                        <>           
                            <li><a href="#" class="tag">{tag}</a></li>
                        </>
                        )
                    })
                 }
                </ul>
              </div>
          
                </div>

        <div id='right-side-details-review' className='row mx-0 my-3 detail-game-section-desc'>
        <div className='container-comment-form-review'>
<div className="comments-form">
        <form onSubmit={handleComment} >
          <ul>
            <li>
              <textarea
                name="comment"
                placeholder="Comment"
                onChange={(e) => setTextComment(e.target.value)}
                required
              />
            </li>
            <li>
              <input type="submit" value="Post" />
            </li>
          </ul>
        </form>
      </div>
<div className="comments-list">
  
{
    currentreviewcomments?.slice(0,5).map((comment) => {

        return (
            <>
              <ReviewComment  comment={comment}/>
            </>
        )
    })
}
  </div>
  </div>
           
        </div>
        
        </div>

        <div className='menu-profil'>
          <ul>

          </ul>
        </div>

 
        <main className='mainDetailGame' role='main' >
         <div className='container'>

        <div class="row mx-0 home-heading">
		
		</div>

        <div class="page-content">
     
        </div>
</div>

<hr/>

 
<div className='reviewcontent'>
<div className="title-review-desc">

<div class="px-0">
    <div class="test2" id="news-article">
        <h1> {reviews?.title}</h1>
    </div >
    <div className='tags-section'>
             <span className='plateformtag'>testé sur 
             <ul className="tags" >
                <li ><a href="/D"  style={reviews.plateform === 'PlayStation' ?
                  {backgroundColor: '#006FCD', color: 'white' } :
                 reviews.plateform == 'Xbox' ? { backgroundColor:'#2ca243'} :
                 reviews.plateform == 'Switch' ? { backgroundColor:'red'} : {listStyle: 'none'}} className="tag">
                    
                    {reviews.plateform}</a></li>
             </ul></span>
             
           </div>
    <div className='desc-review'>
    <p>{reviews.description}</p>
</div>

    
</div>
</div>


<div className='detail-review-section-right'>

<div className='left-side-img-review'>
              {reviews?.pictures && <>
               <img src={reviews?.pictures[1] ? reviews?.pictures[1] : reviews?.pictures[0]} alt='imggame' className='img-review-section'></img>
           
                </>}
              <div className='detail-game-add-review'>
                  {
                       getRecommandation(reviews?.rating)
                 }
               </div>
               <div className="col-rating-view">
        <p>{ratingReview(reviews?.rating)}</p>
      </div>
</div>
</div>
</div>
        </main>
 
      
     
        </div>
       
        </div>
    
        </>
    );
};

export default Review;