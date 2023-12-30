import nodemailer from 'nodemailer';

const emailOlvidePassword = async (datos) => {
    var transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

      const { email, nombre, token } = datos;

      const info = await transporter.sendMail({
            from: 'APV - Administrador de Pacientes de Veterinaria',
            to: email,
            subject: 'Restablece tu Password',
            text: 'Restablece tu Password',
            html: `
            <!DOCTYPE html>
            <html lang="es">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Correo Guay</title>
                <style>
                    body {
                        font-family: 'Arial', sans-serif;
                        background-color: #f4f4f4;
                        color: #333;
                        margin: 0;
                        padding: 0;
                    }
            
                    .container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        background-color: #fff;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        border-radius: 5px;
                        margin-top: 20px;
                    }
            
                    h1 {
                        color: #333;
                    }
            
                    p {
                        line-height: 1.6em;
                    }
            
                    a {
                        color: #007bff;
                        text-decoration: none;
                    }
            
                    a:hover {
                        text-decoration: underline;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>¡Hola, ${nombre}!</h1>
                    <p>Has solicitado reestablecer tu password APV.</p>
                    <p>Sigue el siguiente enlace para generar un nuevo Password.</p>
                    <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Reestablecer cuenta.</a>
                    <p>Si no creaste esta cuenta, puedes ignorar este mensaje.</p>
                </div>
            </body>
            </html>
            `
      });

      console.log('Mensaje enviado: %s', info.messageId);
};

export default emailOlvidePassword;