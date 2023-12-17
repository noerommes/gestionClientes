import React from 'react';
import { Link } from 'react-router-dom';

const OlvidePassword = () => {
  return (
    <>
      <div className='text-center'>
        <h1 className='text-indigo-600 font-black text-5xl mt-5'>RECUPERA TU CONTRASEÑA</h1>
        <h2 className='text-gray-900 font-black text-2xl'>Y VUELVE A ADMINISTRAR TUS PACIENTES</h2>

        <div className='flex justify-center'>
          <div className='shadow-2xl py-10 rounded-3xl px-5 mt-10 md:mt-2 bg-white md:w-2/4'>
            <form>
              <div className="mb-4">
                <label className='uppercase text-gray-600 block text-xl font-bold'>Email</label>
                <input type="email" placeholder='Email' className='mt-3 text-base border p-2 bg-gray-50 rounded-lg w-full md:w-96'/>
              </div>

              <div className='flex flex-col items-center'>
                <input type="submit" value="RECUPERAR CONTRASEÑA" className='bg-indigo-700 w-full md:w-96 py-2 rounded-lg text-white hover:cursor-pointer hover:bg-indigo-800' />
              </div>
            </form>

            <nav className='flex flex-col items-center mt-9'>
              <Link to="/" className='text-gray-500 hover:text-gray-900'>¿YA TIENES UNA CUENTA? INICIA SESIÓN.</Link>
              <Link to="/registrar" className='text-gray-500 hover:text-gray-900' >¿NO TIENES UNA CUENTA? REGÍSTRATE.</Link>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default OlvidePassword;
