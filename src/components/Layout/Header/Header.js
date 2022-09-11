import { NavLink } from 'react-router-dom';

import classes from '../Header/Header.module.css';

const Header = () => {
  return (
    <header>
      <nav className={classes.navMenu}>
        <NavLink to="/Home" className={(navData) => (navData.isActive ? classes.activeLink : classes.item)}>
          Главная
        </NavLink>

        <NavLink to="/Theory" className={(navData) => (navData.isActive ? classes.activeLink : classes.item)}>
          Теория
        </NavLink>

        <NavLink to="/Structure" className={(navData) => (navData.isActive ? classes.activeLink : classes.item)}>
          Структура
        </NavLink>

        <NavLink to="/Simulator" className={(navData) => (navData.isActive ? classes.activeLink : classes.item)}>
          Симулятор
        </NavLink>

        <NavLink to="/Contacts" className={(navData) => (navData.isActive ? classes.activeLink : classes.item)}>
          Контакты
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
