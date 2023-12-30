import { useState, useEffect, createContext } from 'react'
import clienteAxios from '../config/axios'

// Creación de un contexto de autenticación
const AuthContext = createContext()

// Definición del componente proveedor de autenticación
const AuthProvider = ({ children }) => {
    
    const [cargando, setCargando] = useState(true)

    // Estado de autenticación y función para actualizarlo
    const [ auth, setAuth ] = useState({})

    // Efecto de autenticación al montar el componente
    useEffect(() => {
        // Función asincrónica para autenticar al usuario
        const autenticarUsuario = async () => {
            // Obtener el token almacenado en el localStorage
            const token = localStorage.getItem('token')

            // Si no hay token, salir temprano
            if (!token) {
                setCargando(false)
                return
            }

            // Configuración del encabezado de la solicitud con el token de autorización
            const config = {
                headers: {
                    "Content-Type": "application/json", 
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                // Realizar una solicitud a la ruta '/veterinarios/perfil' con el token de autorización
                const { data } = await clienteAxios('/veterinarios/perfil', config)
                // Actualizar el estado de autenticación con los datos recibidos
                setAuth(data)
            } catch (error) {
                // En caso de error, imprimir el mensaje de error en la consola y establecer el estado de autenticación como un objeto vacío
                console.log(error.response.data.msg)
                setAuth({})
            }

            setCargando(false)

        }

        // Llamar a la función de autenticación al montar el componente
        autenticarUsuario()
    }, [])  // El segundo argumento [] indica que este efecto se ejecutará solo al montar el componente

    // Retornar el proveedor de contexto con el estado de autenticación y la función para actualizarlo
    return (
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

// Exportar el componente proveedor de autenticación como exportación principal
export {
    AuthProvider
}

// Exportar el contexto de autenticación como exportación secundaria
export default AuthContext
