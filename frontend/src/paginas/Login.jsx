import React from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <>
      <div className='text-center'>
        <h1 className='text-indigo-600 font-black text-5xl mt-5'>INICIA SESIÓN</h1>
        <h2 className='text-gray-900 font-black text-2xl'>ADMINISTRA TUS PACIENTES</h2>

        <div className='flex justify-center'>
          <div className='shadow-2xl py-10 rounded-3xl px-5 mt-10 md:mt-5 bg-white w-full md:w-96'>
            <form>
              <div className="mb-4">
                <label className='uppercase text-gray-600 block text-xl font-bold'>Email</label>
                <input type="email" placeholder='Email' className='mt-3 text-base border p-2 bg-gray-50 rounded-lg w-full' />
              </div>

              <div className="mb-8">
                <label className='uppercase text-gray-600 block text-xl font-bold'>Password</label>
                <input type="password" placeholder='Password' className='mt-3 text-base border p-2 bg-gray-50 rounded-lg w-full' />
              </div>

              <div className='flex flex-col items-center'>
                <input type="submit" value="INICIAR SESIÓN" className='bg-indigo-700 w-full py-2 rounded-lg text-white hover:cursor-pointer hover:bg-indigo-800' />
              </div>
            </form>

            <nav className='flex flex-col items-center mt-9'>
              <Link to="/registrar" className='text-gray-500 hover:text-gray-900'>¿NO TIENES UNA CUENTA? REGÍSTRATE.</Link>
              <Link to="/olvide-password" className='text-gray-500 hover:text-gray-900' >OLVIDE MI PASSWORD</Link>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
