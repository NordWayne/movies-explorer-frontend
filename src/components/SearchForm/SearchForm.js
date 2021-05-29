import React from 'react';
import './SearchForm.css';
import logo from '../../images/searchicon.svg';

const SearchForm = () => {
  return (
        <form className='search-form'>
          <div className='search-form__container'>
            <img className='search-form__image' src={logo} alt='поиск'/>
            <input type='text' placeholder='Фильм' className='search-form__input' required/>
            <button type='submit' className='search-form__submit'>Найти</button>
          </div>
          <label className='search-form__checkbox-wrapper'>
            <div className='search-form__checkbox-container'>
              <input type='checkbox' className='search-form__checkbox'/>
              <span className='search-form__switcher'/>
            </div>
            <p className='search-form__text'>Короткометражки</p>
          </label>
        </form>
  );
};

export default SearchForm;
