import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../Navigation/Navbar';
import { useNavigate, useParams } from 'react-router';
import axios from 'axios';
import DateHelper, { dateParser, timestampParser } from '../Utils/DateHelper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faBookmark, faCircleXmark, faGamepad, faPen, faTrash, faXmark,faPlayCircle, faComment, faCommentAlt, faCommentSms, faComments, faShare, faMessage } from '@fortawesome/free-solid-svg-icons';
import {faPlayCircle as anotherfaPlayCircle, faBookmark as anotherfaBookmark} from '@fortawesome/free-regular-svg-icons'
import { useSelector } from 'react-redux';
import ModalComponent from '../admin/Modal/Modal';
import ReviewQuickView from '../Reviews/ReviewQuickView';
import EditDeleteCommenter from './EditDeleteCommenter';
import { UidContext } from '../ContextApi/uidContext';
import HandleFav from '../button/HandleFavorite';
import HandleFavorite from '../button/HandleFavorite';
import GameCommentPost from './GameCommentPost';

const GameComment = ({comment}) => {

    const navigate = useNavigate(); 
    const [signUp, setSignUp] = useState(true);
    const [showComments, setShowComments] = useState(false);
    const game = useParams().id;
    const [currentgame, setCurrentGame] = useState([])
    const [currentgamecomments, setCurrentGameComments] = useState([])
    const [currentmsg, setCurrentMsg] = useState()
    const [reviews, setReviews] = useState({})
    const [textcomment, setTextComment] = useState('')
    const currentuser = useSelector((state) => state.userReducer);
    const currentuserfav = useSelector((state) => state.userReducer).favoris;
    const gameid = useParams().id;

    const [isAuthor, setIsAuthor] = useState(false);
    const [edit, setEdit] = useState(false);
    const [currentgamefav, setCurrentGameFav] = useState();
    const [user, setUser] = useState({user: []})

    const handleDelete = async (game) => {
        console.log('delete', game)
       await axios.delete(
          `${process.env.REACT_APP_API_URL}api/gameproduct/${game}`,
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
            game: gameid,
          }
          console.log(comment, gameid)
          return await axios({
            method: "patch",
            url:   `${process.env.REACT_APP_API_URL}api/gameproduct/commentgame/${gameid}`,
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
            url:     `${process.env.REACT_APP_API_URL}api/gameproduct/delete-commentgame/${gameid}`,
            data: {commentid},
            withCredentials: true
          }).then((res) => {
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

        
    return (
        <>
        <div className="comment">

    <h4><a href={'/profil/' + comment.pseudo} style={{fontSize: '20px'}}>{comment.pseudo}</a> says</h4>
    <p className="timestamp">
      {dateParser(comment.createdAt)}
                {comment.commenterId === currentuser._id && (
   <>   
      <span onClick={() => {setCurrentMsg(comment.id); setEdit(!edit)} }>
        {
          edit == true && comment.id == currentmsg ? (
            <>
          <FontAwesomeIcon icon={faCircleXmark} style={{color: "#7617c4",fontSize: '1.5rem', marginLeft: '10px'}}/>
            </>
            ) : (
            <>
              <FontAwesomeIcon icon={faPen} style={{color: "#7617c4",fontSize: '1.5rem', marginLeft: '10px'}} />
              
            </>
              )
        }
    
      </span>

      <span onClick={() => {
                           if (window.confirm('voulez vous supprimer ce commentaire ?'))
                           {
                              setCurrentMsg(comment.id)
                              handleDeleteComment(comment.id);
                           }
                       }}><FontAwesomeIcon icon={faTrash} style={{color: "#7617c4",fontSize: '1.5rem', marginLeft: '10px'}} /> </span> 
     </>
           )}
              </p>
    
    <p style={edit == true && comment.id == currentmsg ? {display: 'none', color: '#9DAED2',fontSize: '20px'} : {color: 'black', color: '#9DAED2',fontSize: '20px', wordBreak: 'break-all'}}>{comment.text}</p>
    
      <EditDeleteCommenter comment={comment}  edit={edit} setEdit={setEdit} currentmsg={currentmsg} action={'editcommentgame'} currentelm={comment.id}/>
      <div className="card-footer">
      <div className="comment-icon">
                  <FontAwesomeIcon icon={faMessage}   onClick={() => setShowComments(!showComments)} />
                  <span>{comment.comments?.length}</span>
                </div>
                {/* <LikeButton post={post} /> */}
              
              </div>
            </div>
            {showComments && <GameCommentPost post={comment}  edit={edit} setEdit={setEdit}/> }
       <hr/>
     
            </>
    );
};

export default GameComment;