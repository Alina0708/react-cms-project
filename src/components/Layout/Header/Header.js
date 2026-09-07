import { NavLink } from 'react-router-dom';

import { navItems } from '../../../config/navigation';
import classes from '../Header/Header.module.css';

const Header = () => {
  return (
    <header>
      <nav className={classes.navMenu}>
        {navItems.map(({ to, label }) => (
          <NavLink key={to} to={to} className={(navData) => (navData.isActive ? classes.activeLink : classes.item)}>
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;
