import express from 'express';
import { registrar,perfil, confirmar, autenticar, olvidePassword, comprobarToken, nuevoPassword } from '../controllers/clienteController.js';
import checkAuth from '../middleware/authMiddleware.js';

// Crea una instancia de Router de Express
const router = express.Router(); 


// ÁREA PÚBLICA

// Configura una ruta para manejar solicitudes POST en la raíz ('/api/clientes'), utiliza la función 'registrar' del controlador.
router.post('/', registrar);
// Configura una ruta para manejar solicitudes GET en '/confirmar/:token', utiliza la función 'confirmar' del controlador.
router.get('/confirmar/:token', confirmar);
// Configura una ruta para manejar solicitudes POST en '/login', utiliza la función 'autenticar' del controlador.
router.post('/login', autenticar);
// Configura una ruta para manejar solicitudes GET en '/perfil', utiliza la función 'perfil' del controlador y aplica el middleware 'checkAuth'.
router.get('/perfil', checkAuth, perfil);


// ÁREA PRIVADA

// Configura una ruta para manejar solicitudes POST en '/olvide-password', utiliza la función 'olvidePassword' del controlador.
router.post('/olvide-password', olvidePassword);
// Configura una ruta para manejar solicitudes GET y POST en '/olvide-password/:token', utiliza la función 'comprobarToken' y 'nuevoPassword' del controlador
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword);

// Exporta el enrutador para que pueda ser utilizado en otros archivos
export default router;
