import { Outlet } from 'react-router-dom';


import classes from '../Layout/Layout.module.css';
import Header from './Header/Header';

const Layout = () => {
  return (
    <div className={classes.appwrapper}>
      <Header />
      <div className={classes.content}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
