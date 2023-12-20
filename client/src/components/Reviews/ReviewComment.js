import React from "react";
import EditDeleteCommenter from "../Games/EditDeleteCommenter";
import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import { dateParser } from "../Utils/DateHelper";
import Navbar from "../Navigation/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faBookmark,
  faCircleXmark,
  faGamepad,
  faPen,
  faTrash,
  faXmark,
  faPlayCircle,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";
import {
  faPlayCircle as anotherfaPlayCircle,
  faBookmark as anotherfaBookmark,
} from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as anotherFaStar } from "@fortawesome/free-regular-svg-icons";
import ModalReview from "../admin/Modal/ModalReview";
import ReviewCommentPost from "./ReviewCommentPost";

const ReviewComment = ({ comment }) => {
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState(true);
  const game = useParams().id;
  const [currentgame, setCurrentGame] = useState([]);
  const [currentreviewcomments, setCurrentReviewComments] = useState([]);
  const [currentmsg, setCurrentMsg] = useState();
  const [reviews, setReviews] = useState([]);
  const [textcomment, setTextComment] = useState("");
  const currentuser = useSelector((state) => state.userReducer);
  const currentuserfav = useSelector((state) => state.userReducer).favoris;
  // const gameid = useParams().id;
  const reviewid = useParams().id;
  const gamepseudo = useParams().postername;
  const [showComments, setShowComments] = useState(false);
  const [isAuthor, setIsAuthor] = useState(false);
  const [edit, setEdit] = useState(false);
  const [currentgamefav, setCurrentGameFav] = useState();
  const [user, setUser] = useState({ user: [] });

  const reviewTrend = Object.keys(reviews).map((i) => reviews[i]);
  let sortedArrayReviews = reviewTrend
    .filter((review) => review.gameId == "")
    .slice(0, 5);

  const handleDeleteComment = (commentid) => {
    axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/user/review/delete-comment-review/${reviewid}`,
      data: { commentid },
      withCredentials: true,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  const handleDelete = async (game) => {
    console.log("delete", game);
    await axios
      .delete(`${process.env.REACT_APP_API_URL}api/user/review/${game}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        navigate("/game-library");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };
  let [modalIsOpen, setIsOpen] = useState(false);
  function openModal() {
    setIsOpen(true);
  }

  // const handleComment = async (e) => {
  //   e.preventDefault();
  //   const comment = {
  //     commenterId: currentuser._id,
  //     commenterPseudo: currentuser.pseudo,
  //     text: textcomment,
  //     game: reviewid ,
  //   }
  //   console.log(comment, reviewid)
  //   return await axios({
  //     method: "patch",
  //     url:   `${process.env.REACT_APP_API_URL}api/user/review/comment-review/${reviewid}`,
  //     data: comment,
  //     withCredentials: true
  //   })
  //     .then((res) => {
  //       console.log(res)
  //     })
  //     .catch((err) => console.log(err));
  // };

  // const handleEditComment = (commenterId) => {
  //   setEdit(!edit)
  //   setCurrentMsg(commenterId);

  // }

  // const handleStatus = (status, gameid) => {
  //   console.log('status', status)

  //   axios({
  //     method: "patch",
  //     url:     `${process.env.REACT_APP_API_URL}api/gameproduct/addtofavorite/${currentuser._id}`,
  //     data: {status, gameid},
  //     withCredentials: true
  //   }).then((res) => {
  //     setCurrentGameFav(res.data.user.status)
  //     })
  //     .catch((err) => console.log(err))

  // }

  return (
    <>
      <div className="comment">
        <h4>
          <a href={"/profil/" + comment.pseudo} style={{ fontSize: "20px" }}>
            {comment.pseudo}
          </a>{" "}
          says
        </h4>
        <p className="timestamp">
          {dateParser(comment.createdAt)}
          {comment.commenterId === currentuser._id && (
            <>
              <span
                onClick={() => {
                  setCurrentMsg(comment.id);
                  setEdit(!edit);
                }}
              >
                {edit == true && comment.id == currentmsg ? (
                  <>
                    <FontAwesomeIcon
                      icon={faCircleXmark}
                      style={{
                        color: "#7617c4",
                        fontSize: "1.5rem",
                        marginLeft: "10px",
                      }}
                    />
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon
                      icon={faPen}
                      style={{
                        color: "#7617c4",
                        fontSize: "1.5rem",
                        marginLeft: "10px",
                      }}
                    />
                  </>
                )}
              </span>

              <span
                onClick={() => {
                  if (
                    window.confirm("voulez vous supprimer ce commentaire ?")
                  ) {
                    setCurrentMsg(comment.id);
                    handleDeleteComment(comment.id);
                  }
                }}
              >
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{
                    color: "#7617c4",
                    fontSize: "1.5rem",
                    marginLeft: "10px",
                  }}
                />
              </span>
            </>
          )}
        </p>
        <p
          style={
            edit == true && comment.id == currentmsg
              ? { display: "none", color: "#9DAED2", fontSize: "20px" }
              : {
                  color: "black",
                  color: "#9DAED2",
                  fontSize: "20px",
                  wordBreak: "break-all",
                }
          }
        >
          {comment.text}
        </p>
        <EditDeleteCommenter
          comment={comment}
          edit={edit}
          setEdit={setEdit}
          currentmsg={currentmsg}
          action={"editcommentreview"}
          currentelm={comment.id}
        />
        <div className="card-footer">
          <div className="comment-icon">
            <FontAwesomeIcon
              icon={faMessage}
              onClick={() => setShowComments(!showComments)}
            />
            <span>{comment.comments?.length}</span>
          </div>
        </div>
      </div>
      {showComments && (
        <ReviewCommentPost post={comment} edit={edit} setEdit={setEdit} />
      )}
      <hr />
    </>
  );
};

export default ReviewComment;
