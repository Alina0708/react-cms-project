import classes from '../Simulator/Simulator.module.css';
import photo1 from '../../image/photo1.png';
import photo2 from '../../image/photo2.png';
import photo3 from '../../image/photo3.png';
import photo4 from '../../image/photo4.png';
import photo5 from '../../image/photo5.png';
import photo6 from '../../image/photo6.png';
import photo7 from '../../image/photo7.png';
import photo9 from '../../image/photo9.png';
import photo10 from '../../image/photo10.png';
import photo11 from '../../image/photo11.png';
import { useLanguage } from '../../i18n/LanguageContext';
import { translations } from './Simulator.translations';

const Simulator = () => {
  const { language } = useLanguage();
  const { title, captions } = translations[language];

  return (
    <section>
      <h1 className={classes.titleSticky}>{title}</h1>
      <div className={classes.sizeImage}>
        <p>{captions.start}</p>
        <img alt="installation2" src={photo1} />
        <p>{captions.tasks}</p>
        <img alt="photo2" src={photo2} loading="lazy" />
        <p>{captions.powerOn}</p>
        <img alt="photo3" src={photo3} loading="lazy" />
        <p>{captions.stopwatch}</p>
        <img alt="photo4" src={photo4} loading="lazy" />
        <p>{captions.voltage}</p>
        <img alt="photo5" src={photo5} loading="lazy" />
        <p>{captions.recordVoltage}</p>
        <img alt="photo6" src={photo6} loading="lazy" />
        <p>{captions.current}</p>
        <img alt="photo7" src={photo7} loading="lazy" />
        <p>{captions.recordValue}</p>
        <img alt="photo9" src={photo9} loading="lazy" />
        <p>{captions.successMessage}</p>
        <img alt="photo10" src={photo10} loading="lazy" />
        <p>{captions.readTable}</p>
        <img alt="photo11" src={photo11} loading="lazy" />
      </div>
    </section>
  );
};

export default Simulator;
