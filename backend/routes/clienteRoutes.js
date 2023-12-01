import express from 'express';
import { registrar, perfil } from '../controllers/clienteController.js';

// Crea una instancia de Router de Express
const router = express.Router();

// Configura una ruta para manejar solicitudes GET en la raíz ('/'), utiliza la respuesta establecida en clienteController.
router.post('/', registrar);

// Configura una ruta para manejar solicitudes GET en '/login'
router.get('/perfil', perfil);

// Exporta el enrutador para que pueda ser utilizado en otros archivos
export default router;
