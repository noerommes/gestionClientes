import Cliente from "../models/Cliente.js";
import generarJWT from "../helpers/generarJWT.js";
import {randomUUID} from 'crypto';

// Definición de la función 'registrar', que maneja las solicitudes para la ruta '/api/clientes'
const registrar = async (req, res) => {

    // Extraer el correo electrónico del cuerpo de la solicitud
    const { email } = req.body;

    // Prevenir usuarios duplicados consultando la base de datos
    const existeUsuario = await Cliente.findOne({ email });

    // Si el usuario ya existe, devolver un error
    if (existeUsuario) {
        const error = new Error('Usuario ya registrado.');
        return res.status(400).json({ msg: error.message });
    }

    try {
        // Guardar un nuevo cliente utilizando el modelo Cliente
        const cliente = new Cliente(req.body);
        // Con 'await', la ejecución se bloquea hasta que se complete la operación de guardado
        const clienteGuardado = await cliente.save();
        // Responder con el cliente recién guardado en formato JSON
        res.json(clienteGuardado);
    } catch (error) {
        console.log(error);
    }
};

// Definición de la función 'confirmar', que maneja las solicitudes para la ruta '/confirmar'
const confirmar = async (req, res) => {

    // Extraer el token de los parámetros de la solicitud
    const { token } = req.params;

    // Buscar un usuario por el token en la base de datos
    const usuarioConfirmar = await Cliente.findOne({ token });
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


// Definición de la función 'autenticar', que maneja las solicitudes para la ruta '/login'
const autenticar = async (req, res) => {

    // Extraer el correo y la password electrónico del cuerpo de la solicitud
    const { email, password } = req.body;

    // Comprobar si existe un usuario con el correo electrónico proporcionado
    const usuario = await Cliente.findOne({ email });

    // Si no existe el usuario, devolver un error
    if (!usuario) {
        const error = new Error('No existe el usuario.');
        return res.status(403).json({ msg: error.message });
    }

    // Verificar si el usuario ha confirmado su correo electrónico
    if (!usuario.confirmado) {
        const error = new Error('Falta confirmar el correo.');
        return res.status(403).json({ msg: error.message });
    }

    // Comprobar si la contraseña proporcionada coincide con la almacenada en la base de datos
    if (await usuario.comprobarPassword(password)) {
        // Responder con un token JWT si la autenticación es exitosa
        res.json({ token: generarJWT(usuario._id) });
    } else {
        // Si la contraseña es incorrecta, devolver un error
        const error = new Error('Contraseña incorrecta.');
        return res.status(403).json({ msg: error.message });
    }
};


// Definición de la función 'perfil', que maneja las solicitudes para la ruta '/perfil'
const perfil = (req, res) => {
    // Extraer el objeto cliente de la solicitud, que se ha agregado anteriormente mediante middleware
    const { cliente } = req;
    // Responder con el perfil del cliente en formato JSON
    res.json({ perfil: cliente });
};


// Definición de la función 'olvidePassword', que maneja las solicitudes para la ruta '/olvide-password'
const olvidePassword = async (req, res) => {
    const { email } = req.body;

    // Comprobar si existe un usuario con el correo electrónico proporcionado
    const existeUsuario = await Cliente.findOne({ email });

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
    const usuarioToken = await Cliente.findOne({ token });

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
    const cliente = await Cliente.findOne({ token });

    // Si no se encuentra el usuario, devolver un error
    if (!cliente) {
        const error = new Error('Hubo un error.');
        return res.status(404).json({ msg: error.message });
    }

    try {
        // Actualizar propiedades del usuario para establecer la nueva contraseña
        cliente.token = null;
        cliente.password = password;
        // Con 'await', la ejecución se bloquea hasta que se complete la operación de guardado
        await cliente.save();
        // Responder con un mensaje indicando que la contraseña se ha modificado correctamente
        res.json({ msg: 'Password modificada correctamente.' });
    } catch (error) {
        console.log(error);
    }
};

// Exportar las funciones 'registrar', 'perfil', y 'confirmar' para que puedan ser utilizadas en otros archivos
export { registrar, perfil, confirmar, autenticar, olvidePassword, comprobarToken, nuevoPassword };