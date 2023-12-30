import React, {useState, useEffect} from 'react'
import Alerta from '../components/Alerta';
import { useParams, Link } from 'react-router-dom';
import clienteAxios from '../config/axios';

const NuevaPassword = () => {

  const [password, setPassword] = useState('');
  const [repetirPassword, setRepetirPassword] = useState('');
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);

  const params = useParams();
  const { token } = params;

  //useEffect para una vez se haya renderizado el componente utilizarlo.
  useEffect(() =>{
    const comprobarToken = async () =>{
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`);
        
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg:'Hubo un error con en enlace.', 
          error: true
        });
      }
    }
    comprobarToken();
  }, []);


  const handleSubmit = async (e) => {

    e.preventDefault();

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
      const url = `/veterinarios/olvide-password/${token}`
      const {data} = await clienteAxios.post(url, { password })
      console.log(data);
      setAlerta({
        msg:data.msg,
        error: false
      });
      setPasswordModificado(true);
      
    } catch (error) {
      setAlerta({
        msg:error.response.data.msg,
        error: true
      });
    }


  }

  const { msg } = alerta;


  return (
    <>
      <div className='text-center mb-16'>
        <h1 className='text-indigo-600 font-black text-5xl '>REESTABLECE TU PASSWORD</h1>
        <h2 className='text-gray-900 font-black text-2xl mb-5'>Y VUELVE A ADMINISTRAR TUS PACIENTES</h2>

        <div className='flex justify-center'>
          <div className='shadow-2xl py-10 rounded-3xl px-5 mt-10 md:mt-2 bg-white w-3/4  md:w-3/4'>
            
            {msg && <Alerta alerta={alerta} />}

            {tokenValido && !passwordModificado && (
              <>
                <form onSubmit={handleSubmit}>
                  <div className='mb-4'>
                    <label className='uppercase text-gray-600 block text-xl font-bold'>Nueva Password</label>
                    <input
                      type='password'
                      placeholder='Nueva Password'
                      className='mt-3 text-base border p-2 bg-gray-50 rounded-lg w-full md:w-96'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>

                  <div className='mb-8'>
                    <label className='uppercase text-gray-600 block text-xl font-bold'>Repetir Nueva Password</label>
                    <input
                      type='password'
                      placeholder='Repetir Nueva Password'
                      className='mt-3 text-base border p-2 bg-gray-50 rounded-lg w-full md:w-96'
                      value={repetirPassword}
                      onChange={(e) => setRepetirPassword(e.target.value)}
                    />
                  </div>

                  <div className='flex flex-col items-center'>
                    <input
                      type='submit'
                      value='CAMBIAR PASSWORD'
                      className='bg-indigo-700 w-full md:w-96 py-2 rounded-lg text-white hover:cursor-pointer hover:bg-indigo-800'
                    />
                  </div>
                </form>
              </>
            )}

            {passwordModificado && (
              <>
                <nav className='flex flex-col items-cente'>
                  <Link to='/' className='text-gray-500 hover:text-gray-900'>
                    INICIAR SESIÓN.
                  </Link>
                </nav>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NuevaPassword