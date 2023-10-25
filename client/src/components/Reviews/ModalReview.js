import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar, faStar } from '@fortawesome/free-solid-svg-icons';
import { UidContext } from '../ContextApi/uidContext';

const ModalReview = ({modalIsOpen,style, setIsOpen, action,review, game, currentuser}) => {
    const [posterName,setposterName] = useState();
    const [releasedate, setReleaseDate] = useState([])
    const [description, setDescription] = useState('');
    const [reviwPicture, setreviewPicture] = useState(null); //l'image qu'on va se passer frontalement, 
    const [title, setTitle] = useState("");
    const [files, setFiles] = useState();//le fichier img qu'on va s'envoyer en base
    const [rating, setRating] = useState('')
    const [searchList, SetSearchList] = useState('');
    const [recherche, SetRecherche] = useState("")
    const [reviewuser, setReviewUser] = useState({})
    const [plateform, setPlateform] = useState()
    const [filteredGames, setFilteredGames] = useState()
    const [currentgameselect, setCurrentGameSelect] = useState()
    const [uploadedFiles, setUploadedFiles] = useState([])
    const currentgame = []
    const allplateform = ['PlayStation', 'Nintendo', 'Xbox', 'PC']
  
      let subtitle;
  
      console.log(action)
      function closeModal() {
          setIsOpen(false);
        }
  
        const uid = useContext(UidContext);
           useEffect(() => {
            const callapi = () => {
                   const gamesTrend = Object.keys(game).map((i) => game[i])
                   setFilteredGames(gamesTrend.filter((game) => {
                       return game?.title?.toLowerCase().includes(searchList.toLocaleLowerCase())
                   }))
                   
                  }
               
               callapi()
                  
                 }, [recherche, searchList, game]);
               
  
    //     const handlePicture = (e) => {
    //       e.preventDefault()
    //       console.log(e.target.files)
    //       setreviewPicture(URL.createObjectURL(e.target.files[0])) //creer un objet js et nous affiche l'image en front
    //       setFile(e.target.files[0]);
  
    //   }
  
      console.log('currentgame title',review?.title)

      const handleAddEdit = async (e) => {
        e.preventDefault()
        if (description || files) {
          const formData = new FormData(e.target);
          console.log(uid,currentgameselect, currentuser)
          formData.append( 'posterId', uid)
          formData.append( 'posterName', currentuser)
          formData.set('gameId', review.gameId)
          console.log('formdata', formData)
  
  
  console.log('zeffffffffffffffff',formData) //form data + uid
  await axios.put(
  `${process.env.REACT_APP_API_URL}api/user/review/${review?._id}`,
  formData,
  {
    withCredentials: true,
  }
  ).then((res) => {
           console.log(res)
  })
  .catch((err) => console.log(err))
  
  cancelPost()
  
        } else {
            window.alert('veuillez entrer qqchose')
        }
      
      }
   
      const handleAdd = async(e) => {
        e.preventDefault()
   
          if (description || files) {
          const formData = new FormData(e.target);
          console.log(uid,currentgameselect, currentuser)
          formData.append( 'posterId', uid)
          formData.append( 'posterName', currentuser)
          formData.append( 'plateform',plateform)
await axios.post(
  `${process.env.REACT_APP_API_URL}api/user/review`,
  formData,
    {
      withCredentials: true,
    }
  ).then((res) => {
             console.log(res)
         
  })
  .catch((err) => console.log(err))
  
  cancelPost()
  
          } else {
              window.alert('veuillez entrer qqchose')
          }
        
  
      }
  
     
      const cancelPost = () => {
     setDescription('');
     setreviewPicture('')
     setFiles('')
  
      }

      return (
          <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={style}
          contentLabel="Example Modal"
          className="Modal"
          overlayClassName="Overlay"
        >
          
          <div>
          <button onClick={closeModal} className='edit-add-modal-btn'>X</button>
  
          <form onSubmit={action !== 'edit' ? handleAdd : handleAddEdit} id="sign-up" >
         
         <div className='section1-modal'>
  
  <div className='title-modal'>
  <label htmlFor="title">titre</label>
           <br />
           <input
             type="text"
             name="title"
             id="title"
             value={title}
             className="input-modal"
             onChange={(e) => setTitle(e.target.value)}
           />
  
  </div>
     
     {
      action == 'edit' ? ('') : (
      <>
       <div className='author-modal'>
                <div class="f-group">
            <label>veuillez choisir un jeu a testé</label>
            <select name="gameId" onChange={(e) => setCurrentGameSelect(e.target.value)} >
            <option   disabled selected>selectionne un jeu</option>
            {  
            filteredGames?.map((game, index) => {
              return (
                <> <option  value={game._id} key={index}>{game.title}</option></>
              )
            })
                
            }
            
            </select>
            </div>
                <div className="pseudo error"></div>
      </div>
      </>)
     }
      <div className='author-modal'>
                <div class="f-group">
            <label>Plateforme</label>
            <select onChange={(e) => setPlateform(e.target.value)} defaultValue={review?.plateform} >
            <option name="plateform"  disabled selected>selectionne un plateform</option>
            {
            allplateform?.map((plateforme, index) => {
              return (
                <> <option  value={plateforme} key={index}>{plateforme}</option></>
              )
            })
                
            }
            
            </select>
            </div>
                <div className="pseudo error"></div>
      </div>
           </div>
           
         <div className='section-modal'>
         <div class="f-group">
            <label>veuillez choisir une note pour ce jeu </label>
            <select name="rating" onChange={(e) => {setRating(e.target.value)}}>
            <option  disabled selected> votre note</option>
            <> 
                <option value='1' >1</option>
                <option value='2' >2</option>
                <option value='3' >3</option>
                <option value='4' >4</option>
                <option value='5' >5</option>
            </>
            </select>
            </div>
         </div>

           <div className="password error"></div>
          <div className='footer-modal'>
            <div className='upload-modal' >
          <br />
          <div class="upload-btn-wrapper">
          <button class="btn">Ajouter une image</button>
          <input
            type="file"
            id="files"
            name="files"
            multiple
            accept=".jpg, .jpeg, .png"
            onChange={(e) => setFiles(e.target.files)}
          />
        
  </div>
  <div>
    <input type="date" name="release" id='release' onChange={(e) => setReleaseDate(e.target.value)} />
  </div>
    </div>
           <div className='desc-modal'> 
        <br />
           <label htmlFor="description">description</label>
           <br />
           <textarea
             type="textarea"
             name="description"
             className="formlogin text-area-modal"
             id="description"
             value={description}
             onChange={(e) => setDescription(e.target.value)}
           />
           <div className="description error"></div>
           <br />
        </div>
        </div>
           <input type="submit" value="add a review"  multiple id='btn-modal-submit'  className='submit-btn'/>
         </form>
          </div>
        </Modal>
      );
};

export default ModalReview;