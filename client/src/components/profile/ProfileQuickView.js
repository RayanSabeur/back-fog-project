import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { UidContext } from '../ContextApi/uidContext';
import { useNavigate } from 'react-router';

config.autoAddCss = false;

const ProfileQuickView = ({user, reviewlength, userId, location}) => {

	const navigate = useNavigate(); 
	const uid = useContext(UidContext);
	console.log('LOCATION',location)
    const count = [];
	const played = user.favoris?.filter(element => {
		return element.status == "played" ? count.push(element) : ""
	});
	const playing = user.favoris?.filter(element => {
		return element.status == "playing" ? count.push(element) : ""
	});
	const wishlist = user.favoris?.filter(element => {
		return element.status == "wishlist" ? count.push(element) : ""
	});

	const [file, setFile] = useState();

	const handleChangeAvatar = async (e) => {
		e.preventDefault()
		const data = new FormData(e.target)
        data.append('userId', userId);
		console.log('sdf',userId)
			if(file) {
					
		await axios({
			method: "post",
			url:  `${process.env.REACT_APP_API_URL}api/user/upload`,
			data: data,
			withCredentials: true
		})
		.then((res) => {
			const navig = "/profil/" + user?.pseudo
			window.location.reload()
			
		})
		.catch((err) => console.log(err));
			} else {
				window.alert('veuilez choisir une image')
			}

	}

    return (

        <>
   
			<div class="col-2 col-lg-1 px-0 mt-auto respons-profile-quickview">
			
				{
					location == "profil" && uid == userId ? (
					<> 
                    <div class="avatar">
						<form onSubmit={handleChangeAvatar}> 
							<input type="file" name="file" id="file"  className='file-upload-avatar' accept=".jpg, .jpeg, .png" onChange={(e) => setFile(e.target.files[0])} />  
							<button type="submit"  className='submit-btn-avatar' > <FontAwesomeIcon icon={faPenToSquare}  style={{color: file ? "#7617c4" : "white"}}  size="2x"
							aria-hidden="true"className='transform motion-safe:group-focus:scale-110 p-1.5 z-10' type="submit"/>
							</button>
							<img src={user.picture} width="150" height="150"  alt='user profil pic'/> 
						</form>
					</div>

					
					</>) : (
					<>  		
					<div class="avatar">
						<div> 
							<img src={user.picture} width="150" height="150" alt='user profil pic'/> 
						</div>
					</div>
					</>
					
					)
				}
			</div>
			<div class="col">
				<div class="row mx-0">
					<h2 class="mb-1 mb-sm-2" id="username"><a href={'/profil/' + user.pseudo}>{user.pseudo}</a></h2>
				</div>
				<div class="row mx-0" id="user-stats">
					<a href={`/profil/${user.pseudo}`}>
						<div class="col-auto pl-0 pr-2 user-stat">
							<div class="row stat-header">
								<p>Played</p>
							</div>
							<div class="row">                              
                                <p class="mx-auto mb-0">{played?.length}</p>
							</div>
						</div>
					</a>
					<a href={`/profil/${user.pseudo}`}>
						<div class="col-auto px-2 user-stat">
							<div class="row mx-0 stat-header">
								<p>Review</p>
							</div>
							<div class="row mx-0 align">
								<p class="mx-auto mb-0">{reviewlength}</p>
							</div>
						</div>
					</a>
					<a href={`/profil/${user.pseudo}`}>
						<div class="col-auto px-2 user-stat">
							<div class="row mx-0 stat-header">
								<p>Playing</p>
							</div>
							<div class="row mx-0 align">
                             <p class="mx-auto mb-0">{playing?.length}</p>
							 </div>
						</div>
					</a>
					<a href={`/profil/${user.pseudo}`}>
						<div class="col-auto px-2 user-stat">
							<div class="row mx-0 stat-header">
								<p>Wishlist</p>
							</div>
							<div class="row mx-0 align">
	
                             <p class="mx-auto mb-0">{wishlist?.length}</p>

							</div>
						</div>
					</a>
                    </div>                           
			</div>
             
	</>

    
    );
};

export default ProfileQuickView;