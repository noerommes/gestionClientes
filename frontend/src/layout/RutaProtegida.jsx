import React from 'react'
import { Outlet, Navigate } from 'react-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import useAuth from '../hooks/useAuth';

const RutaProtegida = () => {

  const {auth, cargando} = useAuth();
  console.log(auth);
  console.log(cargando);

  if (cargando) {
    return "cargando..."
  }

  return (
      <>
          <main>
              <Header/>           
              {auth?._id ? (
                <main className='container mx-auto mt-20'>
                  <Outlet />
                </main>
              ) : <Navigate to="/" />}
              <Footer/> 
          </main>
      </>
  )

}

export default RutaProtegida