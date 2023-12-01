import mongoose from 'mongoose';

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

    },
    confirmado:{
        type: Boolean,
        default: false,
    },
});

const Cliente = mongoose.model('Cliente', clienteSchema);

export default Cliente;