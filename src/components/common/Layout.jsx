import React from 'react';
import { Outlet } from 'react-router-dom';
import BottomTab from './BottomTab';
import '../../styles/Main.scss';

function Layout() {
  return (
    <>
      <main>
        {/* Outlet을 통해서 다른 웹페이지들이 표시 된다 */}
        <Outlet />
      </main>
      <BottomTab />
    </>
  );
}

export default Layout;
