import React, { useEffect, useState } from 'react';

const ProfileQuickView = ({user, reviewlength}) => {
	console.log('sdf',user)
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
    return (
        <>
   
						 <div class="col-2 col-lg-1 px-0 mt-auto">
				<a href="/u/RayanEnLegende/">
					<div class="avatar">
						<img src="https://www.backloggd.com/packs/media/images/no_avatar-9e38482cb198a942b3e684fbb64b7970.jpg" width="150" height="150"  />
					</div>
				</a>
			</div>
			<div class="col">
				<div class="row mx-0">
					<h2 class="mb-1 mb-sm-2" id="username"><a href="/u/RayanEnLegende/">{user.pseudo}</a></h2>
				</div>
				<div class="row mx-0" id="user-stats">
					<a href="/u/RayanEnLegende/games/">
						<div class="col-auto pl-0 pr-2 user-stat">
							<div class="row stat-header">

								<div class="col">
									<p>Played</p>
								</div>
							</div>
							<div class="row">
								<div class="col">                              
                                <p class="mx-auto mb-0">{played?.length}</p>
								</div>
							</div>
						</div>
					</a>
					<a href="/u/RayanEnLegende/backlog/">
						<div class="col-auto px-2 user-stat">
							<div class="row mx-0 stat-header">
								<p>Review</p>
							</div>
							<div class="row mx-0 align">
								<p class="mx-auto mb-0">{reviewlength}</p>
							</div>
						</div>
					</a>
					<a href="/u/RayanEnLegende/playing/">
						<div class="col-auto px-2 user-stat">
							<div class="row mx-0 stat-header">
								<p>Playing</p>
							</div>
							<div class="row mx-0 align">
                             <p class="mx-auto mb-0">{playing?.length}</p>
							 </div>
						</div>
					</a>
					<a href="/u/RayanEnLegende/wishlist/" >
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
                <div class="col-2 col-lg-1 px-0 mt-auto title-profilequickview" >
					<h1 class="mx-auto w-100 mb-0" id="main-title">Thot</h1>
				<h4 class="mx-auto mb-0" id="backloggd-subtitle">Discover, Collect, Analyze your Games</h4>
			</div>
	</>

    
    );
};

export default ProfileQuickView;