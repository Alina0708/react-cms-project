import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import installation from '../../image/installation.jpg';
import classes from './basestyle.module.css';

import E from '../../image/formula_E.png';

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
      messanger.innerHTML += `<div class=${classes.question}>${input.value}</div>`;
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
    //15
    //----------

    [
      'установка',
      'состоит',
      'из мультиметра, источника тока, исследуемого тела и секундомера',
      `<img alt="что-то пошло не так.." class=${classes.knowImage} src=${installation}/>`,
    ],
    [
      'закон ома',
      'выглядит',
      'следующим образом: I = U/R (сила равна отношению напряжения на сопротивление, измеряется в амперах)',
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
      'следующий вид: U = Q - A (внутренняя энергия равна разности теплоты и работы, измеряется в джоулях)',
    ],
    [
      'джеймс прескотт джоуль',
      '- это',
      'английский физик, внёсший значительный вклад в становление термодинамики. Обосновал на опытах закон сохранения энергии. Установил закон, определяющий тепловое действие электрического тока. Вычислил скорость движения молекул газа и установил её зависимость от температуры',
    ],
    [
      'георг симон ом',
      '- это',
      'немецкий физик. Он вывел теоретически и подтвердил на опыте закон, выражающий связь между силой тока в цепи, напряжением и сопротивлением (известен как закон Ома). Его именем названа единица электрического сопротивления (Ом)',
    ],
    //25
    [
      'эмилий христианович ленц',
      '- это',
      'российский физик немецкого происхождения. Выходец из балтийских немцев. Э. Х. Ленц является одним из основоположников электротехники. С его именем связано открытие закона, определяющего тепловые действия тока, и закона, определяющего направление индукционного тока, профессор и ректор Императорского Санкт-Петербургского университета (1863—1865), академик',
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
      `<img alt="что-то пошло не так.." class=${classes.knowImage} src=${E}/>`,
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
