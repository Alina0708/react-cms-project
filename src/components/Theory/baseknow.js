import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
SpeechRecognition.startListening({ continuous: true });

const Baseknow = () => {
  let form = document.getElementById('dialog__form');
  let input = document.getElementById('dialog__input');
  let button = document.getElementById('dialog__button');
  let messanger = document.getElementById('dialog__messanger');

  form.addEventListener('submit', handleForm);

  function handleForm(e) {
    e.preventDefault();
    if (input.value != '') {
      messanger.innerHTML += `<div class="dialog__message question">${input.value}</div>`;
      let [answer, photo] = getAnswer(input.value);
      messanger.innerHTML += `<div class="dialog__message answer">${answer}</div>`;
      photo.forEach((element) => {
        messanger.innerHTML += element;
      });
      messanger.scrollTop = 99999;

      let utterance = new SpeechSynthesisUtterance(answer);
      speechSynthesis.cancel();
      speechSynthesis.speak(utterance);
    }
    input.value = '';
  }

  input.addEventListener('click', inputClick, false);

  function inputClick() {
    speechSynthesis.cancel();
  }

  button.addEventListener('mouseover', buttonOver, false);
  button.addEventListener('mouseout', buttonOut, false);
  button.addEventListener('click', buttonClick, false);

  function buttonOver() {
    button.classList.add('dialog__button-hover');
  }

  function buttonOut() {
    button.classList.remove('dialog__button-hover');
  }

  function buttonClick() {
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
        input.value = result[0].transcript;
        button.classList.remove('dialog__button-listen');
        handleForm();
      } else {
        input.value = result[0].transcript;
      }
    };
    recognizer.onaudioend = function (event) {
      button.classList.remove('dialog__button-listen');
    };
    recognizer.start();
  }

  let knowledge = [
    [
      'электрическая энергия',
      '- это',
      'способность электромагнитного поля совершать работу под действием приложенного напряжения в технологическом процессе её производства, передачи, распределения и потребления',
    ],
    ['электрическая энергия', 'получается', 'из других видов энергии и преобразовывается в другие виды энергии'],
    [
      'закон сохранения энергии',
      'означает',
      'фундаментальный закон природы, установленный эмпирически и заключающийся в том, что для изолированной физической системы может быть введена скалярная физическая величина, являющаяся функцией параметров системы и называемая энергией, которая сохраняется с течением времени.',
    ],
    [
      'работа электрического тока',
      '',
      'на участке цепи пропорциональна напряжению на её концах и количеству заряда, проходящего по этому участку: A = U ⋅ q . Работа электрического тока на участке цепи пропорциональна силе тока, времени прохождения заряда и напряжению на концах участка цепи: A = U ⋅ I ⋅ t',
    ],
    ['формула работы тока', 'представляет', 'собой : A = U ⋅ I ⋅ t'],
    ['формула закона энергии', 'представляет', 'собой E = Ep + Ek = const'],
    [
      'электрический заряд',
      '- это',
      ' физическая скалярная величина, определяющая способность тел быть источником электромагнитных полей и принимать участие в электромагнитном взаимодействии',
    ],
    [
      'напряжение',
      '- это',
      'скалярная физическая величина, значение которой равно работе эффективного электрического поля, совершаемой при переносе единичного пробного электрического заряда из точки A в точку B.',
    ],
    ['eдиницей измерения напряжения', 'называется', 'вольт (В)'],
    [
      'сила тока',
      '- это',
      'скорость, с которой электроны проходят через определенную точку в замкнутой электрической цепи.',
    ],
    ['Сила тока', 'измеряется', 'Амперы'],
    ['формула силы тока', 'представляет', 'собой I = U/R'],
    ['сопротивление цепи', '- это', 'величина, которая отражает противодействие протеканию тока в электрической цепи.'],
    ['сопротивление', 'измеряется', 'в Омах'],
    [
      'сопротивление цепи',
      'вычисляют',
      'по следующими правилами: При последовательном соединении резисторов их сопротивления складываются: R = R 1 + R 2 . При параллельном соединении резисторов складываются их проводимости, то есть величины, обратные сопротивлениям: 1 R = 1 R 1 + 1 R 2 , или R = R 1 ⁢ R 2 R 1 + R 2 .',
    ],

    //----------
    ['единицей измерения энергии', 'называется', 'Джоуль (ДЖ)'],
    ['eдиницей измерения работы', 'называется', 'Джоуль (ДЖ = Вт * с)'],
    ['электрон', '- это', ' стабильная отрицательно заряженная элементарная частица'],

    ['цена деления', '- это', 'значение величины, которое соответствует разности двух ближайших отметок на этой шкале'],
    [
      'Закон Джоуля-Ленца',
      'значит',
      'Закон Джоуля-Ленца кратко: нагревание проводника или полупроводника прямо пропорционально его сопротивлению, времени действия тока и квадрату силы тока',
    ],
    ['формула Закон Джоуля-Ленца', '- это', 'Q=I2RΔt Q = I 2 R Δ t .'],
    [
      'внутренняя энергия термодинамической системы',
      'измеряется',
      '•	совершая над системой работу •	при помощи теплового взаимодействия.',
    ],
    [
      'теплота',
      '- это',
      'Теплотой называют энергию, которая получается (или отдается) телом в процессе теплообмена с окружающими телами (средой). Обозначается теплота, обычно буквой Q или ΔE.',
    ],
    [
      'сопротивление',
      '- это',
      'физическая величина, характеризующая свойство проводника препятствовать прохождению электрического тока и равная отношению напряжения на концах проводника к силе тока, протекающего по нему',
    ],

    ['сила тока', 'измеряется', 'в Амперах'],
    [
      'источник тока',
      '- это',
      'элемент, двухполюсник, сила тока через который не зависит от напряжения на его зажимах. Используются также термины генератор тока и идеальный источник тока',
    ],
    [
      'электрический ток',
      '- это',
      'направленное движение частиц или квазичастиц — носителей электрического заряда. Последующее электромагнитное взаимодействие между заряженными частицами осуществляется не прямо, а посредством электромагнитного поля',
    ],
    [
      'правило ленца',
      'гласит',
      'индукционный ток всегда имеет такое направление, что он ослабляет действие причины, возбуждающей этот ток',
    ],
    [
      'источник тока',
      'состоит',
      'из двух электродов: катода, содержащего окислитель, и анода, содержащего восстановитель, которые контактируют с электролитом',
    ],
    [
      'сила тока',
      '- это',
      'скалярная физическая величина, равная отношению электрического заряда dQ, прошедшего через определённую поверхность за бесконечно малый промежуток времени dt, к длительности этого промежутка',
    ],
    [
      'внутренняя энергия',
      '- это',
      'Вну́тренняя эне́ргия — принятое в физике сплошных сред, термодинамике и статистической физике название для той части полной энергии термодинамической системы, которая не зависит от выбора системы отсчета[1] и которая в рамках рассматриваемой задачи может изменяться',
    ],
    ['формула внутренней энергии', '- это', 'U = Q - A'],
    [
      'Джеймс Пре́скотт Джо́уль',
      '- это',
      '(англ. James Prescott Joule; 24 декабря 1818, Солфорд, Ланкашир, Англия, Великобритания — 11 октября 1889, Сэйл, Чешир, Англия, Великобритания) — английский физик, внёсший значительный вклад в становление термодинамики. Обосновал на опытах закон сохранения энергии. Установил закон, определяющий тепловое действие электрического тока. Вычислил скорость движения молекул газа и установил её зависимость от температуры.',
    ],
    [
      'Георг Симон Ом',
      '- это',
      'немецкий физик. Он вывел теоретически и подтвердил на опыте закон, выражающий связь между силой тока в цепи, напряжением и сопротивлением (известен как закон Ома). Его именем названа единица электрического сопротивления (Ом).',
    ],
    [
      'Эмилий Христианович Ленц',
      '- это',
      'российский физик немецкого происхождения. Выходец из балтийских немцев. Э. Х. Ленц является одним из основоположников электротехники. С его именем связано открытие закона, определяющего тепловые действия тока, и закона, определяющего направление индукционного тока, профессор и ректор Императорского Санкт-Петербургского университета (1863—1865), академик.',
    ],
    [
      'мультиметр',
      '- это',
      'Мультиметр – это многофункциональный электроизмерительный прибор. Основное его назначение – измерение характеристик электрического сигнала.',
    ],

    ['колебательный контур', 'состоит', 'из конденсатора C, катушки индуктивности L и магазина сопротивлений Rм'],
    ['секундомер', '- это', 'Точный прибор, показывающий время в долях секунды.'],
    [
      'датчик температуры',
      '- это',
      'Датчик температуры – это устройство, которое позволяет измерить температуру объекта или вещества, используя при этом различные свойства и характеристики измеряемых тел или среды.',
    ],
    [
      'температура',
      '-это',
      'Температу́ра — скалярная физическая величина, характеризующая термодинамическую систему и количественно выражающая интуитивное понятие о различной степени нагретости тел. Живые существа способны воспринимать ощущения тепла и холода непосредственно, с помощью органов чувств.',
    ],
    [
      'функции мультиметра',
      'назовите',
      '•	измерение постоянного и переменного напряжения, •	измерение постоянного и переменного тока, •	измерение сопротивления, емкости и индуктивности',
    ],
    ['установка', 'состоит', 'из мультиметра, источника тока, исследуемого тела и секундомера'],
    [
      'закон джоуля-ленца',
      '- это',
      'физический закон, дающий количественную оценку теплового действия электрического тока. Установлен в 1841 году Джеймсом Джоулем и независимо от него в 1842 году Эмилием Ленцем',
      '<img class="dialog__image" src="images/theory/jl_law.jpg"/>',
    ],
  ];

  // псевдоокончания сказуемых (глаголов, кратких причастий и прилагательных )
  let endings = [
    ['ет', '(ет|ут|ют)'],
    ['ут', '(ет|ут|ют)'],
    ['ют', '(ет|ут|ют)'], // 1 спряжение
    ['ит', '(ит|ат|ят)'],
    ['ат', '(ит|ат|ят)'],
    ['ят', '(ит|ат|ят)'], // 2 спряжение
    ['ется', '(ет|ут|ют)ся'],
    ['утся', '(ет|ут|ют)ся'],
    ['ются', '(ет|ут|ют)ся'], // 1 спряжение, возвратные
    ['ится', '(ит|ат|ят)ся'],
    ['атся', '(ит|ат|ят)ся'],
    ['ятся', '(ит|ат|ят)ся'], // 2 спряжение, возвратные
    ['ен', 'ен'],
    ['ена', 'ена'],
    ['ено', 'ено'],
    ['ены', 'ены'], // краткие прилагательные
    ['ан', 'ан'],
    ['ана', 'ана'],
    ['ано', 'ано'],
    ['аны', 'аны'], // краткие прилагательные
    ['жен', 'жен'],
    ['жна', 'жна'],
    ['жно', 'жно'],
    ['жны', 'жны'], // краткие прилагательные
    ['такое', '- это'],
    ['такой', '- это'],
  ]; // для вопроса "что такое X?" ответ - "X - это ..."

  // черный список слов, распознаваемых как сказуемые по ошибке
  let blacklist = ['замена', 'замены', 'атрибут', 'маршрут', 'член', 'нет'];

  function getEnding(word) {
    // проверка по черному списку
    if (blacklist.indexOf(word) !== -1) return -1;
    // перебор псевдоокончаний
    for (let j = 0; j < endings.length; j++) {
      // проверка, оканчивается ли i-ое слово на j-ое псевдоокончание
      if (word.substring(word.length - endings[j][0].length) == endings[j][0]) {
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
    let txt = question.toLowerCase().replace(/[*_#?\'",.!()[\]\\/]/g, '');
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
            ((words[i] == knowledge[j][1] || // точное совпадение сказуемого
              words[i].substring(0, words[i].length - endings[ending][0].length) + endings[ending][1] ==
                knowledge[j][1]) && // совпадение сказуемого с подстановкой (такое ->- это)
              subject_text == knowledge[j][0]) ||
            subject_text == knowledge[j][2]
          ) {
            // совпадение подлежащего
            // создание простого предложения из семантической связи
            answer[0] += big1(knowledge[j][0] + ' ' + knowledge[j][1] + ' ' + knowledge[j][2] + '.<br/>');
            if (knowledge[j][3]) answer[1].push(knowledge[j][3]);
            result = true;
            return answer;
          }
        if (result == false) {
          // ПОИСК С ПОМОЩЬЮ РЕГУЛЯРНЫХ ВЫРАЖЕНИЙ
          // замена псевдоокончания на набор возможных окончаний
          words[i] = words[i].substring(0, words[i].length - endings[ending][0].length) + endings[ending][1];
          // создание регулярного выражения для поиска по сказуемому из вопроса
          let predicate = new RegExp(words[i]);
          // для кратких прилагательных захватываем следующее слово
          if (endings[ending][0] == endings[ending][1]) {
            predicate = new RegExp(words[i] + ' ' + words[i + 1]);
            i++;
          }
          let subject_array = words.slice(i + 1);
          console.log('hello' + subject_text);
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
            if (result == false) {
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
};

export default Baseknow;
