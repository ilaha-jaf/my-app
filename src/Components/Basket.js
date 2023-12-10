

import React from 'react';
import './Basket.css';

const Basket = ({ movieList, listName, setShowBasket, movieData }) => {
  const handleCloseBasket = () => {
    setShowBasket(false);
  };

  return (
    <div>
      <h2>Basket</h2>
      <div className='list2'>
      <h4>{listName}</h4>

      {movieList.map((title, index) => {

        const movie = movieData.find((movie) => movie.Title === title);

        return (
          <div key={index} className='movie-info'>
              {movie && <img src={movie.Poster} alt={title} />}
            <p>{title}</p>
          
          </div>
        );
      })}
</div>
      <button className='closeBasket' onClick={handleCloseBasket}>Close Basket</button>
    </div>
  );
};

export default Basket;


