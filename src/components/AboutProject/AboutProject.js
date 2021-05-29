import React from 'react';
import './AboutProject.css';

const AboutProject = () => {
  return (
    <section className='about-project'>
      <h2 className='about-project__title'>О проекте</h2>
      <div className='about-project__description'>
        <div className='about-project__wrapper'>
          <h3 className='about-project__subtitle'>Дипломный проект включал 5 этапов</h3>
          <p className='about-project__text'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
        </div>
        <div className='about-project__wrapper'>
          <h3 className='about-project__subtitle'>На выполнение диплома ушло 5 недель</h3>
          <p className='about-project__text'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
        </div>
      </div>
      <div className='about-project__progress'>
        <p className='about-project__progress-item about-project__progress-item_green'>1 неделя</p>
        <p className='about-project__progress-item about-project__progress-item_grey'>4 неделя</p>
        <p className='about-project__progress-item'>Back-end</p>
        <p className='about-project__progress-item'>Front-end</p>
      </div>
    </section>
  );
};

export default AboutProject;
