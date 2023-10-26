import React, { useContext, useEffect, useRef, useState } from 'react';
import { UidContext } from '../ContextApi/uidContext';
import { NavLink, useNavigate } from 'react-router-dom';
import Logout from '../Log/Logout';
import ModalComponent from '../admin/Modal/Modal';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faChevronDown, faHouse, faPlay, faUser } from '@fortawesome/free-solid-svg-icons';
import ModalReview from '../Reviews/ModalReview';


const Navbar = ({setSignUp, signUp, setFilter}) => {
  const [currentuser, setCurrentUser] = useState([])
    const user = useSelector((state) => state.userReducer)
    const [searchList, SetSearchList] = useState('');
    const [recherche, SetRecherche] = useState("")
    const [reviewuser, setReviewUser] = useState({})

      console.log(currentuser)
    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        boxShadow: '1px 2px #888888',
        zIndex: 1,
      },
    };
    const [filteredGames, setFilteredGames] = useState()

    let subtitle;


    const [toggle, setToggle] = useState('')
   let [modalIsOpen, setIsOpen] = useState(false);
   let [modalIsOpenReview, setIsOpenReview] = useState(false);
   const usersData = useSelector((state) => state.userReducer)
   const games = useSelector((state) => state.gamesReducer)
   const selectMenu = useRef(null);

   const[ togglemenu, setToggleMenu] = useState(false)
    function openModal() {
      setToggle('review')
      setIsOpen(true);
    }
    function openModalReview() {
      setIsOpen('review');
    }
    useEffect(() => {
 const callapi = () => {
        const gamesTrend = Object.keys(games).map((i) => games[i])
        setFilteredGames(gamesTrend.filter((game) => {
            return game?.title?.toLowerCase().includes(searchList.toLocaleLowerCase())
        }))
        
       }
    
    callapi()
    const fetchReviewUser = async () => {
      const res = await axios.get(`${process.env.REACT_APP_API_URL}api/user/review/${user._id}`)
      setReviewUser(res.data)
    }
    fetchReviewUser();
       
      }, [recherche, searchList, games, user._id]);
    
      const callapisearchoutput = () => {

        return (<>
        
        {
            filteredGames?.map((game) => {
              return (
                <> <a href={"/game-detail/" + game._id}> <li>{game.title}</li></a></>
              )
        })
        }
        </>)
      }

      console.log('ffff',filteredGames)

      
      const handlemenu = () => {
     setToggleMenu(!togglemenu)
       if(togglemenu === false) {
        selectMenu.current.style.display = 'none';
       } else if(togglemenu === true) {
        selectMenu.current.style.display = 'unset';
       }

      
      }

      console.log(modalIsOpenReview)
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
            <div   class="select-menu active" onClick={handlemenu}>
  <div class="select-btn" style={{color: 'black'}}>
    <span class="sBtn-text">menu</span>
    <span><FontAwesomeIcon icon={faChevronDown} /></span>
  </div>

  <ul class="options" ref={selectMenu} style={{display: 'none'}}>
  <li class="option">
    <a href="/">   Acceuil  <FontAwesomeIcon icon={faHouse} /></a>
    </li>
    <li class="option" >
      <span class="option-text"><a href={"/profil/" + user.pseudo}>profil <FontAwesomeIcon icon={faUser} /></a></span>
    </li>
    <li class="option">
  
      <span class="option-text" ><a href="/game-library">Game-library <FontAwesomeIcon icon={faBook} style={{fontSize: '1rem', marginLeft: '10px'}} /> </a></span>
    </li>
    <li class="option" onClick={openModalReview}>
      <span class="option-text">review<FontAwesomeIcon icon={faBook} style={{fontSize: '1rem', marginLeft: '10px'}} /></span>
    </li>
     {
      usersData?.status == 'admin'  ? (<>  <li class="option" onClick={openModal}>
      <span class="option-text">new game<FontAwesomeIcon icon={faPlay} style={{fontSize: '1rem', marginLeft: '10px'}} /></span>
    </li></>) : ('')
     }
    <li class="option">
    <Logout/>
    </li>
  </ul>
</div>
       <div>
 {
  modalIsOpen == true ? (
    <>
          <ModalComponent 
       modalIsOpen={modalIsOpen}
        style={customStyles}
        setIsOpen={setIsOpen}
        action={'game'}

         />
    </>
  ) :   modalIsOpen == 'review' ? (
    <>
    <ModalReview 
  modalIsOpen={modalIsOpen}
  style={customStyles}
  setIsOpen={setIsOpen}
  action={'review'}
  review={reviewuser}
  game={games}
  currentuser={user.pseudo}
   />
</>
  ) : ('')
  
}

    </div>
              <ul space-nav-menu className='space-nav-menu'>
            <li class="search-box" >    
             <input class="search-input" type="text" placeholder="Search a game or reviews.." onChange={setFilter ? (e) => setFilter(e.target.value) : (e) => SetSearchList(e.target.value)}/>
              <button class="search-btn" type='submit'><i class="fas fa-search"></i></button>
              <div style={{backgroundColor: 'white'}}>
                <ul style={{backgroundColor: 'white'}} className='search-list-output'>
                  {
                  searchList ? callapisearchoutput() : ''
                }
                
                </ul>
                
              </div>
             </li>
             
            </ul>
        {usersData.status == 'admin' ?     <span class="option-text" className='log-a-game space-nav-menu' onClick={openModal}>new game<FontAwesomeIcon icon={faPlay} style={{fontSize: '1rem', marginLeft: '10px'}} /></span> : ''}
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