import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import clienteAxios from '../config/axios';
import Alerta from '../components/Alerta';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  const navigate = useNavigate();
  const { setAuth } = useAuth(); // Obtén la función para actualizar el estado de autenticación

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes('')) {
      setAlerta({
        msg: 'Hay campos vacíos.',
        error: true
      });
      return;
    }

    try {
      const { data } = await clienteAxios.post(`/veterinarios/login`, { email, password });
      console.log(data);
      localStorage.setItem('token', data.token);
      // Actualiza el estado de autenticación utilizando la función del contexto
      setAuth(data);
      // Mueve la redirección aquí para asegurarte de que el estado se haya actualizado
      navigate('/admin');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setAlerta({
        msg: error.response.data.msg,
        error: true
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <div className='text-center'>
        <h1 className='text-indigo-600 font-black text-5xl mt-5'>INICIA SESIÓN</h1>
        <h2 className='text-gray-900 font-black text-2xl'>ADMINISTRA TUS PACIENTES</h2>
 
        <div className='flex justify-center'>
          <div className='shadow-2xl py-10 rounded-3xl px-5 mt-10 md:mt-5 bg-white w-full md:w-96'>
            {msg && <Alerta
                    alerta={alerta}
                  />
            }

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className='uppercase text-gray-600 block text-xl font-bold'>Email</label>
                <input 
                  type="email" 
                  placeholder='Email' 
                  className='mt-3 text-base border p-2 bg-gray-50 rounded-lg w-full' 
                  value={email}
                  onChange={e => setEmail(e.target.value)}/>
              </div>

              <div className="mb-8">
                <label className='uppercase text-gray-600 block text-xl font-bold'>Password</label>
                <input 
                  type="password" 
                  placeholder='Password' 
                  className='mt-3 text-base border p-2 bg-gray-50 rounded-lg w-full'
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  />
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
