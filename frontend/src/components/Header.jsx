import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='py-10 bg-indigo-600'>
      <div className="w-11/12 mx-auto text-indigo-50 flex justify-between items-center">
        <h1 className='font-bold text-2xl'>
          Administrador de Pacientes de Veterinaria.
        </h1>
        <nav className='flex gap-10'> 
          <Link to="/admin" className='text-white text-xl uppercase hover:font-bold'>Paciente</Link>
          <Link to="/admin" className='text-white text-xl uppercase hover:font-bold'>Perfil</Link>
          <button
            type='button'
            className='text-white text-xl uppercase hover:font-bold'
          >
            Cerrar Sesión
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
