import React from 'react';
import { Link} from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Header = () => {

  const {cerrarSesion} = useAuth();

  return (
    <header className='py-10 bg-indigo-600'>
      <div className="w-11/12 mx-auto text-indigo-50 flex flex-col lg:flex-row justify-between items-center">
        <h1 className='font-bold text-4xl pb-7 lg:py-0'>
         ADV
        </h1>
        <nav className='flex gap-10'> 
          <Link to="/admin" className='text-white text-base lg:text-xl uppercase hover:font-bold'>Paciente</Link>
          <Link to="/admin" className='text-white text-base lg:text-xl uppercase hover:font-bold'>Perfil</Link>
          <button
            type='button'
            className='text-white text-base lg:text-xl uppercase hover:font-bold'
            onClick={cerrarSesion}
          >
           Cerrar Sesión
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
