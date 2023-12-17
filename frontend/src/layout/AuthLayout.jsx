import React from 'react';
import { Outlet } from 'react-router';

const AuthLayout = () => {
  return (
    <>
      <main className='container mx-auto max-w-screen-lg sm:max-w-screen-sm lg:max-w-screen-xl md:grid items-center mt-10 gap-12' style={{ width: '90%' }}>
        <Outlet />
      </main>
    </>
  );
}

export default AuthLayout;
