
import classes from "../Contacts/Contacts.module.css"
import avatar from "../../image/foto4.jpg"

const Contacts = () => {
  return (<section className={classes.profile}>
    <div className={classes.contact}>
        <div className={classes.aboutMe}><h4>Обо мне</h4></div>
        <p>Студентка 3 курса 1 группы факультета информациоонных технологий Белорусского государственного технологического университета</p>
    </div>
    <div className={classes.foto}>
        <img alt="avatar" src={avatar}/>
        <p>Севрюк Алина</p>
    </div>
  </section>);
};

export default Contacts;
