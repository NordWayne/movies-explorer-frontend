import React from 'react';
import '../Registration/Registration.css';
import logo from '../../images/logo.svg';
import {Link} from 'react-router-dom';

const Login = () => {
  return (
    <section className='registration'>
      <form className='registration__form'>
        <img alt='лого' src={logo} className='registration__logo'/>
        <h1 className='registration__title'>Рады видеть!</h1>
        <fieldset className='registration__fieldset'>
          <label className='registration__label'>E-mail
            <input type='email' className='registration__input'/>
          </label>
          <label className='registration__label'>Пароль
            <input type='password' className='registration__input'/>
          </label>
        </fieldset>
        <button type='submit' className='registration__submit registration__submit_login'>Войти</button>
        <p className='registration__text'>Еще не зарегестрированы?   <Link to='/signup' className='registration__link'>Регистрация</Link></p>
      </form>
    </section>
  );
};

export default Login;
