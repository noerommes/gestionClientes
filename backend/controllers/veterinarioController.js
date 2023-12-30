import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import {randomUUID} from 'crypto';
import emailRegistro from "../helpers/emailRegistro.js";
import emailOlvidePassword from "../helpers/emailOlvidePassword.js";

// Definición de la función 'registrar', que maneja las solicitudes para la ruta '/api/clientes'
const registrar = async (req, res) => {

    // Extraer el correo electrónico del cuerpo de la solicitud
    const { email, nombre} = req.body;

    // Prevenir usuarios duplicados consultando la base de datos
    const existeUsuario = await Veterinario.findOne({ email });

    // Si el usuario ya existe, devolver un error
    if (existeUsuario) {
        const error = new Error('Usuario ya registrado.');
        return res.status(400).json({ msg: error.message });
    }

    try {
        // Guardar un nuevo cliente utilizando el modelo Cliente
        const veterinario = new Veterinario(req.body);
        // Con 'await', la ejecución se bloquea hasta que se complete la operación de guardado
        const veterinarioGuardado = await veterinario.save();

        //Enviar el email.
        emailRegistro({
            email,
            nombre,
            token: veterinarioGuardado.token
        });

        // Responder con el cliente recién guardado en formato JSON
        res.json(veterinarioGuardado);
    } catch (error) {
        console.log(error);
    }
};

// Definición de la función 'confirmar', que maneja las solicitudes para la ruta '/confirmar'
const confirmar = async (req, res) => {

    // Extraer el token de los parámetros de la solicitud
    const { token } = req.params;

    // Buscar un usuario por el token en la base de datos
    const usuarioConfirmar = await Veterinario.findOne({ token });
    console.log('Usuario encontrado:', usuarioConfirmar);

    // Si no se encuentra el usuario, devolver un error
    if (!usuarioConfirmar) {
        const error = new Error('Token no válido.');
        return res.status(404).json({ msg: error.message });
    }

    try {
        // Actualizar propiedades del usuario para confirmar su registro
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        // Con 'await', la ejecución se bloquea hasta que se complete la operación de guardado
        await usuarioConfirmar.save();
        // Responder con un mensaje indicando que el usuario se ha confirmado correctamente
        res.json({ msg: 'Usuario confirmado correctamente.' });
    } catch (error) {
        // Manejar errores en la operación de confirmación
        console.log(error);
    }
};


const autenticar = async (req, res) => {
    const { email, password } = req.body;
  
    // Comprobar si el usuario existe
    const usuario = await Veterinario.findOne({ email });
    if (!usuario) {
      const error = new Error("El Usuario no existe");
      return res.status(404).json({ msg: error.message });
    }
    // Comprobar si el usuario esta confirmado
    if (!usuario.confirmado) {
      const error = new Error("Tu Cuenta no ha sido confirmada");
      return res.status(403).json({ msg: error.message });
    }
    // Revisar el password
    if (await usuario.comprobarPassword(password)) {
      // Autenticar
      res.json({
        _id: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        token: generarJWT(usuario.id),
      });
    } else {
      const error = new Error("El Password es incorrecto");
      return res.status(403).json({ msg: error.message });
    }
  };


// Definición de la función 'perfil', que maneja las solicitudes para la ruta '/perfil'
const perfil = (req, res) => {
    const { veterinario } = req;
    res.json(veterinario);
  };

// Definición de la función 'olvidePassword', que maneja las solicitudes para la ruta '/olvide-password'
const olvidePassword = async (req, res) => {
    
    const { email } = req.body;

    // Comprobar si existe un usuario con el correo electrónico proporcionado
    const existeUsuario = await Veterinario.findOne({ email });

    // Si no existe el usuario, devolver un error
    if (!existeUsuario) {
        const error = new Error('No existe el usuario.');
        return res.status(400).json({ msg: error.message });
    }

    try {
        // Generar un nuevo token UUID y asignarlo al usuario
        existeUsuario.token = randomUUID();
        // Con 'await', la ejecución se bloquea hasta que se complete la operación de guardado
        await existeUsuario.save();

        emailOlvidePassword({
            email,
            nombre:existeUsuario.nombre,
            token: existeUsuario.token
        });

        // Responder con un mensaje indicando que se ha enviado un correo con instrucciones
        res.json({ msg: "Hemos enviado un correo con las instrucciones." });
    } catch (error) {
        console.log(error);
    }
};

// Definición de la función 'comprobarToken', que maneja las solicitudes para la ruta '/olvide-password/:token'
const comprobarToken = async (req, res) => {
    // Extraer el token de los parámetros de la solicitud
    const { token } = req.params;

    // Buscar un usuario por el token en la base de datos
    const usuarioToken = await Veterinario.findOne({ token });

    // Si se encuentra el usuario, responder con un mensaje indicando que el token es válido
    if (usuarioToken) {
        res.json({ msg: 'Token válido y usuario existe.' });
    } else {
        // Si no se encuentra el usuario, devolver un error
        const error = new Error('Token no válido');
        return res.status(400).json({ msg: error.message });
    }
};

// Definición de la función 'nuevoPassword', que maneja las solicitudes para la ruta '/olvide-password/:token'
const nuevoPassword = async (req, res) => {
    // Extraer el token de los parámetros de la solicitud
    const { token } = req.params;
    // Extraer la nueva contraseña del cuerpo de la solicitud
    const { password } = req.body;

    // Buscar un usuario por el token en la base de datos
    const veterinario = await Veterinario.findOne({ token });

    // Si no se encuentra el usuario, devolver un error
    if (!veterinario) {
        const error = new Error('Hubo un error.');
        return res.status(404).json({ msg: error.message });
    }

    try {
        // Actualizar propiedades del usuario para establecer la nueva contraseña
        veterinario.token = null;
        veterinario.password = password;
        // Con 'await', la ejecución se bloquea hasta que se complete la operación de guardado
        await veterinario.save();
        // Responder con un mensaje indicando que la contraseña se ha modificado correctamente
        res.json({ msg: 'Password modificada correctamente.' });
    } catch (error) {
        console.log(error);
    }
};

// Exportar las funciones 'registrar', 'perfil', y 'confirmar' para que puedan ser utilizadas en otros archivos
export { registrar, perfil, confirmar, autenticar, olvidePassword, comprobarToken, nuevoPassword };