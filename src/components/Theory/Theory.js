import { useState, useEffect, useRef } from 'react';
import Baseknow from './baseknow';
import { findAnswer } from './knowledgeData';
import { useLanguage } from '../../i18n/LanguageContext';
import { translations } from './Theory.translations';

import classes from '../Theory/Theory.module.css';
import ReactTooltip from 'react-tooltip';

import W from '../../image/formula_W.png';
import T from '../../image/formula_T.png';
import E from '../../image/formula_E.png';
import E_W from '../../image/E=W.png';
import W_UQ from '../../image/W_UQ.png';
import Q from '../../image/Q.png';
import Oma from '../../image/Oma.png';
import W_u2 from '../../image/W_u2.png';
import w_i from '../../image/w_i.png';
import joule from '../../image/joule.jpg';
import lenz from '../../image/lenz.jpg';
import om from '../../image/Ohm.jpg';
import classes1 from './basestyle.module.css';

const Theory = () => {
  const [tooltip, showTooltip] = useState(true);
  const [tooltipImg, showTooltipImg] = useState(true);
  const { language } = useLanguage();
  const t = translations[language];

  const languageRef = useRef(language);
  useEffect(() => {
    languageRef.current = language;
  }, [language]);

  useEffect(() => {
    Baseknow(() => languageRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let i = 0;
  const OpenBase = () => {
    let base = document.getElementById('dialog');
    i = i + 1;
    if (i % 2 === 1) {
      base.style.display = 'block';
    } else {
      base.style.display = 'none';
    }
  };

  const OpenBaseDialog = () => {
    // eslint-disable-next-line no-restricted-globals
    confirm(t.confirmPrompt);
    let question = prompt(t.promptQuestion, '');
    if (question) alert(findAnswer(question, language).text);
  };

  return (
    <section className={classes.theory}>
      <h1 className={classes.titleSticky}>{t.pageTitle}</h1>
      <p className={classes.indent}>
        <span className={classes.definition}>{t.definitionTerm}</span>
        {t.definitionRest}
      </p>
      <p>
        {t.para1Before}{' '}
        <span
          className={classes['link-tooltip']}
          data-tip="energy"
          data-for="energy"
          onMouseEnter={() => showTooltip(true)}
          onMouseLeave={() => {
            showTooltip(false);
            setTimeout(() => showTooltip(true), 50);
          }}
        >
          {t.tooltipLabel}
        </span>
        {tooltip && (
          <ReactTooltip id="energy" place="bottom" type="dark" effect="float">
            <span>E = Ep + Ek = const</span>
          </ReactTooltip>
        )}
        {t.para1After}
      </p>
      <p>{t.ifLabel}</p>
      <p>
        <span className={classes.decoding}>W</span> — {t.decodingW}
      </p>
      <p>
        <span className={classes.decoding}>U</span> — {t.decodingU}
      </p>
      <p>
        <span className={classes.decoding}>I</span> — {t.decodingI}
      </p>
      <p>
        <span className={classes.decoding}>R</span> — {t.decodingR}
      </p>
      <p>
        <span className={classes.decoding}>t</span> — {t.decodingT}
      </p>
      <p>
        <span className={classes.decoding}>Q</span> — {t.decodingQ}
      </p>
      <p>{t.thenWork}</p>
      <div className={classes.formule}>
        <img alt="W_UQ" className={classes.omaW2} src={W_UQ} loading="lazy" />
        <span className={classes.numberingFormule}>(1)</span>
      </div>
      <p>{t.afterFormula1}</p>
      <div className={classes.formule}>
        <img alt="Q" className={classes.omaW2} src={Q} loading="lazy" />
        <span className={classes.numberingFormule}>(2)</span>
      </div>
      <p>{t.thenWeGet}</p>
      <h3>{t.sectionWorkViaVoltage}</h3>
      <div className={classes.formule}>
        <img alt="W" className={classes.omaW2} src={W} loading="lazy" />
        <span className={classes.numberingFormule}>(3)</span>
      </div>
      <p>
        {t.substOhm} &nbsp;
        <div className={classes.formule}>
          <img alt="Oma" src={Oma} className={classes.omaW} loading="lazy" />
          <span className={classes.numberingFormule}>(4)</span>
        </div>
      </p>
      <p>
        {t.afterOhmSub}
        &nbsp;
        <div className={classes.formule}>
          <img alt="W_u2" src={W_u2} className={classes.omaW} loading="lazy" />
          <span className={classes.numberingFormule}>(5),</span>
        </div>
      </p>
      <p>
        {t.workViaCurrent}
        <div className={classes.formule}>
          <img alt="w_i" src={w_i} className={classes.w_i} loading="lazy" />
          <span className={classes.numberingFormule}>(6)</span>
        </div>
      </p>
      <p>{t.siUnit}</p>
      <h3>{t.sectionHeatTemp}</h3>
      <p>{t.internalEnergyIntro}</p>
      <ul>
        <li>{t.methodWork}</li>
        <li>{t.methodHeat}</li>
      </ul>
      <p>{t.heatTransferParagraph}</p>
      <p>
        <span className={classes.definition}>{t.heatDefinitionTerm}</span>
        {t.heatDefinitionRest}
      </p>
      <p>{t.tempRiseParagraph}</p>
      <div className={classes.formule}>
        <img alt="E" className={classes.omaW2} src={E} loading="lazy" />
        <span className={classes.numberingFormule}>(7)</span>
      </div>
      <p>{t.whereM}</p>
      <p>{t.whereC}</p>
      <br />
      <p>{t.avoidHeatExchange}</p>
      <p>{t.conditionsParagraph}</p>
      <div className={classes.formule}>
        <img alt="E_W" className={classes.omaW2} src={E_W} loading="lazy" />
        <span className={classes.numberingFormule}>(8)</span>
      </div>
      <p>{t.tempSensorParagraph}</p>
      <div className={classes.formule}>
        <img alt="T" src={T} className={classes.omaW} loading="lazy" />
        <span className={classes.numberingFormule}>(9)</span>
      </div>
      <p>{t.graphParagraph}</p>
      <h3>{t.scientistsTitle}</h3>
      <p>{t.jouleLenzLawParagraph}</p>
      <p>
        <span
          className={classes['link-tooltip']}
          data-tip="Joul"
          data-for="Joul"
          onMouseEnter={() => showTooltipImg(true)}
          onMouseLeave={() => {
            showTooltipImg(false);
            setTimeout(() => showTooltipImg(true), 50);
          }}
        >
          {t.jouleTooltipLabel}
        </span>
        {t.jouleBioRest}
      </p>
      {tooltipImg && (
        <ReactTooltip id="Joul" place="bottom" type="dark" effect="float">
          <img className={classes['joule-tooltip']} alt="joule" src={joule} />
        </ReactTooltip>
      )}
      <p>{t.lenzBio}</p>
      <div className={classes.scientists}>
        <div className={classes.scientist}>
          <img alt="joule" src={joule} loading="lazy" />
          <em>{t.jouleCaption}</em>
        </div>

        <div className={classes.scientist}>
          <img alt="lenz" src={lenz} loading="lazy" />
          <em>{t.lenzCaption}</em>
        </div>
      </div>
      <p>{t.omBio}</p>
      <div className={classes.scientists}>
        <div className={classes.scientist}>
          <img alt="Om" src={om} loading="lazy" />
          <em>{t.omCaption}</em>
        </div>
      </div>

      <table className={classes.dataTable}>
        <thead>
          <tr>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>№</td>
            <td>Date</td>
            <td>Salary</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td>1</td>
            <td>01.01.2024</td>
            <td>1000</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td>2</td>
            <td>02.01.2024</td>
            <td>1500</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td>3</td>
            <td>03.01.2024</td>
            <td>2000</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td>4</td>
            <td>04.01.2024</td>
            <td>2500</td>
            <td>-</td>
            <td>-</td>
          </tr>
          <tr>
            <td>5</td>
            <td>05.01.2024</td>
            <td>3000</td>
            <td>-</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>

      <section id="dialog" className={classes1.dialog}>
        <div className={classes1.dialog__window}>
          <h4 className={classes1.dialog__header}>{t.assistantDialogTitle}</h4>
          <div className={classes1.dialog__body} id="dialog__messanger"></div>
          <form className={classes1.dialog__submit} id="dialog__form" onSubmit={() => false}>
            <input
              className={classes1.dialog__input}
              id="dialog__input"
              type="text"
              name="question"
              autoComplete="off"
              placeholder={t.inputPlaceholder}
            />
            <button className={classes1.dialog__button} id="dialog__button" type="button">
              <i className="fas fa-microphone"></i>
            </button>
          </form>
        </div>
      </section>

      <section>
        <div id="button_knowledge" onMouseDown={OpenBase} className={classes.button_knowledg_button_open}>
          ?
        </div>
      </section>

      <section>
        <div id="button_knowledge" onMouseDown={OpenBaseDialog} className={classes.button_knowledg_button_open1}>
          {t.openBaseDialogButtonLabel}
        </div>
      </section>
    </section>
  );
};

export default Theory;
