import { useState, useEffect } from 'react';
import Baseknow from './baseknow';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';

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
  //--------------------------------------
  const [tooltip, showTooltip] = useState(true);
  const [tooltipImg, showTooltipImg] = useState(true);

  useEffect(() => {
    Baseknow();
  }, []);
  let i = 0;
  const OpenBase = () => {
    let base = document.getElementById('dialog');
    console.log('heeeeeeelp');
    i = i + 1;
    if (i % 2 === 1) {
      base.style.display = 'block';
    } else {
      base.style.display = 'none';
    }
  };
  return (
    <section className={classes.theory}>
      <h1 className={classes.titleSticky}>ВНУТРЕННЯЯ ЭНЕРГИЯ И РАБОТА ЭЛЕКТРИЧЕСКОГО ТОКА</h1>
      <p className={classes.indent}>
        <span className={classes.definition}>Электрическая энергия (электроэнергия)</span>- способность
        электромагнитного поля совершать работу под действием приложенного напряжения в технологическом процессе её
        производства, передачи, распределения и потребления.
      </p>
      <p>
        Электрическую энергию можно получать из других видов энергии и преобразовывать в другие виды энергии. Для нее
        справедлив{' '}
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
          закон сохранения энергии
        </span>
        {tooltip && (
          <ReactTooltip id="energy" place="bottom" type="dark" effect="float">
            <span>E = Ep + Ek = const</span>
          </ReactTooltip>
        )}
        . В проводнике носители заряда движутся под действием электрического поля, а при переносе заряда совершается
        работа.
      </p>
      <p>Если:</p>
      <p>
        <span className={classes.decoding}>W</span> — работа электрического тока (Дж = Вт·с),
      </p>
      <p>
        <span className={classes.decoding}>U</span> — напряжение (В),
      </p>
      <p>
        <span className={classes.decoding}>I</span> — сила тока (A),
      </p>
      <p>
        <span className={classes.decoding}>R</span> — сопротивление цепи (Ом),
      </p>
      <p>
        <span className={classes.decoding}>t</span> — время протекания тока (c),
      </p>
      <p>
        <span className={classes.decoding}>Q</span> — переносимый током заряд,
      </p>
      <p>То, работа электрического тока:</p>
      <div className={classes.formule}>
        <img alt="W_UQ" className={classes.omaW2} src={W_UQ} />
        <span className={classes.numberingFormule}>(1)</span>
      </div>
      <p>
        ,а количество электричества или электрический заряд — это произведение силы тока на время протекания тока
        формула (2).
      </p>
      <div className={classes.formule}>
        <img alt="Q" className={classes.omaW2} src={Q} />
        <span className={classes.numberingFormule}>(2)</span>
      </div>
      <p>то получаем</p>
      <h3>Работа электрического тока через напряжение и ток</h3>
      <div className={classes.formule}>
        <img alt="W" className={classes.omaW2} src={W} />
        <span className={classes.numberingFormule}>(3)</span>
      </div>
      <p>
        При подстановки закона ома &nbsp;
        <div className={classes.formule}>
          <img alt="Oma" src={Oma} className={classes.omaW} />
          <span className={classes.numberingFormule}>(4)</span>
        </div>
      </p>
      <p>
        в формулу (3) закона Джоуля — Ленца мы получим работу электрического тока через напряжение и сопротивление:
        &nbsp;
        <div className={classes.formule}>
          <img alt="W_u2" src={W_u2} className={classes.omaW} />
          <span className={classes.numberingFormule}>(5),</span>
        </div>
      </p>
      <p>
        работа электрического тока через ток и сопротивление:
        <div className={classes.formule}>
          <img alt="w_i" src={w_i} className={classes.w_i} />
          <span className={classes.numberingFormule}>(6)</span>
        </div>
      </p>
      <p>Единицей работы СИ является джоуль (Дж).</p>
      <h3>Tеплота при изменении температуры</h3>
      <p>Внутреннюю энергию термодинамической системы можно изменить двумя способами:</p>
      <ul>
        <li>совершая над системой работу,</li>
        <li>при помощи теплового взаимодействия.</li>
      </ul>
      <p>
        Передача тепла телу не связана с совершением над телом макроскопической работы. В данном случае изменение
        внутренней энергии вызвано тем, что отдельные молекулы тела с большей температурой совершают работу над
        некоторыми молекулами тела, которое имеет меньшую температуру. В этом случае тепловое взаимодействие реализуется
        за счет теплопроводности. Передача энергии также возможна при помощи излучения. Система микроскопических
        процессов (относящихся не ко всему телу, а к отдельным молекулам) называется теплопередачей. Количество энергии,
        которое передается от одного тела к другому в результате теплопередачи, определяется количеством теплоты,
        которое предано от одного тела другому.
      </p>
      <p>
        <span className={classes.definition}>Теплотой</span> называют энергию, которая получается (или отдается) телом в
        процессе теплообмена с окружающими телами (средой). Обозначается теплота, обычно буквой Q или &#x394;E.
      </p>
      <p>
        Работа электрического тока вызывает повышение температуры тела от начального значения T0 до конечного значения
        Tn. Внутренняя энергия увеличивается на величину:
      </p>
      <div className={classes.formule}>
        <img alt="E" className={classes.omaW2} src={E} />
        <span className={classes.numberingFormule}>(7)</span>
      </div>
      <p>где m – масса тела,</p>
      <p> c – удельная теплоемкость материала тела.</p>
      <br />
      <p>
        Чтобы максимально избежать чистого теплообмена с окружающей средой, перед началом измерения тело охлаждается до
        начальной температуры T0, которая немного ниже комнатной.
      </p>
      <p>В таких условиях изменение внутренней энергии должно быть равно проделанной работе, что означает следующее:</p>
      <div className={classes.formule}>
        <img alt="E_W" className={classes.omaW2} src={E_W} />
        <span className={classes.numberingFormule}>(8)</span>
      </div>
      <p>
        Датчик температуры используется для измерения температуры T путем измерения его сопротивления, которое зависит
        от температуры:
      </p>
      <div className={classes.formule}>
        <img alt="T" src={T} className={classes.omaW} />
        <span className={classes.numberingFormule}>(9)</span>
      </div>
      <p>
        Измеренные таким образом температуры наносятся на график в зависимости от работы электрического тока (рис. 2.1).
        Удельная теплоемкость материала тела можно определить по наклону прямых линий на графике.
      </p>
      <h3>Ученые</h3>
      <p>
        Закон Джо́уля — Ле́нца (3) — физический закон, дающий количественную оценку теплового действия электрического
        тока. Установлен в 1841 году Джеймсом Джоулем и независимо от него в 1842 году Эмилием Ленцем.
      </p>
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
          Джеймс Пре́скотт Джо́уль
        </span>{' '}
        (англ. James Prescott Joule; 24 декабря 1818, Солфорд, Ланкашир, Англия, Великобритания — 11 октября 1889, Сэйл,
        Чешир, Англия, Великобритания) — английский физик, внёсший значительный вклад в становление термодинамики.
        Обосновал на опытах закон сохранения энергии. Установил закон, определяющий тепловое действие электрического
        тока. Вычислил скорость движения молекул газа и установил её зависимость от температуры.
      </p>
      {tooltipImg && (
        <ReactTooltip id="Joul" place="bottom" type="dark" effect="float">
          <img className={classes['joule-tooltip']} alt="joule" src={joule} />
        </ReactTooltip>
      )}
      <p>
        Эмилий Христианович Ленц (при рождении Генрих Фридрих Эмиль Ленц, нем. Heinrich Friedrich Emil Lenz; 12 (24)
        февраля 1804, Дерпт — 29 января (10 февраля) 1865[4], Рим) — российский физик немецкого происхождения. Выходец
        из балтийских немцев. Э. Х. Ленц является одним из основоположников электротехники. С его именем связано
        открытие закона, определяющего тепловые действия тока, и закона, определяющего направление индукционного тока,
        профессор и ректор Императорского Санкт-Петербургского университета (1863—1865), академик.
      </p>
      <div className={classes.scientists}>
        <div className={classes.scientist}>
          <img alt="joule" src={joule} />
          <em>Джеймс Прескотт Джоуль</em>
        </div>

        <div className={classes.scientist}>
          <img alt="lenz" src={lenz} />
          <em>Эмилий Христианович Ленц</em>
        </div>
      </div>
      <p>
        Гео́рг Си́мон Ом (нем. Georg Simon Ohm; 16 марта 1789, Эрланген — 6 июля 1854, Мюнхен) — немецкий физик. Он вывел
        теоретически и подтвердил на опыте закон, выражающий связь между силой тока в цепи, напряжением и сопротивлением
        (известен как закон Ома). Его именем названа единица электрического сопротивления (Ом).
      </p>
      <div className={classes.scientists}>
        <div className={classes.scientist}>
          <img alt="Om" src={om} />
          <em>Георг Симон Ом</em>
        </div>
      </div>
      <section id="dialog" className={classes1.dialog}>
        <div className={classes1.dialog__window}>
          <h4 className={classes1.dialog__header}>Помощник</h4>
          <div className={classes1.dialog__body} id="dialog__messanger"></div>
          <form className={classes1.dialog__submit} id="dialog__form" onSubmit={() => false}>
            <input
              className={classes1.dialog__input}
              id="dialog__input"
              type="text"
              name="question"
              autocomplete="off"
              placeholder="Введите ваш вопрос"
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
    </section>
  );
};
export default Theory;
