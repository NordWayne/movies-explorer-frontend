import React from 'react';
import { useLocation } from 'react-router-dom';
import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';

const MoviesCardList = () => {
  let location = useLocation();
  return (
    <>
    <ul className='card__list'>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
        <MoviesCard/>
    </ul>
      {location.pathname !== '/saved-movies' && <button className='card__more-btn'>Ещё</button>}

    </>
  );
};

export default MoviesCardList;
