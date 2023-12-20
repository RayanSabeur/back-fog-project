import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navigation/Navbar';
import { UidContext } from '../components/ContextApi/uidContext';
import { useParams } from 'react-router';
import { useSelector } from 'react-redux';
import Card from '../components/Menu/Card';

const GameLibrary = () => {
    const uid = useContext(UidContext);
const [signUp, setSignUp] = useState(true);
let games = useSelector((state) => state.gamesReducer);
let currentuser = useSelector((state) => state.userReducer)
const gametitle = useParams().gametitle

const [filteredGames, setFilteredGames] = useState()
const [searchList, setSearchList] = useState()

// const gamesTrend = Object.keys(games).map((i) => games[i])
// let filteredgames = gamesTrend.filter((game) => {
//     return game?.title?.toLowerCase().includes(gametitle.toLowerCase())
// })

// console.log('tttttttttttt',filteredgames)
    // axios.get()
useEffect(() => {
   const callapi = () => {
    const gamesTrend = Object.keys(games).map((i) => games[i])
        setFilteredGames(gamesTrend.filter((game) => {
            return  searchList ? game?.title?.toLowerCase().includes(searchList?.toLowerCase()) : game
        }
    ))
   }
    callapi()
},[searchList, games])

    return (
        <>
          <Navbar setSignUp={setSignUp} signUp={signUp}  setFilter={setSearchList}/>
         
        <div className='profil-stats' role='main'>
          
        <hr/>
        <div className='page-content'>
        {
            filteredGames?.map((card, index) => {

                return (
                    <> 
                        <Card card={card} index={index}/>
                    </>
                )
            })
            }         
        </div>
        <hr/>
    </div>
     </>
    );
};

export default GameLibrary;