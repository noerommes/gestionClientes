import mongoose from 'mongoose';
import {randomUUID} from 'crypto';
import bcrypt from 'bcrypt';

// Define el esquema de Mongoose para la entidad "Cliente"
const clienteSchema = mongoose.Schema({
    nombre:{
        type: String,
        required: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        trim:true,
    },
    telefono:{
        type: String,
        default: null,
        trim:true,
    },
    token:{
        type: String, 
        default: randomUUID(),
    },
    confirmado:{
        type: Boolean,
        default: false,
    },
});

// Middleware pre-save para el modelo ClienteSchema en Mongoose
clienteSchema.pre('save', async function(next) {

    // Verifica si la contraseña ha sido modificada antes de aplicar operaciones de hash
    if (!this.isModified('password')) {
        // Si la contraseña no se ha modificado, pasa al siguiente middleware sin hacer nada
        next();
    }

    // Genera un "salt" (una serie de caracteres aleatorios) utilizando bcrypt con un factor de costo de 10
    const salt = await bcrypt.genSalt(10);

    // Utiliza bcrypt para aplicar el algoritmo de hash a la contraseña actual del cliente
    // La contraseña original se reemplaza por su versión hasheada antes de almacenarla en la base de datos
    this.password = await bcrypt.hash(this.password, salt);

    // Llama a la función 'next' para continuar con el proceso de guardado después de aplicar el hash
    next();
});

// Método personalizado para comprobar la contraseña del cliente
clienteSchema.methods.comprobarPassword = async function (passwordFormulario) {
    // Utiliza bcrypt para comparar la contraseña proporcionada con la contraseña almacenada
    return await bcrypt.compare(passwordFormulario, this.password);
};

// Crea un modelo llamado "Cliente" utilizando el esquema definido anteriormente
const Cliente = mongoose.model('Cliente', clienteSchema);

export default Cliente;