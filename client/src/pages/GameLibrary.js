import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navigation/Navbar";
import { UidContext } from "../components/ContextApi/uidContext";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import Card from "../components/Menu/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faX } from "@fortawesome/free-solid-svg-icons";

const GameLibrary = () => {
  const uid = useContext(UidContext);
  const [signUp, setSignUp] = useState(true);
  let games = useSelector((state) => state.gamesReducer);
  const [filteredGames, setFilteredGames] = useState();
  const [searchList, setSearchList] = useState();

  useEffect(() => {
    const callapi = () => {
      const gamesTrend = Object.keys(games).map((i) => games[i]);
      setFilteredGames(
        gamesTrend.filter((game) => {
          return searchList
            ? game?.title?.toLowerCase().includes(searchList?.toLowerCase())
            : game;
        })
      );
    };
    callapi();
  }, [searchList, games]);

  return (
    <>
      <header>
        <Navbar setSignUp={setSignUp} signUp={signUp} setFilter={setSearchList} />
      </header>
    <main style={{marginBottom : "25rem" }}>
<div className="profil-stats">
  <hr />
  <div className="page-content">
    {filteredGames?.map((card, index) => {
      return (
        <>
          <Card card={card} index={index} />
        </>
      );
    })}
  </div>
  <hr />
</div>
    </main>
    <footer class="footer"> 
        <div>
        <FontAwesomeIcon
          icon={faX}
          style={{
            color: "#7617c4",
            fontSize: "1.5rem",
            marginLeft: "20rem",
            marginTop: "2rem"
          }}
        />
         <FontAwesomeIcon
          icon={faHome}
          style={{
            color: "#7617c4",
            fontSize: "1.5rem",
            marginLeft: "10px",
            marginTop: "2rem"
          }}
        />
        </div>
    </footer>
    </>
  );
};

export default GameLibrary;
