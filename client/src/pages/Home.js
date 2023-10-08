import React, { useContext, useState } from 'react';
import { UidContext } from '../components/ContextApi/uidContext';
import Log from '../components/Log';
import WelcomeCard from '../components/Menu/WelcomeCard';
import Navbar from '../components/Navigation/Navbar';

const Home = () => {

    const uid = useContext(UidContext);
    const [signUp, setSignUp] = useState(true);
    console.log(uid)
    return (
        <>
         <Navbar setSignUp={setSignUp} signUp={signUp}/>
   
        <div className="home">
      <div className="main">
        
        <div className="home-header">
       {uid ? <WelcomeCard /> :
        <Log signUp={signUp}/> }
        </div>


      </div>
      <div className="right-side">
        <div className="right-side-container">
          <div className="wrapper">

          </div>
        </div>
      </div>
    </div>
    </>
    );
};

export default Home;