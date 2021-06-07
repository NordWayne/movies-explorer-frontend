import React from 'react';
import './Registration.css';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

const Registration = () => {
  return (
    <section className='registration'>
      <form className='registration__form'>
        <img alt='лого' src={logo} className='registration__logo'/>
        <h1 className='registration__title'>Добро пожаловать!</h1>
        <fieldset className='registration__fieldset'>
          <label className='registration__label'>Имя
            <input type='text' className='registration__input'/>
          </label>
          <label className='registration__label'>E-mail
            <input type='email' className='registration__input'/>
          </label>
          <label className='registration__label'>Пароль
            <input type='password' className='registration__input'/>
          </label>
        </fieldset>
        <button type='submit' className='registration__submit'>Зарегистрироваться</button>
        <p className='registration__text'>Уже зарегистрированы?   <Link to='/signin' className='registration__link'>Войти</Link></p>
      </form>
    </section>
  );
};

export default Registration;
