import classes from '../Contacts/Contacts.module.css';

import avatar from '../../image/foto4.jpg';
import telegramIcon from '../../image/icons/telegramIcon.png';
import githubIcon from '../../image/icons/githubIcon.png';
import phoneIcon from '../../image/icons/phoneIcon.png';
import emailIcon from '../../image/icons/emailIcon.png';
import { useLanguage } from '../../i18n/LanguageContext';
import { translations } from './Contacts.translations';

const Contacts = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className={classes.profile}>
      <div className={classes.aboutMe__container}>
        <div className={classes.contact}>
          <div className={classes.aboutMe}>
            <h4>{t.aboutMeTitle}</h4>
          </div>
          <p>{t.aboutMeText}</p>
        </div>
        <div className={classes.foto}>
          <img alt="avatar" src={avatar} />
          <p>{t.photoCaption}</p>
        </div>
      </div>
      <div className={classes.number}>
        <p className={classes['communication-methods']}>{t.contactPrompt}</p>
        <div className={classes['icon-container']}>
          <div>
            <a href="tel:375295269874">
              <img className={classes.icon} src={phoneIcon} alt="telegram" />
            </a>
          </div>
          <div>
            <a href="mailto:alina.sevryuk0708@gmail.com">
              <img className={classes.icon} src={emailIcon} alt="telegram" />
            </a>
          </div>
          <div>
            <a href="https://github.com/Alina0708/react-cms-project.git" target="_blank" rel="noreferrer">
              <img className={classes.icon} src={githubIcon} alt="github" />
            </a>
          </div>
          <div>
            <a href="https://t.me/alina_sevryuk" target="_blank" rel="noreferrer">
              <img className={classes.icon} src={telegramIcon} alt="telegram" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
