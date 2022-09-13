import classes from '../Home/Home.module.css';
import installation1 from '../../image/installation1.jpg'

const Home = () => {
  console.log('home');
  return (
      <section className={classes.term}>
        <img alt={installation1} src={installation1} className={classes.foneImage}/>
        <p className={classes.centered}>ВНУТРЕННЯЯ ЭНЕРГИЯ И РАБОТА ЭЛЕКТРИЧЕСКОГО ТОКА</p>
      </section>
  );
};

export default Home;
