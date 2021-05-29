import React from 'react';
import './AboutMe.css';
import photo from '../../images/profilePhoto.png';

const AboutMe = () => {
  return (
    <section className='profile'>
      <h2 className='profile__title'>Студент</h2>
      <div className='profile__info'>
        <div className='profile__text-block'>
          <h3 className='profile__name'>Ринат</h3>
          <p className='profile__subtitle'>Фронтенд-разработчик, 20 лет</p>
          <p className='profile__description'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
            После того, как прошёл курс по веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <div className='profile__socials'>
            <a className='profile__link' href='https://github.com/NordWayne'>Facebook </a>
            <a className='profile__link' href='https://github.com/NordWayne'>Github</a>
          </div>
        </div>
        <img src={photo} alt='Моё фото' className='profile__photo'/>
      </div>
    </section>
  );
};

export default AboutMe;
