import { useState } from 'react';

import classes from '../Structure/Structure.module.css';
import installation2 from '../../image/installation2.jpg';
import DC_Power_Supply from '../../image/DC_Power_Supply.jpg';
import multimetr from '../../image/multimetr.png';
import power from '../../image/power.jpg';
import copper from '../../image/copper.jpg';
import time from '../../image/time.jpg';
import aluminum from '../../image/aluminum.jpg';
import Modal from '../Modal/Modal';
import { useLanguage } from '../../i18n/LanguageContext';
import { translations } from './Structure.translations';

const Structure = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const imagesType = { power: power, multimetr: multimetr, copper: copper, time: time, aluminum: aluminum };
  const [displayImg, setDisplayImg] = useState({
    power: false,
    multimetr: false,
    copper: false,
    time: false,
    aluminum: false,
  });
  const [show, setShow] = useState();

  const displayImgName = Object.keys(displayImg).find((item) => displayImg[item]);

  const closeImg = () => {
    setShow(false);
    setDisplayImg({ ...displayImg, displayImgName: false });
  };

  return (
    <section className={classes.structure}>
      <h1 className={classes.titleSticky}>{t.title}</h1>
      <div className={classes.descriptionInstallation}>
        <div className={classes.fotoInstallation}>
          <img alt="installation2" src={installation2} />
          <p>{t.installationCaption}</p>
        </div>
        <div className={classes.compound}>
          <em
            images="https://m.media-amazon.com/images/I/81pXZat-ifL._SL1500_.jpg"
            onClick={() => {
              setDisplayImg({ power: true });
              setShow(true);
            }}
          >
            {t.components.power}
          </em>
          <em
            onClick={() => {
              setDisplayImg({ copper: true });
              setShow(true);
            }}
          >
            {t.components.copper}
          </em>
          <em
            onClick={() => {
              setDisplayImg({ aluminum: true });
              setShow(true);
            }}
          >
            {t.components.aluminum}
          </em>
          <em
            onClick={() => {
              setDisplayImg({ multimetr: true });
              setShow(true);
            }}
          >
            {t.components.multimetr}
          </em>
          <em
            onClick={() => {
              setDisplayImg({ time: true });
              setShow(true);
            }}
          >
            {t.components.time}
          </em>
          {show && (
            <Modal show={show} setShow={closeImg}>
              <div>
                <img alt="images" src={imagesType[displayImgName]} />
              </div>
            </Modal>
          )}
        </div>
      </div>
      <h1>{t.powerSupplyTitle}</h1>
      <div className={classes.componentInstallaion}>
        <img alt="DC_Power_Supply" src={DC_Power_Supply} />
        <div className={classes.power}>
          {t.powerSupplyDescription}
          {t.powerSupplySpecs.map((spec) => (
            <p key={spec}>{spec}</p>
          ))}
        </div>
      </div>
      <h1>{t.multimeterTitle}</h1>
      <div className={classes.componentInstallaion}>
        <img alt="multimetr" src={multimetr} className={classes.sizeImage} />
        <div className={classes.multimetr}>
          <p>{t.multimeterModel}</p>
          <p>{t.multimeterDescription}</p>
          <p>{t.multimeterFunctionsLabel}</p>
          <ul>
            {t.multimeterFunctions.map((fn) => (
              <li key={fn}>{fn}</li>
            ))}
          </ul>
          {t.multimeterSpecs.map((spec) => (
            <p key={spec}>{spec}</p>
          ))}
        </div>
      </div>

      <h1 className={classes.titleSticky}>{t.workflowTitle}</h1>
      {t.workflowSteps.map((step) => (
        <p key={step}>{step}</p>
      ))}

      <h1 className={classes.titleSticky}>{t.additionalInfoTitle}</h1>
      <div>
        {t.mapPrompt}{' '}
        <a href="map/test100.html" target="_blank" rel="noreferrer">
          {t.mapLink}
        </a>
      </div>
      <div>
        {t.videoPrompt}{' '}
        <a href="map/video_html.html" target="_blank" rel="noreferrer">
          {t.videoLink}
        </a>
      </div>
    </section>
  );
};

export default Structure;
