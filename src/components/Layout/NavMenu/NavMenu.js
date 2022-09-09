import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './NavMenu.module.css';

const NavMenu = () => {
  return (
    <nav className={classes.navMenu}>
      <div>
        <NavLink
          to="/Theory"
          //   className={(navData) =>
          //     navData.isActive ? classes.activeLink : classes.item
          //   }
        >
          Theory
        </NavLink>
      </div>
      <div>
        <NavLink
          to="/Structure"
          //   className={(navData) =>
          //     navData.isActive ? classes.activeLink : classes.item
          //   }
        >
          Structure
        </NavLink>
      </div>
      <div>
        <NavLink
          to="/Simulator"
          //   className={(navData) =>
          //     navData.isActive ? classes.activeLink : classes.item
          //   }
        >
          Simulator
        </NavLink>
      </div>
    </nav>
  );
};

export default NavMenu;
