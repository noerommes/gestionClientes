import express from "express";
import dotenv from 'dotenv';
import cors from 'cors';
import conectarDB from './config/db.js';
import veterinarioRoutes from './routes/veterinarioRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js';

// Crea una instancia de la aplicación express
const app = express();

// Habilita el uso de JSON en las solicitudes y respuestas
app.use(express.json());

// Configura la aplicación para cargar las variables de entorno desde un archivo '.env'
dotenv.config();

// Llama a la función 'conectarDB' para establecer la conexión con la base de datos MongoDB
conectarDB();

const dominiosPermitidos = [process.env.FRONTEND_URL]

const corsOption ={
    origin: function(origin, callback){
        if (dominiosPermitidos.indexOf(origin) !== -1 ) {
            callback(null, true);
        }else{
            callback(new Error('No permitido por CORS'));
        }
    }
}

app.use(cors(corsOption));

// Configura el puerto del servidor utilizando la variable de entorno 'PORT', o utiliza el puerto 4000 por defecto
const PORT = process.env.PORT || 4000;

// Configura el servidor para escuchar en el puerto definido y muestra un mensaje en la consola cuando está listo
app.listen(PORT, () => {
    console.log(`Servidor funcionando en el puerto ${PORT}.`);
});

// Configura una ruta para manejar las solicitudes en '/api/veterinarios', utilizando las rutas definidas en 'veterinarioRoutes'
app.use('/api/veterinarios', veterinarioRoutes);

// Configura una ruta para manejar las solicitudes en '/api/paciente', utilizando las rutas definidas en 'pacienteRoutes'
app.use('/api/pacientes', pacienteRoutes);