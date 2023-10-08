import React, { useContext, useState } from 'react';
import { UidContext } from '../ContextApi/uidContext';
import { NavLink } from 'react-router-dom';
import Logout from '../Log/Logout';

const Navbar = ({setSignUp, signUp}) => {

    const user = useContext(UidContext);

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
          {user ? (
            <ul>
              <li>
              </li>
              <li className="welcome">
                <NavLink to="{chemin + userData.pseudo}">
                  <h5>Bienvenue Rayan</h5>
                </NavLink>
              </li>
              <Logout />
          
            <li class="search-box">    
              <input class="search-input" type="text" placeholder="Search something.."/>
              <button class="search-btn"><i class="fas fa-search"></i></button>
             </li>
            </ul>
          ) : (
            <ul>
            <li>
            
            </li>
                <li>
                <NavLink  to="/profil">
                    <img src="../img/icons/login.svg" alt="login"/>
                </NavLink>
                </li>
                <li onClick={() => setSignUp(true) } className={ signUp ? "active-btn nav-content" : ""}>S'inscrire</li>
                <li  onClick={() => setSignUp(false) } className={signUp ? "nav-content" : "active-btn nav-content " }>se connecter</li>
                <li class="search-box nav-content">    
              <input class="search-input" type="text" placeholder="Search something.."/>
              <button class="search-btn"><i class="fas fa-search"></i></button>
             </li>
            </ul>
            
          )}
        </div>
      </nav>
    );
};

export default Navbar;