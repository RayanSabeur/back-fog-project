import axios from 'axios';
import React from 'react';

const Card = ({card, index}) => {

const genreCard = (game) => {
    return game.map((genre, index) => <li key={index}>{genre}</li> )
}

let divcard = document.querySelectorAll(".card");
const imgUrl = card.picture[0];
var divStyle = {
    backgroundImage: 'url(' + imgUrl + ')',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
}

    return (
        
        <div class="card" key={index} style={divStyle} id='card'>
        <div class="content" >    
        <h2 class="title">{card.title}</h2>
            <p class="copy">{genreCard(card.genres)}</p>  <a href={"/game-detail/" + card._id}><button class="btn">voir +</button></a>
        </div>
    </div>
    );
};

export default Card;