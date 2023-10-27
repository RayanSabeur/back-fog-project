import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { timestampParser } from '../Utils/DateHelper';
import axios from 'axios';

const EditDeleteCommenter = ({comment, edit, setEdit, currentmsg, action, currentelm}) => {

    console.log('su', action)
    const [signUp, setSignUp] = useState(true);
    const game = useParams().id;
    const [textcomment, setTextComment] = useState('')
    let currentuser = useSelector((state) => state.userReducer)
    const gameid = useParams().id;
    const [isAuthor, setIsAuthor] = useState(false);
    const [text, setText] = useState("");

    let textareastyle = {
      width: '100%',
  backgroundColor: '#4E5668',
  border:' none',
  height: '5rem',
    }

      useEffect(() => {

        const checkAuthor = () => {
            // console.log(isAuthor, edit)
            // if (currentuser._id === comment.commenterId) {
            //     console.log( 'crr', currentuser._id,comment.commenterId )
            //     setIsAuthor(true);
            //   }
        };
        checkAuthor();
      }, [currentuser._id, comment.commenterId]);
      let [modalIsOpen, setIsOpen] = useState(false);
      function openModal() {
          setIsOpen(true);
        }


        
        
        console.log(currentmsg , comment._id)

        const handleEditGameComment = async (e) => {
          e.preventDefault()
          
          return await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/gameproduct/edit-comment-game/${gameid}`,
            data: { currentmsg, text},
            withCredentials: true
          })
            .then((res) => {
        
              window.location.reload()
            })
            .catch((err) => console.log(err));
        };
        const handleEditReviews = async (e) => {
          e.preventDefault()

          return await axios({
            method: "put",
            url: `${process.env.REACT_APP_API_URL}api/user/review/edit-comment-review/${currentmsg}`,
            data: { currentmsg, text},
            withCredentials: true
          })
            .then((res) => {
           
              window.location.reload()
            })
            .catch((err) => console.log(err));
        };

    return (
      <> 
      {currentmsg == currentelm && edit && (
                   <>
               <form action="" onSubmit={ action == 'editcommentgame' ? handleEditGameComment : action == 'editcommentreview' ? handleEditReviews : action == 'editcommentgamepost' ? 'futurfonceditpostocmment': 'editcommentpost' ? '' : 'futurfuncquieditpostreview' } className="edit-comment-form">

                 <div className='comment-edit-section'>
                   <textarea type="text" name='text' onChange={(e) => setText(e.target.value)} style={ textareastyle} defaultValue={comment.text}/>
                   <input type="submit" value="modifier" className='submit-btn-edit-comment'/>
                  </div>
                   <br />
                   {/* <div className="btn">
                       <span onClick={() => {
                           if (window.confirm('voulez vous supprimer ce commentaire ?'))
                           {
                              handleDeleteComment();
                           }
                       }}
                       > 
                       </span>
                     
                   {/* </div> */}
                   
                   
               </form>
               </>
           )}

            </>
        )


};

export default EditDeleteCommenter;