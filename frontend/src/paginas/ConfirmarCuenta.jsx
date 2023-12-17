import {useEffect} from 'react'
import {useParams} from 'react-router-dom';
import Axios from 'axios';


const ConfirmarCuenta = () => {

  const params = useParams();
  const {id} = params;

  useEffect(() => {
    // Esta es la función que se ejecutará cuando el componente se monte
    const confirmarCuenta = async () => {
      try {
        // Construye la URL para hacer una solicitud a un servicio en el servidor local
        const url = `http://localhost:4000/api/veterinarios/confirmar/${id}`;
        const { data } = await Axios(url);

        console.log(data);
        
        // Muestra la URL en la consola
        console.log(url);
      } catch (error) {
        // Maneja cualquier error que pueda ocurrir al construir la URL
        console.log(error);
      }
    };
  
    // Llama a la función confirmarCuenta cuando el componente se monta
    confirmarCuenta();
  
    // La dependencia [] significa que este efecto se ejecutará solo una vez, cuando el componente se monte.
  }, []);
  

  return (
    <>
      <>
      <div className='text-center'>
        <h1 className='text-indigo-600 font-black text-5xl mt-5'>CONFIRMA TU CUENTA</h1>
        <h2 className='text-gray-900 font-black text-2xl'>Y COMIENZA A ADMINISTRAR TUS PACIENTES</h2>

        <div className='flex justify-center'>
          <div className='shadow-2xl py-10 rounded-3xl px-5 mt-10 md:mt-5 bg-white w-full md:w-96'>
           </div>
        </div>
      </div>
    </>
    </>
  )
}

export default ConfirmarCuenta