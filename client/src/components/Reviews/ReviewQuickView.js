import React, { useEffect } from 'react';
import { dateParser } from '../Utils/DateHelper';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {  faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar as anotherFaStar } from '@fortawesome/free-regular-svg-icons'

const ReviewQuickView = ({reviewSorted, index}) => {
  const imgUrl = 'https://images.igdb.com/igdb/image/upload/t_cover_big/co5s5v.jpg';
  var divStyle = {
      backgroundImage: 'url(' + imgUrl + ')',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center'
    };



      const ratingReview = (rating) => {
        let ratingvar = [];
        let r = rating;
        if( r === 1) ratingvar = [true, false,false, false, false]
        if( r === 2)  ratingvar = [true, true,false, false, false]
        if( r === 3) ratingvar = [true, true,true, false, false]
        if( r === 4) ratingvar = [true, true,true, true, false]
        if( r === 5) ratingvar = [true, true,true, true, true] 

        return (
        <>
         {
          ratingvar.map(
            (elm) => {
            return(
              <>
                <FontAwesomeIcon icon={elm == false ? anotherFaStar : elm == true ? faStar : ''} style={{color: "#7617c4",}}/>
              </>
            )
          })
         }
        </>
        )
      }
 
    return (
       <>
        <div class="blog-card">
    <div class="meta" style={divStyle}>
      {/* <img src='https://images.igdb.com/igdb/image/upload/t_cover_big/co5s5v.jpg'/> */}
      <ul class="details">
        <li class="author"><a href="#">{reviewSorted.posterName}</a></li>
        <li class="date">{dateParser(reviewSorted.release[0])}</li>
              
   
      </ul>
    </div>

<div className='card-display'>


<div class="col">
				<div class="row mx-0 reviews-top">
					<h2 class="mb-1 mb-sm-2 title-reviews-top" id="username"><a href="/u/RayanEnLegende/">{reviewSorted.title}</a></h2>
          <div class="row mx-0" id="user-stats">

<a href="/u/RayanEnLegende/games/">
  <div class="col-auto pl-0 pr-2 user-stat">
    <div class="row stat-header">
      <div class="col">
        <p>{ratingReview(reviewSorted.rating)}</p>
      </div>
    </div>
    
  </div>
</a>
<a href="/u/RayanEnLegende/backlog/">
  <div class="col-auto px-2 user-stat">
    <div class="row mx-0 stat-header">
      <p>complété sur : {reviewSorted.plateform}</p>
    </div>
  </div>
</a>
</div>          
				</div>
        <div class={'review-quickview-desc'} key={index}>
<div class="description">
  <p>{reviewSorted.description.slice(0, 50)}</p>
  
</div>

</div>
<div className='more-reviews'>
<p class="read-more">
    <a href="#">Read More</a>
  </p>
</div>
				</div>
</div>

  </div>

       </>
    );
};

export default ReviewQuickView;