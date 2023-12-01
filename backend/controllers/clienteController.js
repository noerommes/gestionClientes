import Cliente from "../models/Cliente.js";

// Definición de la función 'registrar', que maneja las solicitudes para la ruta '/api/clientes'
const registrar = async (req, res) => {

    // const {email, password, nombre} = req.body;

    try {
        //Guardar un nuevo cliente
        const cliente = new Cliente(req.body);
        //Con en await bloqueas la compilación hasta que se guarde el cliente.
        const clienteGuardado =  await cliente.save();
        res.json(clienteGuardado);

    } catch (error) {
        console.log(error);
    }

    

};

// Definición de la función 'registrar', que maneja las solicitudes para la ruta '/perfil'
const perfil = (req, res) => {
    res.json({msg:'Mostrando perfil...'});
};

// Exporta la función 'registrar' para que pueda ser utilizada en otros archivos
export { registrar, perfil};
