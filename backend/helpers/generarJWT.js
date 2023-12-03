import jwt from 'jsonwebtoken';

// Definición de la función 'generarJWT'
const generarJWT = (id) => {
    // Genera un token JWT utilizando la función 'sign' de la biblioteca 'jsonwebtoken'
    // El token contiene el ID del usuario y se firma utilizando el secreto proporcionado en el archivo de entorno
    // El token tiene una vigencia de 30 días (expira después de 30 días)
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

export default generarJWT;