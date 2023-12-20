import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import GameLibrary from '../../pages/GameLibrary';
import Review from '../../pages/Review';
import GameDetails from '../../pages/GameDetails';

const index = ({value}) => {

    return (
      <>
        <BrowserRouter>
            <Routes>
      
                <Route path='/'  element={<Home/>}/>
                <Route path='/profil/:pseudo'  element={<Profil uid={value}/>} />
                <Route path='/game-library'  element={<GameLibrary/>}/>
                <Route path='/game-detail/:id'  element={<GameDetails  uid={value}/>}/>
                <Route path='/review/:postername/:id'  element={<Review  uid={value}/>}/>
                <Route path='*'  element={<Home/>}/>
     
            </Routes> 
        </BrowserRouter>
      </>
    );
};

export default index;