import classes from '../Structure/Structure.module.css';
import installation from '../../image/installation.jpg';
import installation2 from '../../image/installation2.jpg';

const Structure = () => {
  return (
    <section className={classes.structure}>
      <h1>Структура и описание установки</h1>
      <div className={classes.fotoInstallation}>
        <img alt="installation" src={installation} />
        <p>(Рис.1 - Изображение установки сверху)</p>
      </div>
      <div className={classes.descriptionInstallation}>
        <div className={classes.fotoInstallation}>
          <img alt="installation2" src={installation2} />
          <p>(Рис.2 - Изображение установки с прямого ракурса)</p>
        </div>
        <div className={classes.compound}>
          <p>1 — источник питания</p>
          <p>2 — медное тело</p>
          <p>3 — алюминивое тело</p>
          <p>4 — мультиметр</p>
          <p>Также в ходе эксперимента нам понадобиться секундомер</p>
        </div>
      </div>
    </section>
  );
};

export default Structure;
