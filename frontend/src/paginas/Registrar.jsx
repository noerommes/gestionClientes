import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const Registrar = () => {
  // Estado para los campos del formulario
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');

  // Estado para manejar las alertas
  const [alerta, setAlerta] = useState({})

  // Función para manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validación de campos vacíos
    if ([nombre, email, password, repetirPassword].includes('')) {
      setAlerta(
        {msg:'Hay campos vacíos.', 
        error: true
      });
      return;
    }

    // Validación de contraseñas diferentes
    if (password !== repetirPassword) {
      setAlerta({
        msg:'Las password no son iguales.', 
        error: true
      });
      return;
    }

    // Validación de longitud mínima de contraseña
    if (password.length < 6) {
      setAlerta({
        msg:'El Password es muy corto, agrega mínimo 6 carácteres.', 
        error: true
      });
      return;
    }

    // Validación de caracteres especiales, números, mayúsculas y minúsculas en la contraseña
    const regexSpecial = /[!@#$%^&*(),.?":{}|<>]/;
    const regexNumber = /\d/;
    const regexUpperCase = /[A-Z]/;
    const regexLowerCase = /[a-z]/;

    if (
      !regexSpecial.test(password) ||
      !regexNumber.test(password) ||
      !regexUpperCase.test(password) ||
      !regexLowerCase.test(password)
    ) {
      setAlerta({
        msg:'La contraseña debe contener al menos un carácter especial, un número y mayúsculas y minúsculas.',
        error: true
      });
      return;
    }

    try {
      await clienteAxios.post(`/veterinarios`, {nombre, email, password});
      setAlerta({
        msg: 'Creado correctamente, revisa tu email.',
        error: false
      })
    } catch (error) {
      setAlerta({
        msg:error.response.data.msg,
        error:true
      })
    }

  }
  
    // Extraer el mensaje de alerta.
    const { msg } = alerta;

  // Renderizar el componente
  return (
    <>
      <div className='text-center mb-16'>
        <h1 className='text-indigo-600 font-black text-5xl '>CREA TU CUENTA</h1>
        <h2 className='text-gray-900 font-black text-2xl mb-5'>Y ADMINISTRA TUS PACIENTES</h2>

        <div className='flex justify-center'>
          <div className='shadow-2xl py-10 rounded-3xl px-5 mt-10 md:mt-2 bg-white md:w-3/4'>
            {/* Formulario de registro */}
            <form 
              onSubmit={handleSubmit}
            >
              {/* Mostrar alerta si existe */}
              

              {/* Campos del formulario */}
              <div className="mb-4">
                <label className='uppercase text-gray-600 block text-xl font-bold'>Nombre</label>
                <input 
                  type="text" 
                  placeholder='Nombre' 
                  className='mt-3 text-base border p-2 bg-gray-50 rounded-lg w-full md:w-96'
                  value={nombre}
                  onChange={ e => setNombre(e.target.value) }
                />
              </div>

              <div className="mb-4">
                <label className='uppercase text-gray-600 block text-xl font-bold'>Email</label>
                <input 
                  type="email" 
                  placeholder='Email' 
                  className='mt-3 text-base border p-2 bg-gray-50 rounded-lg w-full md:w-96'
                  value={email}
                  onChange={ e => setEmail(e.target.value) }
                />
              </div>

              <div className="mb-4">
                <label className='uppercase text-gray-600 block text-xl font-bold'>Password</label>
                <input 
                  type="password" 
                  placeholder='Password' 
                  className='mt-3 text-base border p-2 bg-gray-50 rounded-lg w-full md:w-96'
                  value={password}
                  onChange={ e => setPassword(e.target.value) }
                />
              </div>

              <div className="mb-8">
                <label className='uppercase text-gray-600 block text-xl font-bold'>Repetir Password</label>
                <input 
                  type="password" 
                  placeholder='Repetir password' 
                  className='mt-3 text-base border p-2 bg-gray-50 rounded-lg w-full md:w-96'
                  value={repetirPassword}
                  onChange={ e => setRepetirPassword(e.target.value) }
                />
              </div>

              {msg && <Alerta
                        alerta={alerta}
                      />
              }

              {/* Botón de envío */}
              <div className='flex flex-col items-center'>
                <input type="submit" value="CREAR CUENTA" className='bg-indigo-700 w-full md:w-96 py-2 rounded-lg text-white hover:cursor-pointer hover:bg-indigo-800' />
              </div>

              
            </form>

            {/* Enlaces de navegación */}
            <nav className='flex flex-col items-center mt-9'>
              <Link to="/" className='text-gray-500 hover:text-gray-900'>¿YA TIENES UNA CUENTA? INICIA SESIÓN.</Link>
              <Link to="/olvide-password" className='text-gray-500 hover:text-gray-900' >OLVIDÉ MI PASSWORD</Link>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Registrar;
