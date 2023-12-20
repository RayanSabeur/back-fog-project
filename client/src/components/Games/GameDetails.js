import React, { useContext, useEffect, useState } from "react";
import Navbar from "../Navigation/Navbar";
import { useNavigate, useParams } from "react-router";
import axios from "axios";
import DateHelper, { dateParser, timestampParser } from "../Utils/DateHelper";
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
  faComment,
  faCommentAlt,
  faCommentSms,
  faComments,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import {
  faPlayCircle as anotherfaPlayCircle,
  faBookmark as anotherfaBookmark,
} from "@fortawesome/free-regular-svg-icons";
import { useSelector } from "react-redux";
import ModalComponent from "../admin/Modal/Modal";
import ReviewQuickView from "../Reviews/ReviewQuickView";
import HandleFavorite from "../button/HandleFavorite";
import GameComment from "./GameComment";

const GameDetails = ({ uid }) => {
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState(true);
  const [showComments, setShowComments] = useState(false);
  const game = useParams().id;
  const [currentgame, setCurrentGame] = useState([]);
  const [currentgamecomments, setCurrentGameComments] = useState([]);
  const [currentmsg, setCurrentMsg] = useState();
  const [reviews, setReviews] = useState({});
  const [textcomment, setTextComment] = useState("");
  const currentuser = useSelector((state) => state.userReducer);
  const gameid = useParams().id;
  let [modalIsOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [currentgamefav, setCurrentGameFav] = useState();
  const [user, setUser] = useState({ user: [] });

  const reviewTrend = Object.keys(reviews).map((i) => reviews[i]);
  let sortedArrayReviews = reviewTrend
    .filter((review) => review.gameId == gameid)
    .slice(0, 5);

  useEffect(() => {
    const fetchAllReviews = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_URL}api/user/review/all`
      );
      setReviews(res.data);
    };

    fetchAllReviews();
    const fetchCurrentGame = () => {
      axios
        .get(`${process.env.REACT_APP_API_URL}api/gameproduct/details/${game}`)
        .then((res) => {
          setCurrentGame(res.data.game);
        })
        .catch((err) => console.log(err));
    };
    fetchCurrentGame();

    const fetchAllComments = () => {
      axios
        .get(
          `${process.env.REACT_APP_API_URL}api/gameproduct/allcomments/${game}`
        )
        .then((res) => {
          setCurrentGameComments(res.data);
        })
        .catch((err) => console.log(err));
    };
    fetchAllComments();
    const fetchCurrentUser = async () => {
      try {
        await axios
          .get(`${process.env.REACT_APP_API_URL}api/user/${uid}`)
          .then((res) => {
            const reviewTrend = Object.keys(res.data.favoris).map(
              (i) => res.data.favoris[i]
            );
            let rr = reviewTrend.find((res) => {
              return res.gameId == gameid;
            });
            setCurrentGameFav(rr.status);
          });

        console.log("iu", user);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCurrentUser();
  }, [game, uid, user, gameid]);

  console.log("currentgamefav", currentgamecomments);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      boxShadow: "1px 2px #888888",
      zIndex: 1,
    },
  };

  const handleDelete = async (game) => {
    await axios
      .delete(`${process.env.REACT_APP_API_URL}api/gameproduct/${game}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        navigate("/game-library");
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

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
    };
    return await axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/gameproduct/commentgame/${gameid}`,
      data: comment,
      withCredentials: true,
    })
      .then((res) => {
        window.location.reload()
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  // const handleEditComment = (commenterId) => {
  //   setEdit(!edit)
  //   setCurrentMsg(commenterId);

  // }
  // const handleDeleteComment = (commentid) => {
  //    axios({
  //     method: "patch",
  //     url:     `${process.env.REACT_APP_API_URL}api/gameproduct/delete-commentgame/${gameid}`,
  //     data: {commentid},
  //     withCredentials: true
  //   }).then((res) => {
  //       console.log(res)

  //     })
  //     .catch((err) => console.log(err))
  // }
  const handleStatus = (status, gameid) => {
    console.log("status", status);

    axios({
      method: "patch",
      url: `${process.env.REACT_APP_API_URL}api/gameproduct/addtofavorite/${currentuser._id}`,
      data: { status, gameid },
      withCredentials: true,
    })
      .then((res) => {
        setCurrentGameFav(res.data.user.status);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Navbar setSignUp={setSignUp} signUp={signUp} />
      <div className="detail-game-main" role="main">
        <div className="container-detail-game">
          <div className="detail-game-section">
            <div className="left-side-img">
              {currentgame.picture && (
                <>
                  {" "}
                  <img
                    src={currentgame.picture[0]}
                    alt="imggame"
                    className="img-detail-section"
                  ></img>{" "}
                </>
              )}
              <div className="detail-game-add-review">
                <span>ADD UNE REVIEW </span>

                <div style={{ marginTop: "1rem" }}>
                  <ul className="detail-menu-game">
                    <HandleFavorite
                      currentgamefav={currentgamefav}
                      faGamepad={faGamepad}
                      gameid={gameid}
                      setCurrentGameFav={setCurrentGameFav}
                      currentuser={currentuser}
                      handleStatus={handleStatus}
                    />
                    {currentuser.status == "admin" ? (
                      <>
                        <span
                          onClick={() => {
                            if (
                              window.confirm("voulez vous supprimer ce jeu ?")
                            ) {
                              handleDelete(currentgame._id);
                            }
                          }}
                        >
                          <FontAwesomeIcon
                            icon={faTrash}
                            style={{ color: "#7617c4", fontSize: "2rem" }}
                          />
                        </span>

                        <span onClick={openModal}>
                          {" "}
                          <FontAwesomeIcon
                            icon={faPen}
                            style={{ color: "#7617c4", fontSize: "2rem" }}
                          />
                        </span>
                        {modalIsOpen == true ? (
                          <>
                            <ModalComponent
                              modalIsOpen={modalIsOpen}
                              style={customStyles}
                              setIsOpen={setIsOpen}
                              action={"edit"}
                              game={currentgame}
                            />
                          </>
                        ) : (
                          ""
                        )}
                      </>
                    ) : (
                      ""
                    )}
                  </ul>
                </div>
              </div>
            </div>
            <div
              id="right-side-details-game"
              style={{ flexBasis: "70%" }}
              className="row mx-0 my-3 detail-game-section-desc"
            >
              <div className="detail-game-section-elm-1">
                <h2 className="title-elm1">{currentgame.title}</h2>
                <hr />
                <div className="detail-game-section-elm2">
                  {currentgame.release && currentgame.author && (
                    <p>
                      sortie le {dateParser(currentgame.release[0])} par
                      {currentgame.author.map((elm) => {
                        return (
                          <>
                            {" "}
                            <p> {elm}</p>
                          </>
                        );
                      })}
                    </p>
                  )}

                  {currentgame.genres &&
                    currentgame.genres.map((genre) => {
                      return (
                        <>
                          {" "}
                          <li>
                            <p href="#" class="tag">
                              {genre}
                            </p>
                          </li>
                        </>
                      );
                    })}

                  <hr />

                  <p>Disponible sur:</p>
                </div>
                <div className="detail-game-section-plateform-elm-1">
                  {currentgame.plateform &&
                    currentgame.plateform.map((plateform) => {
                      return (
                        <>
                          <div className="tags-section">
                            <ul className="tags">
                              <li>
                                <a
                                  href="/D"
                                  style={
                                    plateform === "PlayStation"
                                      ? {
                                          backgroundColor: "#006FCD",
                                          color: "white",
                                        }
                                      : plateform == "Xbox"
                                      ? { backgroundColor: "#2ca243" }
                                      : plateform == "Switch"
                                      ? { backgroundColor: "red" }
                                      : { listStyle: "none" }
                                  }
                                  className="tag"
                                >
                                  {plateform}
                                </a>
                              </li>
                            </ul>
                          </div>
                        </>
                      );
                    })}
                </div>
              </div>
              <hr />
              <div className="detail-game-section-elm-2">
                <h2>Synopsis:</h2>
                <p className="detail-game-section-p">
                  {currentgame.description}
                </p>
              </div>
            </div>
          </div>
          <hr />
          <div className="reviewcontent">
            <div class="review-games-details">
              {sortedArrayReviews.length > 0 ? (
                <>
                  <h2 style={{ marginTop: "1rem", marginBottom: "2rem" }}>
                    Test de {currentgame.title}
                  </h2>
                  {sortedArrayReviews.map((card, index) => {
                    return (
                      <ReviewQuickView reviewSorted={card} index={index} />
                    );
                  })}
                </>
              ) : (
                <>
                  <h2
                    style={{
                      textAlign: "center",
                      marginBottom: "10rem",
                      marginTop: "2rem",
                    }}
                  >
                    {" "}
                    aucune review de ce jeu pour le moment.
                  </h2>
                </>
              )}
            </div>
            <div className="container-comment-form">
              <div className="comments-form">
                <form onSubmit={handleComment}>
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
                {currentgamecomments
                  ?.map((comment) => {
                    return <GameComment comment={comment} />;
                  })
                  .slice(0, 5)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GameDetails;
