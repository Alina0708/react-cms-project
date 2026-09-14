import { Link } from 'react-router-dom';

import classes from './Welcome.module.css';
import installation2 from '../../image/installation2.jpg';

const channels = [
  {
    code: 'CH.01',
    title: 'Теория',
    text: 'Формулы, закон Джоуля-Ленца и база знаний с ответами на вопросы по внутренней энергии и работе электрического тока.',
    to: '/theory',
    cta: 'Изучить теорию',
  },
  {
    code: 'CH.02',
    title: 'Структура',
    text: 'Подробное описание лабораторной установки: источник питания, мультиметр, секундомер и образцы проводников.',
    to: '/structure',
    cta: 'Посмотреть установку',
  },
  {
    code: 'CH.03',
    title: 'Симулятор',
    text: 'Пошаговая интерактивная симуляция запуска установки, задания напряжения и тока и записи результатов измерений.',
    to: '/simulator',
    cta: 'Запустить симулятор',
  },
];

const Welcome = () => {
  return (
    <section className={classes.page}>
      <div className={classes.frame}>
        <span className={`${classes.corner} ${classes.cornerTl}`} aria-hidden="true" />
        <span className={`${classes.corner} ${classes.cornerTr}`} aria-hidden="true" />
        <span className={`${classes.corner} ${classes.cornerBl}`} aria-hidden="true" />
        <span className={`${classes.corner} ${classes.cornerBr}`} aria-hidden="true" />

        <div className={classes.hero}>
          <div className={classes.heroText}>
            <p className={classes.tag}>Виртуальная лабораторная работа</p>
            <h1 className={classes.title}>Внутренняя энергия и работа электрического тока</h1>
            <p className={classes.subtitle}>
              Изучите тепловое действие электрического тока на практике — без реального оборудования. Разберите
              теорию, познакомьтесь с устройством лабораторной установки и проведите измерения в интерактивном
              симуляторе.
            </p>
            <div className={classes.actions}>
              <Link to="/simulator" className={classes.primaryButton}>
                Запустить симулятор
              </Link>
              <Link to="/theory" className={classes.secondaryButton}>
                Перейти к теории
              </Link>
            </div>
          </div>

          <figure className={classes.figure}>
            <span className={`${classes.figureTick} ${classes.figureTickTl}`} aria-hidden="true" />
            <span className={`${classes.figureTick} ${classes.figureTickBr}`} aria-hidden="true" />
            <img alt="Лабораторная установка" src={installation2} className={classes.figureImage} />
            <figcaption className={classes.figureCaption}>
              <span>Рис. 01</span>
              <span>Установка</span>
            </figcaption>
          </figure>
        </div>

        <div className={classes.ruler} aria-hidden="true" />

        <div className={classes.channels}>
          <p className={classes.channelsLabel}>Порядок работы</p>
          <div className={classes.channelList}>
            {channels.map(({ code, title, text, to, cta }) => (
              <div key={to} className={classes.channel}>
                <span className={classes.channelNode} aria-hidden="true" />
                <span className={classes.channelCode}>{code}</span>
                <h2 className={classes.channelTitle}>{title}</h2>
                <p className={classes.channelText}>{text}</p>
                <Link to={to} className={classes.channelLink}>
                  <span>{cta}</span>
                  <svg
                    className={classes.channelLinkIcon}
                    width="14"
                    height="10"
                    viewBox="0 0 14 10"
                    fill="none"
                    aria-hidden="true"
                  >
                    <path
                      d="M0.5 5H13M13 5L9 1M13 5L9 9"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
