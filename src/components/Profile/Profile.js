import React from 'react';
import './Profile.css';

const Profile = () => {
  return (
    <section className='account'>
      <div className='account__container'>
        <h1 className='account__title'>Привет, Виталий!</h1>
        <div className='account__data'>
          <div className='account__text-wrapper account__text-wrapper_name'>
            <p className='account__text'>Имя</p>
            <p className='account__text'>Виталий</p>
          </div>
          <div className='account__text-wrapper account__text-wrapper_email'>
            <p className='account__text'>E-mail</p>
            <p className='account__text'>pochta@yandex.ru</p>
          </div>
        </div>
        <div className='account__buttons'>
          <button className='account__button'>Редактировать</button>
          <button className='account__button account__button_type_signout'>Выйти из аккаунта</button>
        </div>
      </div>

    </section>
  );
};

export default Profile;
