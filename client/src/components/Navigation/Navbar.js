import React, { useContext, useEffect, useState } from 'react';
import { UidContext } from '../ContextApi/uidContext';
import { NavLink, useNavigate } from 'react-router-dom';
import Logout from '../Log/Logout';
import ModalComponent from '../admin/Modal/Modal';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';


const Navbar = ({setSignUp, signUp}) => {
  const [currentuser, setCurrentUser] = useState([])
    const user = useSelector((state) => state.userReducer)
    const [searchList, SetSearchList] = useState([]);
    const [recherche, SetRecherche] = useState("")
    let navigate = useNavigate();
      console.log(currentuser)
    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width:'40%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: '1px 2px #888888',
        zIndex: 1,
        height: '50%'
      },
    };


    let subtitle;
   let [modalIsOpen, setIsOpen] = useState(false);
   const usersData = useSelector((state) => state.userReducer)
   const games = useSelector((state) => state.gamesReducer)
    function openModal() {
      setIsOpen(true);
    }
    console.log(modalIsOpen)
    useEffect(() => {
      axios.get(`https://api.jikan.moe/v4/anime?q=${recherche}&sfw`)
          .then((res) => SetSearchList(res.data.data));
       
      }, [recherche]);

    return (
        <nav>
        <div className="nav-container">
          <div className="logo">
            <NavLink to="/">
              <div className="logo">
                {/* <img src="../img/owl.png" alt="icon" /> */}
                <h3>THOT</h3>
              </div>
            </NavLink>
          </div>
          {user.pseudo ? (
            <>
            <div className='nav-menu'>
            <li className="welcome space-nav-menu">
    
                   <NavLink to={'/profil/' + user.pseudo}>
                <h5>Bienvenue {user.pseudo}</h5>
                   </NavLink>
    
            </li>
            <Logout />
       <div>
      <button onClick={openModal} className='log-a-game space-nav-menu'>new game<FontAwesomeIcon icon={faPlay} style={{fontSize: '1rem', marginLeft: '10px'}} /></button>
 {
  modalIsOpen == true ? (
    <>
          <ModalComponent 
       modalIsOpen={modalIsOpen}
        style={customStyles}
        setIsOpen={setIsOpen}
         />
    </>
  ) : (
    ""
  )
 }
    </div>
              <ul space-nav-menu>
            <li class="search-box" >    
              <input class="search-input" type="text" placeholder="Search something.." onChange={((e) => SetSearchList(e.target.value))}/>
              <button class="search-btn" onClick={()=> navigate("/game-library/" + searchList)} ><i class="fas fa-search"></i></button>
             </li>
            </ul>
            </div>
            </>

 
          ) : (
            <>
            <li className="welcome">
            <li onClick={() => setSignUp(true) } className={ signUp ? "active-btn nav-content" : "nav-content"}>S'inscrire</li>
            </li>
            <li  onClick={() => setSignUp(false) } className={signUp ? "nav-content" : "active-btn nav-content " }>se connecter</li>
      
              <ul>
            <li class="search-box">    
         <input class="search-input" type="submit" placeholder="Search something.." />
              <button class="search-btn"><i class="fas fa-search"></i></button>
             </li>
            </ul>
            </>

          )}
        </div>
      </nav>
    );
}; 

export default Navbar;