import classes from '../Home/Home.module.css';
import installation1 from '../../image/installation1.jpg';

const Home = () => {
  console.log('home');
  return (
    <section className={classes.term}>
      <img alt={installation1} src={installation1} className={classes.foneImage} />
      <div className={classes.centered}>
        <p>БЕЛОРУССКИЙ ГОСУДАРСТВЕННЫЙ ТЕХНОЛОГИЧЕСКИЙ УНИВЕРСИТЕТ</p>
        <p>Факультет Информационных Технологий</p>
        <p>Кафедра информационных систем и технологий</p>
        <p>Курсовой проект по дисциплине</p>
        <p>«Компьютерные мультимедийные системы в издательском деле»</p>
        <p>Тема курсового проекта:"Работа электрического тока»</p>
      </div>
      <div className={classes.developer}>
        <p>Выполнила: студентка 3 курса 1 группы</p>
        <p>Севрюк Алина Эдуардовна</p>
      </div>
    </section>
  );
};

export default Home;
