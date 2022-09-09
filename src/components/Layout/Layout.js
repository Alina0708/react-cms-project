import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div>
      {console.log('hello')}
      {/* layout */}
      {/* <Header /> */}
      {/* <NavMenu /> */}
      <div className="main" style={{ marginTop: '100px' }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
