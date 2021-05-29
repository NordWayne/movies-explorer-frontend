import React from 'react';
import './MoviesCard.css';
import film from '../../images/film.png'

const MoviesCard = () => {
  return (
    <li className='card__item'>
      <article className='card'>
        <div className='card__top'>
          <p className='card__title'>В погоне за Бенкси</p>
          <p className='card__duration'>27 минут</p>
        </div>
        <img className='card__img' alt='фото фильма' src={film}/>
        <button className='card__button' type='button'>Сохранить</button>
      </article>
    </li>
  );
};

export default MoviesCard;
