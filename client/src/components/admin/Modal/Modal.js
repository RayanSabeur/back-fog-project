import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Modal from "react-modal";
import { UidContext } from "../../ContextApi/uidContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-solid-svg-icons";

const ModalComponent = ({ modalIsOpen, style, setIsOpen, action, game }) => {
  const [author, setAuthor] = useState();
  const [description, setDescription] = useState("");
  const [gamePicture, setGamePicture] = useState(null); //l'image qu'on va se passer frontalement,
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(); //le fichier img qu'on va s'envoyer en base

  let subtitle;

  function closeModal() {
    setIsOpen(false);
  }

  const uid = useContext(UidContext);

  const handlePicture = (e) => {
    e.preventDefault();
    setGamePicture(URL.createObjectURL(e.target.files[0])); //creer un objet js et nous affiche l'image en front
    setFile(e.target.files[0]);
  };

  const handleAddEdit = async (e) => {
    e.preventDefault();

    if (description || file) {
      const data = new FormData(e.target);

      data.append("posterId", uid);
      await axios
        .put(
          `${process.env.REACT_APP_API_URL}api/gameproduct/${game?._id}`,
          data,
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((err) => console.log(err));

      cancelPost();
    } else {
      window.alert("veuillez entrer qqchose");
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (description || file || title) {
      const data = new FormData(e.target);
      data.append("posterId", uid);

      await axios
        .post(`${process.env.REACT_APP_API_URL}api/gameproduct`, data, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          window.location.reload();
        })
        .catch((err) => console.log(err));

      cancelPost();
    } else {
      window.alert("veuillez renseigner quelque chose");
    }
  };

  const cancelPost = () => {
    setDescription("");
    setGamePicture("");
    setFile("");
  };
  const mystyle = {
    background: "#1876F3",
    color: "white",
  };
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
        <button onClick={closeModal} className="edit-add-modal-btn">
          X
        </button>

        <form
          onSubmit={action !== "edit" ? handleAdd : handleAddEdit}
          id="sign-up-form"
        >
          <div className="section1-modal">
            <div className="title-modal">
              <label htmlFor="title">titre</label>
              <br />
              <input
                type="text"
                name="title"
                defaultValue={game?.title}
                id="title"
                className="input-modal"
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className="author-modal">
              <label htmlFor="author">Auteur</label>
              <br />
              <input
                type="text"
                name="author"
                id="author"
                className="input-modal"
                onChange={(e) => setAuthor(e.target.value)}
                defaultValue={game?.author[0]}
                value={author}
              />
              <div className="pseudo error"></div>
            </div>
          </div>

          <div className="section-modal">
            <fieldset className="field-modal">
              <legend>Les plateformes disponible pour le jeu</legend>
              <div>
                <input
                  type="checkbox"
                  id="Xbox"
                  name="plateform"
                  value="Xbox"
                />
                <label for="Xbox">Xbox</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="PlayStation"
                  name="plateform"
                  value="PlayStation"
                />
                <label for="PlayStation">PlayStation</label>
              </div>
              <div>
                <input type="checkbox" id="PC" name="plateform" value="PC" />
                <label for="PC">PC</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="Nintendo"
                  name="plateform"
                  value="Nintendo"
                />
                <label for="Nintendo">Nintendo</label>
              </div>
            </fieldset>
            <fieldset className="field-modal">
              <legend>Genre du jeu </legend>
              <div>
                <input
                  type="checkbox"
                  id="Action"
                  name="genres"
                  value="Action"
                />
                <label for="Action">Action</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="Aventure"
                  name="genres"
                  value="Aventure"
                />
                <label for="Aventure">Aventure</label>
              </div>
              <div>
                <input type="checkbox" id="RPG" name="genres" value="RPG" />
                <label for="RPG">RPG</label>
              </div>
            </fieldset>
          </div>
          <div className="password error"></div>
          <div className="footer-modal">
            <div className="upload-modal">
              <br />
              <div class="upload-btn-wrapper">
                <button class="btn">Ajouter une image</button>
                <input
                  type="file"
                  id="files"
                  name="files"
                  multiple
                  accept=".jpg, .jpeg, .png"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>
              <div>
                <input
                  type="date"
                  name="release"
                  id="release"
                  defaultValue={game?.release[0]}
                />
              </div>
            </div>
            <div className="desc-modal">
              <br />
              <label htmlFor="description">description</label>
              <br />
              <textarea
                type="textarea"
                name="description"
                className="formlogin text-area-modal"
                id="description"
                spellcheck="true"
                rows="5"
                onChange={(e) => setDescription(e.target.value)}
                defaultValue={game?.description}
              />
              <div className="description error"></div>
              <br />
            </div>
          </div>
          <input
            type="submit"
            value="Ajouter un jeu"
            multiple
            id="btn-modal-submit"
            className="submit-btn"
          />
        </form>
      </div>
    </Modal>
  );
};

export default ModalComponent;
