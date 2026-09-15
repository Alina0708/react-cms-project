// Shared knowledge base and matching engine for the Theory page's Q&A assistant.
// Previously this data and logic was duplicated almost verbatim between Theory.js
// and baseknow.js; it now lives here as the single source of truth for both.
//
// Each knowledgeBase entry is a tuple: [subject, predicate, object, extra?].
// `extra`, when present, is either a key into `knowledgeImages` (rendered as an
// image) or literal text/HTML to append after the answer.
//
// The Russian matcher below parses verb endings (е́т/у́т/ю́т, etc.) to find the
// predicate in a free-text question — that technique is specific to Russian
// morphology and doesn't carry over to English. The English knowledge base
// (`knowledgeBaseEn`) and matcher (`findAnswerEn`) instead use plain
// keyword/substring overlap scoring — simpler, but language-agnostic.

// псевдоокончания сказуемых (глаголов, кратких причастий и прилагательных)
export const endings = [
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
  ['яться', 'яться'],
  ['лся', 'лся'],
  ['рыл', 'рыл'],
  ['ен', 'ен'],
  ['ыт', 'ыт'],
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
export const blacklist = ['замена', 'замены', 'атрибут', 'маршрут', 'член', 'нет'];

export function getEnding(word) {
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
export function capitalizeFirst(str) {
  return str[0].toUpperCase() + str.slice(1);
}

// главная функция, обрабатывающая запросы клиентов (русский язык)
export function findAnswerRu(question) {
  let txt = question.toLowerCase().replace(/[*_#?'",.!()[\]\\/]/g, '');
  // массив слов и знаков препинания
  let words = txt.split(' ');
  // флаг, найден ли ответ
  let result = false;
  let text = '';
  let extras = [];

  // перебор слов
  for (let i = 0; i < words.length; i++) {
    // поиск номера псевдоокончания
    let ending = getEnding(words[i]);

    // если псевдоокончание найдено – это сказуемое, подлежащее в вопросе после него
    if (ending >= 0) {
      // ТОЧНЫЙ ПОИСК
      let subject_array = words.slice(i + 1);
      let subject_text = subject_array.join(' ');
      for (let j = 0; j < knowledgeBase.length; j++)
        if (
          ((words[i] === knowledgeBase[j][1] || // точное совпадение сказуемого
            words[i].substring(0, words[i].length - endings[ending][0].length) + endings[ending][1] ===
              knowledgeBase[j][1]) && // совпадение сказуемого с подстановкой (такое ->- это)
            subject_text === knowledgeBase[j][0]) ||
          subject_text === knowledgeBase[j][2]
        ) {
          // совпадение подлежащего
          // создание простого предложения из семантической связи
          text += capitalizeFirst(knowledgeBase[j][0] + ' ' + knowledgeBase[j][1] + ' ' + knowledgeBase[j][2] + '.');
          if (knowledgeBase[j][3]) extras.push(knowledgeBase[j][3]);
          result = true;
          return { text, extras };
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
        let subject_array2 = words.slice(i + 1);
        // создание регулярного выражения для поиска по подлежащему из вопроса
        // из слов подлежащего выбрасываем короткие предлоги (периметр у квадрата = периметр квадрата)
        for (let j = 0; j < subject_array2.length; j++) {
          if (subject_array2[j].length < 3) {
            subject_array2.splice(j);
            j--;
          }
        }
        let subject_string = subject_array2.join('.*');
        // только если в подлежащем больше трех символов
        if (subject_string.length > 3) {
          let subject = new RegExp('.*' + subject_string + '.*');
          // поиск совпадений с шаблонами среди связей семантической сети
          for (let j = 0; j < knowledgeBase.length; j++) {
            if (
              predicate.test(knowledgeBase[j][1]) &&
              (subject.test(knowledgeBase[j][0]) || subject.test(knowledgeBase[j][2]))
            ) {
              // создание простого предложения из семантической связи
              text += capitalizeFirst(knowledgeBase[j][0] + ' ' + knowledgeBase[j][1] + ' ' + knowledgeBase[j][2] + '.');
              if (knowledgeBase[j][3]) extras.push(knowledgeBase[j][3]);
              result = true;
              return { text, extras };
            }
          }
          // если совпадений с двумя шаблонами нет
          if (result === false) {
            // поиск совпадений только с шаблоном подлежащего
            for (let j = 0; j < knowledgeBase.length; j++) {
              if (subject.test(knowledgeBase[j][0]) || subject.test(knowledgeBase[j][2])) {
                // создание простого предложения из семантической связи
                text += capitalizeFirst(knowledgeBase[j][0] + ' ' + knowledgeBase[j][1] + ' ' + knowledgeBase[j][2] + '.');
                if (knowledgeBase[j][3]) extras.push(knowledgeBase[j][3]);
                result = true;
                return { text, extras };
              }
            }
          }
        }
      }
    }
  }
  if (!result) text = 'Ответ не найден';
  return { text, extras };
}

// Simple keyword-overlap matcher for English questions — English doesn't
// inflect verbs the way the Russian matcher above assumes, so this scores
// each knowledge-base entry by how many question words it contains instead
// of parsing subject/predicate structure.
const ENGLISH_STOPWORDS = new Set([
  'what', 'when', 'where', 'which', 'who', 'whom', 'whose', 'why', 'how',
  'the', 'and', 'for', 'are', 'was', 'were', 'been', 'being', 'does', 'did',
  'you', 'your', 'about', 'with', 'that', 'this', 'these', 'those', 'can',
]);

function tokenize(str) {
  return str
    .toLowerCase()
    .replace(/[*_#?'",.!()[\]\\/]/g, '')
    .split(/\s+/)
    .filter(Boolean);
}

export function findAnswerEn(question) {
  const words = tokenize(question).filter((word) => word.length > 2 && !ENGLISH_STOPWORDS.has(word));

  let best = null;
  let bestScore = 0;

  for (let j = 0; j < knowledgeBaseEn.length; j++) {
    const [subject, predicate, object] = knowledgeBaseEn[j];
    // Exact word-token matching, not substring — otherwise a short query word
    // like "art" would falsely match inside an unrelated word like "charge".
    const haystackWords = new Set(tokenize(`${subject} ${predicate} ${object}`));
    let score = 0;
    for (let i = 0; i < words.length; i++) {
      if (haystackWords.has(words[i])) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      best = knowledgeBaseEn[j];
    }
  }

  if (!best || bestScore === 0) {
    return { text: 'Answer not found', extras: [] };
  }

  const [subject, predicate, object, extra] = best;
  const text2 = capitalizeFirst(`${subject} ${predicate} ${object}.`);
  return { text: text2, extras: extra ? [extra] : [] };
}

// Unified entry point used by Theory.js and baseknow.js.
export function findAnswer(question, language = 'ru') {
  return language === 'en' ? findAnswerEn(question) : findAnswerRu(question);
}

export const knowledgeBase = [
    [
      'электрическая энергия',
      'представляет',
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
    [
      'формула работы тока',
      'представляет',
      'собой : A = U ⋅ I ⋅ t',
      'A',
    ],
    [
      'формула закона энергии',
      'представляет',
      'собой E = Ep + Ek = const',
      'EConst',
    ],
    [
      'электрический заряд',
      '- это',
      ' физическая скалярная величина, определяющая способность тел быть источником электромагнитных полей и принимать участие в электромагнитном взаимодействии',
      'q2',
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
    //15
    //----------

    [
      'установка',
      'состоит',
      'из мультиметра, источника тока, исследуемого тела и секундомера',
      'installation',
    ],
    [
      'закон джоуля-ленца',
      'гласит',
      ': нагревание проводника или полупроводника прямо пропорционально его сопротивлению, времени действия тока и квадрату силы тока',
    ],
    [
      'закон джоуля-ленца',
      'записывается',
      'в виде: Q=I2RΔt. Количество теплоты, выделяемое проводником с током, равно произведению квадрата силы тока, сопротивления проводника и времени прохождения тока',
      'DL',
    ],
    ['внутренняя энергия термодинамической системы', 'измеряется', 'при помощи теплового взаимодействия'],
    [
      'теплотой',
      'называется',
      'энергия, которая получается (или отдается) телом в процессе теплообмена с окружающими телами (средой). Обозначается теплота, обычно буквой Q или ΔE',
    ],
    [
      'внутренняя энергия',
      '- это',
      'принятое в физике сплошных сред, термодинамике и статистической физике название для той части полной энергии термодинамической системы, которая не зависит от выбора системы отсчета и которая в рамках рассматриваемой задачи может изменяться',
    ],
    //22
    [
      'формула внутренней энергии',
      'имеет',
      'следующий вид: U = Q + A (внутренняя энергия равна сумме теплоты и работы, измеряется в джоулях)',
      'Uqa',
    ],
    [
      'джеймс прескотт джоуль',
      '- это',
      'английский физик, внёсший значительный вклад в становление термодинамики. Обосновал на опытах закон сохранения энергии. Установил закон, определяющий тепловое действие электрического тока. Вычислил скорость движения молекул газа и установил её зависимость от температуры',
      'joule',
    ],
    [
      'георг симон ом',
      '- это',
      'немецкий физик. Он вывел теоретически и подтвердил на опыте закон, выражающий связь между силой тока в цепи, напряжением и сопротивлением (известен как закон Ома). Его именем названа единица электрического сопротивления (Ом)',
      'om',
    ],
    //25
    [
      'эмилий христианович ленц',
      '- это',
      'российский физик немецкого происхождения. Выходец из балтийских немцев. Э. Х. Ленц является одним из основоположников электротехники. С его именем связано открытие закона, определяющего тепловые действия тока, и закона, определяющего направление индукционного тока, профессор и ректор Императорского Санкт-Петербургского университета (1863—1865), академик',
      'lenz',
    ],
    [
      'источник питания',
      'представляет',
      'собой электрическое оборудование, предназначенное для производства, аккумулирования электрической энергии или изменения ее характеристик',
    ],
    [
      'мультиметр',
      'представляет',
      'собой многофункциональный электроизмерительный прибор. Основное его назначение – измерение характеристик электрического сигнала',
    ],
    ['секундомер', 'представляет', 'собой точный прибор, показывающий время в долях секунды'],
    [
      'датчик температуры',
      'представляет',
      'собой это устройство, которое позволяет измерить температуру объекта или вещества, используя при этом различные свойства и характеристики измеряемых тел или среды',
    ],
    //30
    [
      'мультиметр',
      'выполняет',
      'следующие функции: измерение постоянного и переменного напряжения,	измерение постоянного и переменного тока, измерение сопротивления, емкости и индуктивности',
    ],
    ['источник питания', 'выполняет', 'следующую функцию: установление постоянного тока и напряжения'],
    ['датчик температуры', 'выполняет', 'следующую функцию: измеряет температуру'],
    ['заряды', 'бывают', 'двух типов: один из них условно назван положительным, а второй – отрицательным'],
    [
      'электрон',
      'представляет',
      'собой субатомную частицу, чей электрический заряд отрицателен и равен по модулю одному элементарному электрическому заряду. Электроны принадлежат к первому поколению лептонных частиц и обычно считаются фундаментальными частицами, поскольку у них нет известных компонентов или субструктур',
    ],
    //35
    [
      'температура',
      'представляет',
      'собой скалярную физическую величину, характеризующую термодинамическую систему и количественно выражающая интуитивное понятие о различной степени нагретости тел. Живые существа способны воспринимать ощущения тепла и холода непосредственно, с помощью органов чувств',
    ],
    [
      'электрон',
      'представляет',
      'собой субатомную частицу, чей электрический заряд отрицателен и равен по модулю одному элементарному электрическому заряду. Электроны принадлежат к первому поколению лептонных частиц и обычно считаются фундаментальными частицами, поскольку у них нет известных компонентов или субструктур',
    ],
    [
      'протон',
      'представляет',
      'собой одну из трёх (вместе с нейтроном и электроном) элементарных частиц, из которых построено обычное вещество. Протоны входят в состав атомных ядер; порядковый номер химического элемента в таблице Менделеева равен количеству протонов в его ядре',
    ],
    [
      'нейрон',
      'представляет',
      'собой тяжёлую элементарную частицу, не имеющая электрического заряда. Нейтрон является фермионом и принадлежит к классу барионов. Нейтроны и протоны являются двумя главными компонентами атомных ядер; общее название для протонов и нейтронов — нуклоны',
    ],
    [
      'закон ома',
      'выглядит',
      'следующим образом: I = U/R (сила равна отношению напряжения на сопротивление, измеряется в амперах)',
    ],
    [
      'нейрон',
      'представляет',
      'собой тяжёлую элементарную частицу, не имеющая электрического заряда. Нейтрон является фермионом и принадлежит к классу барионов. Нейтроны и протоны являются двумя главными компонентами атомных ядер; общее название для протонов и нейтронов — нуклоны',
    ],
    //40
    ['джоуль-ленц', 'открыл', 'закон, дающий количественную оценку теплового действия электрического тока'],
    [
      'ом',
      'открыл',
      'закон, выражающий связь между силой тока в цепи, напряжением и сопротивлением (известен как закон Ома). Его именем названа единица электрического сопротивления (Ом)',
    ],
    [
      'электрическим током',
      'называется',
      'направленное (упорядоченное) движение частиц или квазичастиц — носителей электрического заряда',
    ],
    [
      'носителем электрического заряда',
      'может являеться',
      ': в металлах — электроны, в электролитах — ионы (катионы и анионы), в газах — ионы и электроны, в вакууме при определённых условиях — электроны',
      'В полупроводниках — электроны или дырки (электронно-дырочная проводимость)',
    ],
    [
      'электрический ток',
      'имеет',
      'следующие проявления: нагревание проводников (не происходит в сверхпроводниках), изменение химического состава проводников (наблюдается преимущественно в электролитах), создание магнитного поля (проявляется у всех без исключения проводников',
    ],
    //45
    [
      'мощностью',
      'называется',
      'скалярная физическая величина, характеризующая мгновенную скорость передачи энергии от одной физической системы к другой в процессе её использования и в общем случае определяемая через соотношение переданной энергии к времени передачи',
    ],
    [
      'формула мощности',
      'имеет',
      'вид: P = I × U, где I — напряжение, U — сила тока. Она равна произведению напряжения на участке цепи на величину тока, проходящего по этому участку',
      'slide',
    ],
    ['мощность', 'измеряется', 'в Ватт (обозначение: Вт, W) — в системе СИ единица измерения мощности'],
    [
      'нагрев тела от работы силы тока',
      'происходит',
      'в результате столкновений свободных электронов с его атомами и ионами при прохождении электрического тока по проводнику',
    ],
    [
      'формула теплоты',
      'имеет',
      'следующий вид: Q = cm(t2−t1), где m - масса исследуемого тела, с - удельная теплоемкость, t2 - конечная температура тела, t1 - начальная температура тела. Данная формула даёт возможность найти и выделяемую при охлаждении вещества теплоту ',
    ],
    //50
    [
      'теплота',
      'измеряется',
      'в ДЖ  — единица измерения работы, энергии и количества теплоты в Международной системе единиц (СИ)',
    ],
    [
      'удельная теплоемкость',
      'представляет',
      'собой отношение теплоёмкости к массе, теплоёмкость единичной массы вещества; физическая величина, численно равная количеству теплоты, которое необходимо передать единичной массе данного вещества для того, чтобы его температура изменилась на единицу',
    ],
    [
      'теплоемкость',
      'измеряется',
      'в Международной системе единиц (СИ) — Дж/К СИ измеряется в джоулях на килограмм на кельвин (Дж·кг−1·К−1)',
    ],
    [
      'температура',
      'измеряется',
      'в градусах цельсия (обозначение: °C) — широко распространённая единица температуры, применяемая в Международной системе единиц (СИ) наряду с кельвином',
    ],
    ['ампер', '- это', 'единица измерения силы электрического тока'],
    //55
    [
      'вольтом',
      'называется',
      'единица измерения электрического потенциала, разности потенциалов, электрического напряжения и электродвижущей силы',
    ],
    ['ваттом', 'называется', 'единица мощности электрического тока'],
    ['омом', 'называется', 'единица измерения электрического сопротивления'],
    ['ток', 'порождает', 'переменное магнитное поле, создающее электрическое поле в том же проводнике'],
    [
      'смысл силы тока',
      'заключается',
      'в количестве электронов прошедших за единицу времени через единицу площади проводника',
    ],
    //60
    [
      'установка',
      'работает',
      'следующим образом: при установлении на источнике питания постоянного напряжения и силы тока, в цепи проявляется работа тока, за счет которой происходит нагревание исследуемого тела. Температура тела контролируется при помощи датчика температуры, на мультиметре будет отображаться текущее значение сопротивления датчика, по которому можно высчитать температуру',
    ],
    [
      'джоуль от ньютона',
      'отличается',
      'следующим образом: Ньютон определяется как сила, которая придает массе в один килограмм ускорение, равное одному метру за секунду в квадрате. Джоуль равен работе, которая совершается, когда точка приложения силы, равной одному ньютону, перемещается на расстояние один метр в направлении действия силы',
    ],
    [
      'джоуль',
      'показывает',
      'количество работы, которую необходимо совершать для непрерывной выработки одного ватта мощности в течение одной секунды',
    ],
    [
      'джоулем',
      'называется',
      '— единица измерения работы, энергии и количества теплоты (англ. Joule; русское обозначение: Дж; международное: J) ',
    ],
    [
      'источники питания',
      'разделяются',
      'на фотоэлектрические преобразователи (солнечная батарея), термоэлектрические преобразователи, электромеханические источники питания, МГД-генератор, радиоизотопные источники энергии',
    ],
    //65
    [
      'мультиметры',
      'подразделяются',
      'на два вида в зависимости от способа индикации показаний: аналоговые и цифровые',
    ],
    [
      'аналоговым мультиметром',
      'называется',
      'многофункциональный электроизмерительный прибор с индикацией показаний посредством стрелочной (аналоговой) шкалы',
    ],
    [
      'к достоинствам аналоговых мультиметров',
      'относится',
      ': возможность проводить измерения при низких температурах окружающей среды до -30 °С, быстрота работы при большом объеме измерений, когда не требуется высокой точности, не требуют потребления энергии от встроенного источника питания в режиме измерения напряжения и тока, мгновенное отображение динамики изменения сигнала',
    ],
    [
      'к недостаткам аналоговых мультиметров',
      'относится',
      ': низкое входное сопротивление и, как следствие, высокая погрешность при низковольтных измерениях, чувствительность к механическим повреждениям, вибрациям',
    ],
    [
      'цифровым мультиметром',
      'называется',
      'устройство, характеризующиеся высокой точностью измерений и разнообразными функциональными возможностями. Цифровые приборы пришли на смену аналоговым в связи с возможностью широкого применения полупроводниковых технологий',
    ],
    //70
    [
      'к достоинствам цифровых мультиметров',
      'относится',
      ': многофункциональность, максимальная возможная точность измерений, возможность автоматического и ручного выбор диапазонов измерений',
    ],
    [
      'к недостаткам цифровых мультиметров',
      'относится',
      'ЖК-дисплей, т.к он зависит от батареи или внешнего источника питания. Когда батарея разряжена, дисплей будет тусклым',
    ],
    ['секундомер', 'подразделяется', 'на 2 разновидности: механические и электронные'],
    [
      'секундомер',
      'выполняет',
      'следующую функцию: производит отсчет времени до 60 минут с шагом в 1/5 секунды. Когда измеренное время достигает 60 минут, стрелки секундомера автоматически останавливаются в положении 0 минут 0 секунд',
    ],
    ['ток', 'изучается', 'разделом физики «Электричество и Электромагнетизм»'],
    //75
    [
      'работа источника тока',
      'представляет',
      'собой работу сил (кулоновских и сторонних) по перемещению электрических зарядов на участке цепи',
    ],
    [
      'электрическая цепь',
      'представляет',
      'собой совокупность электротехнических устройств, предназначенных для генерирования, передачи и преобразования электрической энергии, соединенные между собой электрическими проводами',
    ],
    [
      'электрические цепи',
      'бывают',
      ', по типу соединения элементов, следующие: последовательные, параллельные, последовательно-параллельные',
    ],
    [
      'последовательной цепью переменного тока',
      'называется',
      'цепь, состоящая состоящую из последовательно соединенных резистора R и катушки L, такая цепь часто называется последовательной RL-цепью. Из этого можно сделать вывод, что ток и напряжение в резисторе совпадают по фазе. Напряжение на катушке опережает ток на угол π/2',
    ],
    [
      'сопротивлением в цепи переменного тока',
      'называется',
      'реактивное сопротивление (также реактанс) — это сопротивление элемента схемы, вызванное изменением тока или напряжения из-за индуктивности или ёмкости этого элемента. Понятие реактивного сопротивления аналогично электрическому сопротивлению, но оно несколько отличается в деталях',
    ],
    //80
    [
      'последовательная цепь',
      'характеризуется',
      'тем, что через все элементы протекает ток одинаковой силы. То есть, если цепочка состоит из двух резисторов R1 и R2 (как на рисунке ниже), то ток протекающий через каждое из них и любую другую часть цепи будет одинаковой (I = I1 = I2)',
    ],
    [
      'разница параллельного и последовательного подключения элементов в цепь',
      'заключается',
      'в том, что при последовательном соединении все элементы связаны друг с другом так, что включающий их участок цепи не имеет ни одного узла. При параллельном соединении все входящие в цепь элементы объединены двумя узлами и не имеют связей с другими узлами, если это не противоречит условию',
    ],
    [
      'постоянным',
      'является',
      'ток с постоянным направлением движения заряжанных частиц. В каждой точке проводника, по которому протекает постоянный ток, одни элементарные электрические заряды непрерывно сменяются другими, совершенно одинаковыми по сумме электрическими зарядами',
    ],
    [
      'постоянным',
      'является',
      'ток с постоянным направлением движения заряжанных частиц. В каждой точке проводника, по которому протекает постоянный ток, одни элементарные электрические заряды непрерывно сменяются другими, совершенно одинаковыми по сумме электрическими зарядами',
    ],
    ['закон ома', 'открыт', 'в 1826 году (опубликован в 1827 году) и назван в честь ученого Георг Омома'],

    //85
    [
      'джоуль',
      'появился',
      'на Втором международном конгрессе электриков, проходившем в год смерти Джеймса Джоуля (1889). Джоуль был введён в абсолютные практические электрические единицы в качестве единицы работы и энергии электрического тока',
    ],
    [
      'переменный ток',
      'меряется',
      'следующим образом: необходимо выбрать функцию измерения переменного напряжения мультиметра, выставив максимальный диапазон измерений. Присоединить наконечники щупов к розетке, нащупав провод внутри. В случае с переменным током полярность значения не имеет. Осталось посмотреть на результат, который отображается на дисплее',
    ],
    [
      'переход электрической энергии в тепловую',
      'определяется',
      'по закону джоуля-ленца - физический закон, дающий количественную оценку теплового действия электрического тока',
    ],
    [
      'переход электрической энергии в тепловую',
      'определяется',
      'по закону джоуля-ленца - физический закон, дающий количественную оценку теплового действия электрического тока',
    ],
    [
      'количество теплоты через напряжение',
      'находится',
      'согласно закона Джоуля-Ленца количество теплоты Q в проводнике определяется формулой: Q = I * U * t. Где I - сила тока в проводнике, U - напряжение на концах проводника, t - время на протяжении которого протекает ток в проводнике',
    ],
    //90
    ['в электрической цепи ток', 'проходит', 'от плюсового полюса источника питания к минусовому'],
    [
      'количество теплоты за время',
      'определяется',
      'следующим образом: следует удельную теплоёмкость вещества умножить на его массу и на разность между конечной и начальной температурой вещества',
    ],
    [
      'напряжение теплоты за время',
      'определяется',
      'следующим образом: для измерения напряжения используют прибор, который называется вольтметр. Обозначаются все вольтметры латинской буквой (V), которая наносится на циферблат приборов и используется в схематическом изображении прибора',
    ],
    [
      'на силу тока',
      'влияет',
      'напряжение и сопротивление, т.к по закону Ома, сила тока прямо пропорциональна напряжению и обратно пропорциональна сопротивлению',
    ],
    [
      'прибор для измерения силы тока в цепи',
      'называется',
      'электроизмерительный прибор для измерения силы тока - Амперметр',
    ],
    //95
    [
      'общее напряжение В цепи',
      'имеет',
      'следующий вид: U = U1 + U2 = I(R1 + R2) = IR, где R – электрическое сопротивление всей цепи',
    ],
    [
      'внутренняя энергия',
      'находится',
      'по формуле E = c m ( t 2 − t 1 ). Здесь величина C = c m называется теплоемкостью тела (обратите внимание — не вещества). Она численно равна количеству теплоты, необходимому для нагревания всей массы тела на 1 °С',
      'E',
    ],
    [
      'формула температуры через сопротивление',
      'имеет',
      'следующий вид: T = 217/(R^(0,13)) – 151, где R - сопротивление, измеряется в градусах цельсия',
    ],
    [
      'в 1 джоуле',
      'содержится',
      '≈ 6,24151⋅1018 эВ. Электро̀нво́льт (электрон-вольт, редко электроновольт; русское обозначение: эВ, международное: eV) — внесистемная единица энергии, используемая в атомной и ядерной физике, в физике элементарных частиц и в близких и родственных областях науки (биофизике, физической химии, астрофизике и т. п.)',
    ],
    ['виды энергии', 'имеются', 'следующие: механическая, внутренняя, электромагнитная, химическая'],
];

// English mirror of `knowledgeBase`, same order, for the simpler keyword matcher.
export const knowledgeBaseEn = [
  [
    'electrical energy',
    'is',
    'the capacity of an electromagnetic field to do work under an applied voltage in the process of its generation, transmission, distribution, and consumption',
  ],
  ['electrical energy', 'is obtained', 'from other forms of energy and can be converted into other forms of energy'],
  [
    'the law of conservation of energy',
    'means',
    "a fundamental law of nature, established empirically, stating that for an isolated physical system a scalar physical quantity — a function of the system's parameters, called energy — can be defined, and it is conserved over time",
  ],
  [
    'the work of electric current',
    '',
    'in a section of a circuit is proportional to the voltage across its ends and the amount of charge passing through that section: A = U ⋅ q. The work of electric current in a section of a circuit is proportional to the current, the time the charge takes to pass, and the voltage across the ends of that section: A = U ⋅ I ⋅ t',
  ],
  ['the formula for the work of current', 'is', ': A = U ⋅ I ⋅ t', 'A'],
  ['the formula for the law of energy', 'is', 'E = Ep + Ek = const', 'EConst'],
  [
    'electric charge',
    'is',
    "a scalar physical quantity that determines a body's ability to be a source of electromagnetic fields and to take part in electromagnetic interaction",
    'q2',
  ],
  [
    'voltage',
    'is',
    'a scalar physical quantity equal to the work done by the effective electric field in moving a unit test electric charge from point A to point B',
  ],
  ['the unit of measurement for voltage', 'is called', 'the volt (V)'],
  ['current', 'is', 'the rate at which electrons pass through a given point in a closed electrical circuit'],
  ['Current', 'is measured in', 'amperes'],
  ['the formula for current', 'is', 'I = U/R'],
  ['circuit resistance', 'is', 'a quantity that reflects the opposition to the flow of current in an electrical circuit'],
  ['resistance', 'is measured in', 'ohms'],
  [
    'circuit resistance',
    'is calculated',
    'by the following rules: when resistors are connected in series, their resistances add up: R = R1 + R2. When resistors are connected in parallel, their conductances — the reciprocals of their resistances — add up: 1/R = 1/R1 + 1/R2, or R = R1·R2 / (R1 + R2)',
  ],
  //15
  //----------
  ['the setup', 'consists', 'of a multimeter, a current source, the test body, and a stopwatch', 'installation'],
  [
    'the Joule-Lenz law',
    'states',
    ': the heating of a conductor or semiconductor is directly proportional to its resistance, the duration of the current, and the square of the current',
  ],
  [
    'the Joule-Lenz law',
    'is written',
    "as: Q = I²RΔt. The quantity of heat released by a current-carrying conductor equals the product of the square of the current, the conductor's resistance, and the time the current flows",
    'DL',
  ],
  ['the internal energy of a thermodynamic system', 'is measured', 'by means of heat exchange'],
  [
    'heat',
    'is called',
    'the energy that a body gains (or gives up) during heat exchange with the surrounding bodies (medium). Heat is usually denoted by the letter Q or ΔE',
  ],
  [
    'internal energy',
    'is',
    "a term used in continuum physics, thermodynamics, and statistical physics for the part of a thermodynamic system's total energy that does not depend on the choice of reference frame and that can change within the problem being considered",
  ],
  //22
  [
    'the formula for internal energy',
    'has',
    'the form: U = Q + A (internal energy equals the sum of heat and work, measured in joules)',
    'Uqa',
  ],
  [
    'James Prescott Joule',
    'is',
    'an English physicist who made a significant contribution to the founding of thermodynamics. He experimentally confirmed the law of conservation of energy. He established the law describing the heating effect of an electric current. He calculated the speed of gas molecules and its dependence on temperature',
    'joule',
  ],
  [
    'Georg Simon Ohm',
    'is',
    "a German physicist. He derived theoretically and confirmed experimentally the law expressing the relationship between current, voltage, and resistance in a circuit (known as Ohm's law). The unit of electrical resistance (the ohm) is named after him",
    'om',
  ],
  //25
  [
    'Emil Khristianovich Lenz',
    'is',
    'a Russian physicist of German descent, a Baltic German by origin. E. H. Lenz was one of the founders of electrical engineering. His name is tied to the discovery of the law describing the heating effect of current and the law determining the direction of induced current; professor and rector of the Imperial University of St. Petersburg (1863-1865), academician',
    'lenz',
  ],
  [
    'a power supply',
    'is',
    'electrical equipment designed to generate or store electrical energy, or to change its characteristics',
  ],
  [
    'a multimeter',
    'is',
    'a multifunctional electrical measuring instrument. Its main purpose is measuring the characteristics of an electrical signal',
  ],
  ['a stopwatch', 'is', 'a precise instrument that displays time in fractions of a second'],
  [
    'a temperature sensor',
    'is',
    'a device that measures the temperature of an object or substance using various properties and characteristics of the body or medium being measured',
  ],
  //30
  [
    'a multimeter',
    'performs',
    'the following functions: measuring DC and AC voltage, measuring DC and AC current, measuring resistance, capacitance, and inductance',
  ],
  ['a power supply', 'performs', 'the following function: setting a constant current and voltage'],
  ['a temperature sensor', 'performs', 'the following function: it measures temperature'],
  ['charges', 'come in', 'two types: one is conventionally called positive, the other negative'],
  [
    'an electron',
    'is',
    'a subatomic particle whose electric charge is negative and equal in magnitude to one elementary electric charge. Electrons belong to the first generation of leptons and are usually considered fundamental particles, since they have no known components or substructure',
  ],
  //35
  [
    'temperature',
    'is',
    'a scalar physical quantity that characterizes a thermodynamic system and quantitatively expresses the intuitive notion of how hot or cold a body is. Living beings can perceive sensations of heat and cold directly, through their senses',
  ],
  [
    'an electron',
    'is',
    'a subatomic particle whose electric charge is negative and equal in magnitude to one elementary electric charge. Electrons belong to the first generation of leptons and are usually considered fundamental particles, since they have no known components or substructure',
  ],
  [
    'a proton',
    'is',
    'one of three elementary particles (along with the neutron and the electron) that ordinary matter is built from. Protons are part of atomic nuclei; the atomic number of a chemical element in the periodic table equals the number of protons in its nucleus',
  ],
  [
    'a neuron',
    'is',
    'a heavy elementary particle with no electric charge. The neutron is a fermion and belongs to the baryon class. Neutrons and protons are the two main components of atomic nuclei; the common name for protons and neutrons is nucleons',
  ],
  [
    "Ohm's law",
    'looks',
    'like this: I = U/R (current equals the ratio of voltage to resistance, measured in amperes)',
  ],
  [
    'a neuron',
    'is',
    'a heavy elementary particle with no electric charge. The neutron is a fermion and belongs to the baryon class. Neutrons and protons are the two main components of atomic nuclei; the common name for protons and neutrons is nucleons',
  ],
  //40
  ['Joule-Lenz', 'discovered', 'the law that quantifies the heating effect of an electric current'],
  [
    'Ohm',
    'discovered',
    "the law expressing the relationship between current, voltage, and resistance in a circuit (known as Ohm's law). The unit of electrical resistance (the ohm) is named after him",
  ],
  [
    'electric current',
    'is called',
    'the directed (ordered) movement of particles or quasiparticles that carry electric charge',
  ],
  [
    'a carrier of electric charge',
    'can be',
    ': in metals — electrons, in electrolytes — ions (cations and anions), in gases — ions and electrons, in a vacuum under certain conditions — electrons',
    'In semiconductors — electrons or holes (electron-hole conduction)',
  ],
  [
    'electric current',
    'has',
    'the following manifestations: heating of conductors (does not occur in superconductors), changes in the chemical composition of conductors (observed mainly in electrolytes), creation of a magnetic field (occurs in every conductor without exception)',
  ],
  //45
  [
    'power',
    'is called',
    'a scalar physical quantity characterizing the instantaneous rate of energy transfer from one physical system to another during its use, generally defined as the ratio of the energy transferred to the time of transfer',
  ],
  [
    'the formula for power',
    'has',
    'the form: P = I × U, where I is the voltage, U is the current. It equals the product of the voltage across a section of a circuit and the current flowing through that section',
    'slide',
  ],
  ['power', 'is measured in', 'watts (symbol: W) — the SI unit of power'],
  [
    'heating of a body from the work of current',
    'occurs',
    'as a result of collisions between free electrons and the atoms and ions of the body as electric current passes through the conductor',
  ],
  [
    'the formula for heat',
    'has',
    "the form: Q = cm(t2−t1), where m is the mass of the body under study, c is the specific heat capacity, t2 is the final temperature of the body, t1 is the initial temperature of the body. This formula can also be used to find the heat released when a substance cools",
  ],
  //50
  ['heat', 'is measured in', 'joules (J) — the unit of work, energy, and quantity of heat in the International System of Units (SI)'],
  [
    'specific heat capacity',
    'is',
    'the ratio of heat capacity to mass — the heat capacity of a unit mass of a substance; a physical quantity numerically equal to the amount of heat that must be supplied to a unit mass of a given substance to change its temperature by one unit',
  ],
  [
    'heat capacity',
    'is measured in',
    'the International System of Units (SI) as J/K; specific heat capacity is measured in joules per kilogram per kelvin (J·kg⁻¹·K⁻¹)',
  ],
  [
    'temperature',
    'is measured in',
    'degrees Celsius (symbol: °C) — a widely used unit of temperature, used in the International System of Units (SI) alongside the kelvin',
  ],
  ['the ampere', 'is', 'the unit of measurement for electric current'],
  //55
  [
    'the volt',
    'is called',
    'the unit of measurement for electric potential, potential difference, voltage, and electromotive force',
  ],
  ['the watt', 'is called', 'the unit of power of an electric current'],
  ['the ohm', 'is called', 'the unit of measurement for electrical resistance'],
  ['current', 'generates', 'an alternating magnetic field, which creates an electric field in the same conductor'],
  [
    'the meaning of current',
    'lies',
    'in the number of electrons passing per unit time through a unit cross-sectional area of the conductor',
  ],
  //60
  [
    'the setup',
    'works',
    "as follows: once a constant voltage and current are set on the power supply, the work of the current in the circuit causes the test body to heat up. The body's temperature is monitored using a temperature sensor, and the multimeter displays the current resistance value of the sensor, from which the temperature can be calculated",
  ],
  [
    'the joule differs from the newton',
    'as follows',
    'the newton is defined as the force that gives a mass of one kilogram an acceleration of one meter per second squared. The joule equals the work done when the point of application of a force of one newton moves a distance of one meter in the direction of the force',
  ],
  [
    'the joule',
    'shows',
    'the amount of work needed to continuously produce one watt of power for one second',
  ],
  [
    'the joule',
    'is called',
    'the unit of measurement for work, energy, and quantity of heat (Russian symbol: Дж; international: J)',
  ],
  [
    'power supplies',
    'are divided',
    'into photoelectric converters (solar cells), thermoelectric converters, electromechanical power sources, MHD generators, and radioisotope power sources',
  ],
  //65
  ['multimeters', 'are divided', 'into two types depending on how they display readings: analog and digital'],
  [
    'an analog multimeter',
    'is called',
    'a multifunctional electrical measuring instrument that displays readings via an analog (needle) scale',
  ],
  [
    'the advantages of analog multimeters',
    'include',
    ': the ability to take measurements at low ambient temperatures down to -30°C, fast operation for large volumes of measurements when high precision is not required, no power consumption from a built-in source when measuring voltage and current, and instant display of signal changes over time',
  ],
  [
    'the disadvantages of analog multimeters',
    'include',
    ': low input resistance and, as a result, high error in low-voltage measurements, and sensitivity to mechanical damage and vibration',
  ],
  [
    'a digital multimeter',
    'is called',
    'a device characterized by high measurement accuracy and a wide range of functions. Digital instruments replaced analog ones due to the wide availability of semiconductor technology',
  ],
  //70
  [
    'the advantages of digital multimeters',
    'include',
    ': versatility, the highest possible measurement accuracy, and the ability to select measurement ranges automatically or manually',
  ],
  [
    'the disadvantages of digital multimeters',
    'include',
    'the LCD display, since it depends on a battery or an external power source. When the battery is low, the display becomes dim',
  ],
  ['a stopwatch', 'is divided', 'into 2 types: mechanical and electronic'],
  [
    'a stopwatch',
    'performs',
    'the following function: it counts time up to 60 minutes in steps of 1/5 second. When the measured time reaches 60 minutes, the stopwatch hands automatically stop at 0 minutes 0 seconds',
  ],
  ['current', 'is studied', 'in the branch of physics called "Electricity and Electromagnetism"'],
  //75
  [
    'the work of a current source',
    'is',
    'the work of forces (Coulomb and external) in moving electric charges through a section of a circuit',
  ],
  [
    'an electrical circuit',
    'is',
    'a set of electrical devices designed to generate, transmit, and convert electrical energy, connected to each other by electrical wires',
  ],
  [
    'electrical circuits',
    'come in',
    ', by the type of connection between elements, the following kinds: series, parallel, and series-parallel',
  ],
  [
    'a series AC circuit',
    'is called',
    'a circuit made up of a resistor R and an inductor L connected in series; such a circuit is often called a series RL circuit. From this it follows that the current and voltage across the resistor are in phase. The voltage across the inductor leads the current by an angle of π/2',
  ],
  [
    'resistance in an AC circuit',
    'is called',
    'reactance — the resistance of a circuit element caused by a change in current or voltage due to the inductance or capacitance of that element. The concept of reactance is similar to electrical resistance, but differs somewhat in the details',
  ],
  //80
  [
    'a series circuit',
    'is characterized',
    'by the fact that the same current flows through all elements. That is, if a chain consists of two resistors R1 and R2, the current flowing through each of them and through any other part of the circuit will be the same (I = I1 = I2)',
  ],
  [
    'the difference between parallel and series connection of elements in a circuit',
    'is',
    'that in a series connection, all elements are connected to each other so that the section of the circuit containing them has no nodes. In a parallel connection, all elements in the circuit are joined at two nodes and have no connections to other nodes, unless stated otherwise',
  ],
  [
    'direct current',
    'is',
    'current whose charged particles move in a constant direction. At every point of a conductor carrying direct current, some elementary electric charges are continuously replaced by others, exactly equal in total charge',
  ],
  [
    'direct current',
    'is',
    'current whose charged particles move in a constant direction. At every point of a conductor carrying direct current, some elementary electric charges are continuously replaced by others, exactly equal in total charge',
  ],
  ["Ohm's law", 'was discovered', 'in 1826 (published in 1827) and is named after the scientist Georg Ohm'],
  //85
  [
    'the joule',
    'appeared',
    'at the Second International Congress of Electricians, held in the year James Joule died (1889). The joule was introduced into the absolute practical electrical units as the unit of work and energy of electric current',
  ],
  [
    'alternating current',
    'is measured',
    'as follows: select the AC voltage measurement function on the multimeter, setting the maximum measurement range. Attach the probe tips to the outlet, locating the wire inside. For alternating current, polarity does not matter. All that remains is to read the result shown on the display',
  ],
  [
    'the conversion of electrical energy into heat',
    'is determined',
    'by the Joule-Lenz law — a physical law that quantifies the heating effect of an electric current',
  ],
  [
    'the conversion of electrical energy into heat',
    'is determined',
    'by the Joule-Lenz law — a physical law that quantifies the heating effect of an electric current',
  ],
  [
    'the quantity of heat via voltage',
    'is found',
    'according to the Joule-Lenz law, the quantity of heat Q in a conductor is given by the formula: Q = I × U × t, where I is the current in the conductor, U is the voltage across the ends of the conductor, and t is the time during which the current flows through the conductor',
  ],
  //90
  ['in an electrical circuit, current', 'flows', 'from the positive terminal of the power supply to the negative terminal'],
  [
    'the quantity of heat over time',
    'is determined',
    'as follows: multiply the specific heat capacity of the substance by its mass and by the difference between the final and initial temperature of the substance',
  ],
  [
    'the voltage of heat over time',
    'is determined',
    "as follows: voltage is measured using an instrument called a voltmeter. All voltmeters are denoted by the Latin letter (V), which is marked on the instrument's dial and used in schematic diagrams of the instrument",
  ],
  [
    'current',
    'is affected by',
    "voltage and resistance, since by Ohm's law, current is directly proportional to voltage and inversely proportional to resistance",
  ],
  [
    'the instrument for measuring current in a circuit',
    'is called',
    'the electrical measuring instrument for measuring current — the ammeter',
  ],
  //95
  [
    'the total voltage in a circuit',
    'has',
    'the form: U = U1 + U2 = I(R1 + R2) = IR, where R is the electrical resistance of the whole circuit',
  ],
  [
    'internal energy',
    'is found',
    'by the formula E = cm(t2−t1). Here the quantity C = cm is called the heat capacity of the body (note — not of the substance). It is numerically equal to the amount of heat needed to heat the entire mass of the body by 1°C',
    'E',
  ],
  [
    'the formula for temperature via resistance',
    'has',
    'the form: T = 217/(R^0.13) − 151, where R is resistance, measured in degrees Celsius',
  ],
  [
    'in 1 joule',
    'there are',
    '≈ 6.24151 × 10^18 eV. The electronvolt (rarely: electron-volt; Russian symbol: эВ; international: eV) is a non-SI unit of energy used in atomic and nuclear physics, particle physics, and related and adjacent fields of science (biophysics, physical chemistry, astrophysics, etc.)',
  ],
  ['types of energy', 'include', 'the following: mechanical, internal, electromagnetic, chemical'],
];
