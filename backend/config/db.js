import mongoose from 'mongoose';

// Función asincrónica para conectar a la base de datos MongoDB
const conectarDB = async () => {
    try {

        // Utiliza el método 'connect' de mongoose para conectarse a la base de datos MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            writeConcern: 'majority',
        });

        // Construye la URL de la base de datos utilizando la información de conexión de mongoose
        const url = `${mongoose.connection.host}:${mongoose.connection.port}`;

        console.log(`MongoDB conectado en: ${url}`);

    } catch (error) {

        // En caso de error, imprime el mensaje de error en la consola
        console.log(`Error: ${error.message}`);

        // Termina el proceso de Node.js con un código de error
        process.exit(1);

    }
};

// Exporta la función 'conectarDB' para que pueda ser utilizada en otros archivos
export default conectarDB;