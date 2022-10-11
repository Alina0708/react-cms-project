import { useState } from 'react';

import classes from '../Structure/Structure.module.css';
// import installation from '../../image/installation.jpg';
import installation2 from '../../image/installation2.jpg';
import DC_Power_Supply from '../../image/DC_Power_Supply.jpg';
import multimetr from '../../image/multimetr.png';
import power from '../../image/power.jpg';
import copper from '../../image/copper.jpg';
import time from '../../image/time.jpg';
import aluminum from '../../image/aluminum.jpg';
import Modal from '../Modal/Modal';

const Structure = () => {
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
      <h1 className={classes.titleSticky}>Структура и описание установки</h1>
      {/* <div className={classes.fotoInstallation}>
        <img alt="installation" src={installation} />
        <p>(Рис.1 - Изображение установки сверху)</p>
      </div> */}
      <div className={classes.descriptionInstallation}>
        <div className={classes.fotoInstallation}>
          <img alt="installation2" src={installation2} />
          <p>(Рис.2 - Изображение установки с прямого ракурса)</p>
        </div>
        <div className={classes.compound}>
          <em
            images="https://m.media-amazon.com/images/I/81pXZat-ifL._SL1500_.jpg"
            onClick={() => {
              setDisplayImg({ power: true });
              setShow(true);
            }}
          >
            1 — источник питания
          </em>
          <em
            onClick={() => {
              setDisplayImg({ copper: true });
              setShow(true);
            }}
          >
            2 — медное тело
          </em>
          <em
            onClick={() => {
              setDisplayImg({ aluminum: true });
              setShow(true);
            }}
          >
            3 — алюминивое тело
          </em>
          <em
            onClick={() => {
              setDisplayImg({ multimetr: true });
              setShow(true);
            }}
          >
            4 — мультиметр
          </em>
          <em
            onClick={() => {
              setDisplayImg({ time: true });
              setShow(true);
            }}
          >
            Также в ходе эксперимента нам понадобиться секундомер
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
      <h1>Источник питания</h1>
      <div className={classes.componentInstallaion}>
        <img alt="DC_Power_Supply" src={DC_Power_Supply} />
        <div className={classes.power}>
          Регулируемые импульсные источники питания с высокостабильными выходными характеристиками и ультранизкими
          пульсациями. Цифровая индикация выходных значений напряжения и тока. Оперативный сброс выхода в ноль. Защита
          от перегрузки, короткого замыкания, перегрева. Терморегулированная вентиляция. Минимальная дискретность
          установки выходного напряжения и тока. Режимы работы: стабилизация U, I, динами- ческая нагрузка. Возможность
          параллельного и последовательного соединения двух однотипных приборов. Соединение любого из полюсов с корпусом
          (изолированный выход).
          <p>Задавать значение силы тока можно в диапазоне от 0 до 5 A;</p>
          <p>Задавать значение напряжения можно в диапазоне от 0 до 20 V;</p>
          <p>Выходная мощность: 100 Вт</p>
          <p>Стабильность при полной нагрузке ≤0,01% + 5 мВ, ≤0,2% + 5 мА</p>
          <p>Остаточная пульсация ≤1 мВ, 3 мА</p>
          <p>Дисплей: 2 x 3-значный светодиод</p>
          <p>Клеммы: безопасные гнезда 4 мм</p>
          <p>Размеры: прибл. 130x150x300 мм³</p>
          <p>Вес: прибл. 4,7 кг</p>
        </div>
      </div>
      <h1>Мультиметр</h1>
      <div className={classes.componentInstallaion}>
        <img alt="multimetr" src={multimetr} className={classes.sizeImage} />
        <div className={classes.multimetr}>
          <p>Цифровой мультиметр P1035</p>
          <p>
            Мультиметр – это многофункциональный электроизмерительный прибор. Основное его назначение – измерение
            характеристик электрического сигнала. Функционально мультиметр объединяет возможности амперметра,
            вольтметра, омметра и других электроизмерительных приборов.
          </p>
          <p>Основные функции мультиметра</p>
          <ul>
            <li>измерение постоянного и переменного напряжения,</li>
            <li>измерение постоянного и переменного тока,</li>
            <li>измерение сопротивления, емкости и индуктивности.</li>
          </ul>
          <p>Вес: прибл. 260 г</p>
          <p>Размеры: прибл. 70x150x48 мм3</p>
          <p>Класс безопасности: CAT III 600 В (IEC-1010-1)</p>
          <p>Рабочее напряжение: батарея 9 В</p>
          <p>Напряжение постоянного тока: 200 мВ − 600 В, 5 диапазонов, ±0,5% ± 2 разряда</p>
        </div>
      </div>
      <div>
        <a href="map/test100.html" target="_blank">
          Open new page with map
        </a>
      </div>
      <div>
        <a href="map/video_html.html" target="_blank">
          Open new page with video
        </a>
      </div>
    </section>
  );
};

export default Structure;
