import  jwt from "jsonwebtoken";
import Veterinario from "../models/Veterinario.js";

// Definición del middleware 'checkAuth'
const checkAuth = async (req, res, next) => {

    let token;

    // Verifica si la solicitud tiene un encabezado 'Authorization' y si comienza con 'Bearer'
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extrae el token de la solicitud y verifica su validez utilizando la clave secreta
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Busca al cliente en la base de datos utilizando el ID decodificado del token
            req.veterinario = await Veterinario.findById(decoded.id).select(
                "-password -token -confirmado"
            );
        } catch (error) {
            // Maneja errores en la verificación del token
            const e = new Error('Token no válido.');
            return res.status(403).json({ msg: e.message });
        }
    }

    // Si no se encuentra el token, responde con un error
    if (!token) {
        const error = new Error('Token inexistente');
        return res.status(403).json({ msg: error.message });
    }

    // Llama a la función 'next' para pasar al siguiente middleware o ruta
    next();
}

export default checkAuth;
