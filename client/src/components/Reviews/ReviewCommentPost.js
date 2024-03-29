import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { addComment, getPosts } from "../../actions/post.actions";
// import FollowHandler from "../Profil/FollowHandler";
import EditDeleteCommenter from "../Games/EditDeleteCommenter";
import { useParams } from "react-router";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faEdit,
  faPeace,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

const ReviewCommentPost = ({ post, edit, setEdit }) => {
  const [text, setText] = useState("");
  const [editpost, setEditPost] = useState(false);
  const userData = useSelector((state) => state.userReducer);
  const gameid = useParams().id;
  const [currentmsg, setCurrentMsg] = useState();

  const handleCommentPost = async (e) => {
    e.preventDefault();
    const comment = {
      commenterId: userData?._id,
      commenterPseudo: userData?.pseudo,
      text: text,
    };
    console.log(comment);
    if (text) {
      return await axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}api/user/review/comment-post-review/${post.id}`,
        data: comment,
        withCredentials: true,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDeleteCommentPost = async (e) => {
    e.preventDefault();
    const comment = {
      commenterId: userData?._id,
      commenterPseudo: userData?.pseudo,
      text: text,
    };
    console.log(comment, gameid);
    if (text) {
      return axios({
        method: "patch",
        url: `${process.env.REACT_APP_API_URL}api/user/review/delete-comment-post-review/${post.id}`,
        data: comment,
        withCredentials: true,
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <div className="comments-container">
      {post.comments?.map((comment) => {
        return (
          <div
            className={
              comment.commenterId === userData._id
                ? "comment-container client"
                : "comment-container"
            }
            key={comment._id}
          >
            <div className="right-part">
              <div className="comment-header">
                <div className="pseudo">
                  <h3>
                    <a href="">{comment.commenterPseudo}</a>
                  </h3>
                </div>
                {comment.commenterId === userData._id && (
                  <>
                    <span
                      onClick={() => {
                        setCurrentMsg(comment?._id);
                        setEditPost(!editpost);
                      }}
                    >
                      {edit == true && comment._id == currentmsg ? (
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
                            icon={faEdit}
                            style={{
                              color: "#7617c4",
                              fontSize: "1.5rem",
                              marginLeft: "10px",
                            }}
                          />
                        </>
                      )}
                      <span
                        onClick={() => {
                          if (
                            window.confirm(
                              "voulez vous supprimer ce commentaire ?"
                            )
                          ) {
                            setCurrentMsg(comment._id);
                            handleDeleteCommentPost(comment._id);
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
                    </span>
                  </>
                )}
              </div>

              <p>{comment.text}</p>
              {editpost === true && comment?._id === currentmsg ? (
                <>
                  <EditDeleteCommenter
                    comment={comment}
                    edit={editpost}
                    setEdit={setEditPost}
                    currentmsg={comment._id}
                    action={"editcommentpost"}
                    currentelm={comment._id}
                  />
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        );
      })}
      {userData._id && (
        <form action="" onSubmit={handleCommentPost} className="comment-form">
          <input
            type="text"
            name="text"
            onChange={(e) => setText(e.target.value)}
            value={text}
            placeholder="Laisser un commentaire"
          />
          <br />
          <input type="submit" value="Envoyer"/>
        </form>
      )}
    </div>
  );
};

export default ReviewCommentPost;
