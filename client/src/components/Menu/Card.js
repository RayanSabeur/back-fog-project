import React from 'react';

const Card = ({card, index}) => {

const genreCard = (game) => {
    return game.map((genre, index) => <li key={index}>{genre}</li> )
}
const imgUrl = 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5s5v.jpg';
var divStyle = {
    backgroundImage: 'url(' + imgUrl + ')',
  };

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