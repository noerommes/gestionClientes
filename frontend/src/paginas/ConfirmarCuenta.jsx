import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import clienteAxios from '../config/axios';

const ConfirmarCuenta = () => {
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  const [cuentaCargando, setCargando] = useState(true);
  const [alerta, setAlerta] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const confirmarCuenta = async () => {
      try {
        const url = `/veterinarios/confirmar/${id}`;
        const {data} = await clienteAxios(url);
        setCuentaConfirmada(true);
        setAlerta({
          msg:data.msg,
          error:false,
        })
        
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
      setCargando(false);
    };

    confirmarCuenta();

  }, []); 

  return (
    <div className='text-center'>
      <h1 className='text-indigo-600 font-black text-5xl mt-5'>CONFIRMA TU CUENTA</h1>
      <h2 className='text-gray-900 font-black text-2xl'>Y COMIENZA A ADMINISTRAR TUS PACIENTES</h2>

      <div className='flex justify-center'>
        <div className='shadow-2xl py-10 rounded-3xl px-5 mt-10 md:mt-5 bg-white w-full md:w-96'>
          {!cuentaCargando && 
            <Alerta
              alerta={alerta}
            />
          }

          {cuentaConfirmada &&
            <Link to="/" className='text-gray-500 hover:text-gray-900'>
              INICIAR SESIÓN.
            </Link>
          }
        </div>
      </div>
    </div>
  );
};

export default ConfirmarCuenta;
