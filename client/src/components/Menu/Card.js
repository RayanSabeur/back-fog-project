import React from 'react';

const Card = ({card, index}) => {

const genreCard = (game) => {
    return game.map((genre, index) => <li key={index}>{genre}</li> )
}
const imgUrl = card.picture;
var divStyle = {
    backgroundImage: 'url(' + imgUrl + ')',
    backgroundPosition: 'center center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
}
  

    return (
        
        <div class="card" key={index} style={divStyle}>
        <div class="content" >    
            <h2 class="title">{card.title}</h2>
            <p class="copy">{genreCard(card.genres)}</p><button class="btn">voir +</button>
        </div>
    </div>
    );
};

export default Card;