import { LANGUAGES, useLanguage } from '../../../i18n/LanguageContext';
import classes from './LanguageToggle.module.css';

const LANGUAGE_LABELS = { ru: 'RU', en: 'EN' };

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();
  const activeIndex = LANGUAGES.indexOf(language);

  return (
    <div className={classes.toggle} role="group" aria-label="Language">
      <span
        className={classes.thumb}
        style={{ transform: `translateX(${activeIndex * 100}%)` }}
        aria-hidden="true"
      />
      {LANGUAGES.map((code) => (
        <button
          key={code}
          type="button"
          className={`${classes.option} ${language === code ? classes.active : ''}`}
          aria-pressed={language === code}
          onClick={() => setLanguage(code)}
        >
          {LANGUAGE_LABELS[code]}
        </button>
      ))}
    </div>
  );
};

export default LanguageToggle;
