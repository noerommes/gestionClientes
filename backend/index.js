import express from "express";
import dotenv from 'dotenv';
import conectarDB from './config/db.js';
import clienteRoutes from './routes/clienteRoutes.js';

// Crea una instancia de la aplicación express
const app = express();

// Habilita el uso de JSON en las solicitudes y respuestas
app.use(express.json());

// Configura la aplicación para cargar las variables de entorno desde un archivo '.env'
dotenv.config();

// Llama a la función 'conectarDB' para establecer la conexión con la base de datos MongoDB
conectarDB();

// Configura el puerto del servidor utilizando la variable de entorno 'PORT', o utiliza el puerto 4000 por defecto
const PORT = process.env.PORT || 4000;

// Configura el servidor para escuchar en el puerto definido y muestra un mensaje en la consola cuando está listo
app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}.`);
});

// Configura una ruta para manejar las solicitudes en '/api/clientes', utilizando las rutas definidas en 'clienteRoutes'
app.use('/api/clientes', clienteRoutes);