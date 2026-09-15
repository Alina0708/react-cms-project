import { NavLink } from 'react-router-dom';

import { getNavItems } from '../../../config/navigation';
import { useLanguage } from '../../../i18n/LanguageContext';
import LanguageToggle from './LanguageToggle';
import classes from '../Header/Header.module.css';

const Header = () => {
  const { language } = useLanguage();
  const navItems = getNavItems(language);

  return (
    <header>
      <nav className={classes.navMenu}>
        {navItems.map(({ to, label }) => (
          <NavLink key={to} to={to} className={(navData) => (navData.isActive ? classes.activeLink : classes.item)}>
            {label}
          </NavLink>
        ))}
      </nav>
      <div className={classes.languageSlot}>
        <LanguageToggle />
      </div>
    </header>
  );
};

export default Header;
