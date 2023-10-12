import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import Modal from 'react-modal'
import { UidContext } from '../../ContextApi/uidContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendar } from '@fortawesome/free-solid-svg-icons';

const ModalComponent = ({modalIsOpen,style, setIsOpen }) => {
  const [author,setAuthor] = useState();
  const [description, setDescription] = useState('');
  const [gamePicture, setGamePicture] = useState(null); //l'image qu'on va se passer frontalement, 
  const [title, setTitle] = useState("");
  const [file, setFile] = useState();//le fichier img qu'on va s'envoyer en base
  const [user, setUser] = useState([])
  const [genre, setGenre] = useState()
  const [plate, setPlate] = useState([])

    let subtitle;
    function closeModal() {
        setIsOpen(false);
      }
      const uid = useContext(UidContext);
      const handlePicture = (e) => {
        e.preventDefault()
        console.log(e.target.files)
        setGamePicture(URL.createObjectURL(e.target.files[0])) //creer un objet js et nous affiche l'image en front
        setFile(e.target.files[0]);

    }

    const handlePost = async (e) => {
      e.preventDefault()
        if (description) {

const data = new FormData(e.target)
console.log(data)

// const config = { headers: { "Content-Type": "multipart/form-data" } };

// const plateform = []
// const genreGames = []
// const plateforms = ['PlayStation', 'Nintendo Switch', 'Xbox', 'PC']
// const genres = ['Action', 'Aventure', 'RPG']
// data.append('posterId', uid);
data.append('posterId', uid);

// for(let i = 0; i < files.files.length; i++) {
//   data.append("picture", files.files[i]);
// }
// const datas = data.entries();
// for (const entry of datas) {
//   entry.map((data) => {
//    if(data == 'PlayStation') {
//     return   setPlate([...plate, data])
//    }if(genres.includes(data)) {
//       return setGenre( prev => [...prev, data])
//    }
//   }
//   )
//  };
//  data.append('plateform', ['PlayStation', 'Nintendo Switch', 'Xbox', 'PC'])
//  data.append('genres', ['Action', 'Aventure', 'RPG'])
//  data.append('title', 'test')
//  data.append('author', ['test'])
//  data.append('release', ['2023-01-28T12:45:15.000+00:00'])
// if(file) data.append("file", file);

console.log(data)
await axios.post(
`${process.env.REACT_APP_API_URL}api/gameproduct`,
  data,
  {
    withCredentials: true,
}
).then((res) => {
           console.log(res)
})
.catch((err) => console.log(err))

cancelPost()

        } else {
            window.alert('veuillez entre qqchose')
        }
      

    }

   
    const cancelPost = () => {
   setDescription('');
   setGamePicture('')
   setFile('')

    }
    const mystyle = {
      background: '#1876F3',
      color: "white"
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
        <a onClick={closeModal} >X</a>

        <form onSubmit={handlePost} id="sign-up-form" >
       
       <div className='section1-modal'>

<div className='title-modal'>
<label htmlFor="title">titre</label>
         <br />
         <input
           type="text"
           name="title"
           id="title"
           className="input-modal"
           onChange={(e) => setTitle(e.target.value)}
           value={title}
         />

</div>
   
    <div className='author-modal'>
    <label htmlFor="author">Author</label>
              <br />
              <input
                type="text"
                name="author"
                id="author"
                className="input-modal"
                onChange={(e) => setAuthor(e.target.value)}
                value={author}
              />
              <div className="pseudo error"></div>
    </div>

         </div>
         
       <div className='section-modal'>

       <fieldset className='field-modal'>
        <legend>Les plateformes disponible pour le jeu</legend>
        <div>
          <input type="checkbox" id="PlayStation" name="plateform" value="Xbox"   />
          <label for="Xbox">Xbox</label>
        </div>
        <div>
          <input type="checkbox" id="PlayStation" name="plateform" value="PlayStation"  />
          <label for="PlayStation">PlayStation</label>
        </div>
        <div>
          <input type="checkbox" id="PC" name="plateform" value="PC"  />
          <label for="PC">PC</label>
        </div>
        <div>
          <input type="checkbox" id="Nintendo Switch" name="plateform" value="Nintendo Switch" />
          <label for="Nintendo Switch">Nintendo Switch</label>
        </div>
        </fieldset>
        <fieldset className='field-modal'>
        <legend>Genre du jeu </legend>
        <div>
          <input type="checkbox" id="Action" name="genres" value="Action" />
          <label for="Action">Action</label>
        </div>
        <div>
          <input type="checkbox" id="Aventure" name="genres" value="Aventure" />
          <label for="Aventure">Aventure</label>
        </div>
        <div>
          <input type="checkbox" id="RPG" name="genres" value="RPG" />
          <label for="RPG">"RPG</label>
        </div>
        </fieldset>
       </div>
         <div className="password error"></div>
  <div className='footer-modal'>
    <div className='upload-modal' >
  <br />
  <div class="upload-btn-wrapper">
  <button class="btn">Ajouter une image</button>
  <input
          type="file"
          id="file"
          name="file"
          accept=".jpg, .jpeg, .png"
          onChange={(e) => setFile(e.target.files[0])}
        />
      
</div>
<input   type="date" name="release" id='release'  />
<div><FontAwesomeIcon icon={faCalendar} style={{color: "#764488",}} /></div>
  </div>
         <div className='desc-modal'> 
      <br />
         <label htmlFor="description">description</label>
         <br />
         <textarea
           type="textarea"
           name="description"
           className="formlogin"
           id="description"
           onChange={(e) => setDescription(e.target.value)}
           value={description}
         />
         <div className="description error"></div>
         <br />

      </div>
      </div>
         <input type="submit" value="add a game"  id='btn-modal-submit' className='submit-btn'/>
       </form>
        </div>
      </Modal>
    );
};

export default ModalComponent;