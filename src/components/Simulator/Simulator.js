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


const Simulator = () => {
  return (
    <section>
      <h1 className={classes.titleSticky}>Симулятор и работа с ним</h1>
      <div className={classes.sizeImage}>
        <p>Установка при запуске проекта:</p>
        <img alt="installation2" src={photo1} />
        <p>Выполнение практических заданий лабораторной работы:</p>
        <img alt="photo2" src={photo2} />
        <p>
          При клике на кноку включения источника питания, загориться кнопка включения и на табло отобразяться
          первоначальные значения напряжения и силы тока
        </p>
        <img alt="photo3" src={photo3} />
        <p>
          Для того, чтобы запустить работу секундомера, необходимо нажать на красную кнопку. Для паузы необходимо
          повторно нажать на красную кнопку секундомера. Для обнуления - синюю.
        </p>
        <img alt="photo4" src={photo4} />
        <p>
          Задаем напрядение нажав на правую ручку источника питания. Для задачи точного напряжения можно повернуть
          среднюю ручку источника питания.
        </p>
        <img alt="photo5" src={photo5} />
        <p>
          Чтобы записать значение напряжения необходимо нажать на кнопку ЗАПИСАТЬ, откроется таблица для записи значений
        </p>
        <img alt="photo6" src={photo6} />
        <p>Устанавливаем значение постоянного тока, поворачивая правую ручку источника питания</p>
        <img alt="photo7" src={photo7} />
        <p>Записываем значе</p>
        <img alt="photo9" src={photo9} />
        <p>
          При успешном заполнении всех полей и нажатии на кнопку ЗАПИСЬ в таблице записи значений, появится надпись
          «Успешная запись»
        </p>
        <img alt="photo10" src={photo10} />
        <p>Таблица чтения значений. Для ее открытия не</p>
        <img alt="photo11" src={photo11} />
      </div>
    </section>
  );
};
export default Simulator;
//   <a href="../../Webgl/index.html">f</a>
