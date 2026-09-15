import classes from '../Home/Home.module.css';
import installation1 from '../../image/installation1.jpg';
import { useLanguage } from '../../i18n/LanguageContext';
import { translations } from './Home.translations';

const Home = () => {
  const { language } = useLanguage();
  const t = translations[language];

  return (
    <section className={classes.term}>
      <img alt={installation1} src={installation1} className={classes.foneImage} />
      <div className={classes.centered}>
        <p>{t.university}</p>
        <p>{t.faculty}</p>
        <p>{t.department}</p>
        <p>{t.projectFor}</p>
        <p>{t.discipline}</p>
        <p>{t.topic}</p>
      </div>
      <div className={classes.developer}>
        <p>{t.completedBy}</p>
        <p>{t.author}</p>
      </div>
    </section>
  );
};

export default Home;
