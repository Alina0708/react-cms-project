import { useState } from 'react';
import { knowledge, endings, blacklist } from './baseknow';
import SpeechRecognition from 'react-speech-recognition';

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
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  function handleForm(e) {
    e.preventDefault();
    if (inputValue !== '') {
      setMessages([...messages, <div class="dialog__message question">{inputValue}</div>]);
      let [answer, photo] = getAnswer(inputValue);
      setMessages([
        ...messages,
        <div class="dialog__message answer" dangerouslySetInnerHTML={{ __html: answer }}></div>,
      ]);
      // photo.forEach((element) => {
      //   messanger.innerHTML += element;
      // });
      // messanger.scrollTop = 99999;

      let utterance = new SpeechSynthesisUtterance(answer);
      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);
    }
    setInputValue('');
  }

  function inputClick() {
    speechSynthesis.cancel();
  }

  function buttonOver() {
    let button = document.getElementById('dialog__button');
    button.classList.add('dialog__button-hover');
  }

  function buttonOut() {
    let button = document.getElementById('dialog__button');
    button.classList.remove('dialog__button-hover');
  }

  function buttonClick() {
    let button = document.getElementById('dialog__button');
    button.classList.add('dialog__button-listen');

    speechSynthesis.cancel();

    let recognizer = new SpeechRecognition(); //webkit..
    recognizer.interimResults = true;
    recognizer.lang = 'ru-Ru';
    // eslint-disable-next-line no-unused-expressions
    recognizer.on;
    recognizer.onresult = function (event) {
      let result = event.results[event.resultIndex];
      if (result.isFinal) {
        setInputValue(result[0].transcript);
        button.classList.remove('dialog__button-listen');
        handleForm();
      } else {
        setInputValue(result[0].transcript);
      }
    };
    recognizer.onaudioend = function (event) {
      button.classList.remove('dialog__button-listen');
    };
    recognizer.start();
  }

  function getEnding(word) {
    // проверка по черному списку
    if (blacklist.indexOf(word) !== -1) return -1;
    // перебор псевдоокончаний
    for (let j = 0; j < endings.length; j++) {
      // проверка, оканчивается ли i-ое слово на j-ое псевдоокончание
      if (word.substring(word.length - endings[j][0].length) === endings[j][0]) {
        return j; // возврат номера псевдоокончания
      }
    }
    return -1;
  }

  // функция, которая делает первую букву большой
  function big1(str) {
    return str[0].toUpperCase() + str.slice(1);
  }

  // главная функция, обрабатывающая запросы клиентов
  function getAnswer(question) {
    let txt = question.toLowerCase().replace(/[*_#?'",.!()[\]\\/]/g, '');
    // массив слов и знаков препинания
    let words = txt.split(' ');
    // флаг, найден ли ответ
    let result = false;
    // формируемый функцией ответ на вопрос
    let answer = [];
    answer[0] = '';
    answer[1] = new Array([]);
    // перебор слов
    for (let i = 0; i < words.length; i++) {
      // поиск номера псевдоокончания
      let ending = getEnding(words[i]);

      // если псевдоокончание найдено – это сказуемое, подлежащее в вопросе после него
      if (ending >= 0) {
        // ТОЧНЫЙ ПОИСК
        let subject_array = words.slice(i + 1);
        let subject_text = subject_array.join(' ');
        for (let j = 0; j < knowledge.length; j++)
          if (
            ((words[i] === knowledge[j][1] || // точное совпадение сказуемого
              words[i].substring(0, words[i].length - endings[ending][0].length) + endings[ending][1] ===
                knowledge[j][1]) && // совпадение сказуемого с подстановкой (такое ->- это)
              subject_text === knowledge[j][0]) ||
            subject_text === knowledge[j][2]
          ) {
            // совпадение подлежащего
            // создание простого предложения из семантической связи
            answer[0] += big1(knowledge[j][0] + ' ' + knowledge[j][1] + ' ' + knowledge[j][2] + '.<br/>');
            if (knowledge[j][3]) answer[1].push(knowledge[j][3]);
            result = true;
            return answer;
          }
        if (result === false) {
          // ПОИСК С ПОМОЩЬЮ РЕГУЛЯРНЫХ ВЫРАЖЕНИЙ
          // замена псевдоокончания на набор возможных окончаний
          words[i] = words[i].substring(0, words[i].length - endings[ending][0].length) + endings[ending][1];
          // создание регулярного выражения для поиска по сказуемому из вопроса
          let predicate = new RegExp(words[i]);
          // для кратких прилагательных захватываем следующее слово
          if (endings[ending][0] === endings[ending][1]) {
            predicate = new RegExp(words[i] + ' ' + words[i + 1]);
            i++;
          }
          let subject_array = words.slice(i + 1);
          // создание регулярного выражения для поиска по подлежащему из вопроса
          // из слов подлежащего выбрасываем короткие предлоги (периметр у квадрата = периметр квадрата)
          for (let j = 0; j < subject_array.length; j++) {
            if (subject_array[j].length < 3) {
              subject_array.splice(j);
              j--;
            }
          }
          let subject_string = subject_array.join('.*');
          // только если в послежащем больше трех символов
          if (subject_string.length > 3) {
            let subject = new RegExp('.*' + subject_string + '.*');
            // поиск совпадений с шаблонами среди связей семантической сети
            for (let j = 0; j < knowledge.length; j++) {
              if (predicate.test(knowledge[j][1]) && (subject.test(knowledge[j][0]) || subject.test(knowledge[j][2]))) {
                // создание простого предложения из семантической связи
                answer[0] += big1(knowledge[j][0] + ' ' + knowledge[j][1] + ' ' + knowledge[j][2] + '.<br/>');
                if (knowledge[j][3]) answer[1].push(knowledge[j][3]);
                result = true;
                return answer;
              }
            }
            // если совпадений с двумя шаблонами нет
            if (result === false) {
              // поиск совпадений только с шаблоном подлежащего
              for (let j = 0; j < knowledge.length; j++) {
                if (subject.test(knowledge[j][0]) || subject.test(knowledge[j][2])) {
                  // создание простого предложения из семантической связи
                  answer[0] += big1(knowledge[j][0] + ' ' + knowledge[j][1] + ' ' + knowledge[j][2] + '.<br/>');
                  if (knowledge[j][3]) answer[1].push(knowledge[j][3]);
                  result = true;
                  return answer;
                }
              }
            }
          }
        }
      }
    }
    if (!result) answer[0] = 'Ответ не найден';
    return answer;
  }
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
        <img alt="W_UQ" src={W_UQ} />
        <span className={classes.numberingFormule}>(1)</span>
      </div>
      <p>
        ,а количество электричества или электрический заряд — это произведение силы тока на время протекания тока
        формула (2).
      </p>
      <div className={classes.formule}>
        <img alt="Q" src={Q} />
        <span className={classes.numberingFormule}>(2)</span>
      </div>
      <p>то получаем</p>
      <h3>Работа электрического тока через напряжение и ток</h3>
      <div className={classes.formule}>
        <img alt="W" src={W} />
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
        <img alt="E" src={E} />
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
        <img alt="E_W" src={E_W} />
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
      <section className={classes1.dialog}>
        <div className={classes1.dialog__window}>
          <h4 className={classes1.dialog__header}>База знаний</h4>
          <div className={classes1.dialog__body} id="dialog__messanger">
            {messages.map((item) => (
              <>{item}</>
            ))}
          </div>
          <form className={classes1.dialog__submit} id="dialog__form" onSubmit={handleForm}>
            <input
              className={classes1.dialog__input}
              id="dialog__input"
              type="text"
              name="question"
              autocomplete="off"
              placeholder="Введите ваш вопрос"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onClick={inputClick}
            />
            <button
              className={classes1.dialog__button}
              onMouseOver={buttonOver}
              onMouseOut={buttonOut}
              id="dialog__button"
              type="button"
              onClick={buttonClick}
            >
              <i className="fas fa-microphone"></i>
            </button>
          </form>
        </div>
      </section>
    </section>
  );
};
export default Theory;
