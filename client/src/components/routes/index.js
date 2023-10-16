import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import GameLibrary from '../../pages/GameLibrary';
import Review from '../../pages/Review';
import Navbar from '../Navigation/Navbar';
import { useSelector } from 'react-redux';
import GameDetails from '../Details/GameDetails';

const index = ({uid, signUp ,setSignUp}) => {


    return (
      <>
        <BrowserRouter>
            <Routes>
                <Route path='/'  element={<Home/>}/>
                <Route path='/profil/:pseudo'  element={<Profil />} />
                <Route path='/game-library'  element={<GameLibrary/>}/>
                <Route path='/game-detail/:id'  element={<GameDetails/>}/>
                <Route path='/all-review'  element={<Review/>}/>
                <Route path='*'  element={<Home/>}/>
            </Routes>
        </BrowserRouter>
      </>
    );
};

export default index;