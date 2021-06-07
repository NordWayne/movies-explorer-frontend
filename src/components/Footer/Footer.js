import React from 'react';
import './Footer.css';
const Footer = () => {
  return (
    <footer className='footer'>
      <p className='footer__description'>Учебный проект Яндекс.Практикум х BeatFilm.</p>
      <div className='footer__bottom'>
        <p className='footer__copyright'>© 2021</p>
        <ul className='footer__socials'>
          <li className='footer__link'><a href='https://praktikum.yandex.ru' className='footer__social-link' target="_blank">Яндекс.Практикум</a></li>
          <li className='footer__link'><a href='https://github.com/NordWayne' target="_blank" className='footer__social-link'>Github</a></li>
          <li className='footer__link'><a href='https://ru-ru.facebook.com/' className='footer__social-link' target="_blank">Facebook</a></li>
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
