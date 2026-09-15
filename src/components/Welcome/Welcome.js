import { Link } from 'react-router-dom';

import classes from './Welcome.module.css';
import installation2 from '../../image/installation2.jpg';
import { useLanguage } from '../../i18n/LanguageContext';
import { translations } from './Welcome.translations';

const Welcome = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className={classes.page}>
      <div className={classes.frame}>
        <span className={`${classes.corner} ${classes.cornerTl}`} aria-hidden="true" />
        <span className={`${classes.corner} ${classes.cornerTr}`} aria-hidden="true" />
        <span className={`${classes.corner} ${classes.cornerBl}`} aria-hidden="true" />
        <span className={`${classes.corner} ${classes.cornerBr}`} aria-hidden="true" />

        <div className={classes.hero}>
          <div className={classes.heroText}>
            <p className={classes.tag}>{t.tag}</p>
            <h1 className={classes.title}>{t.title}</h1>
            <p className={classes.subtitle}>{t.subtitle}</p>
            <div className={classes.actions}>
              <Link to="/simulator" className={classes.primaryButton}>
                {t.primaryButton}
              </Link>
              <Link to="/theory" className={classes.secondaryButton}>
                {t.secondaryButton}
              </Link>
            </div>
          </div>

          <figure className={classes.figure}>
            <span className={`${classes.figureTick} ${classes.figureTickTl}`} aria-hidden="true" />
            <span className={`${classes.figureTick} ${classes.figureTickBr}`} aria-hidden="true" />
            <img alt={t.figureAlt} src={installation2} className={classes.figureImage} />
            <figcaption className={classes.figureCaption}>
              <span>{t.figureNumber}</span>
              <span>{t.figureCaption}</span>
            </figcaption>
          </figure>
        </div>

        <div className={classes.ruler} aria-hidden="true" />

        <div className={classes.channels}>
          <p className={classes.channelsLabel}>{t.channelsLabel}</p>
          <div className={classes.channelList}>
            {t.channels.map(({ code, title, text, to, cta }) => (
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
