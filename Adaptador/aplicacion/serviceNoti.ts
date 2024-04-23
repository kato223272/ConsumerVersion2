import { Notificacion } from "../dominio/Notificacion";

export class ProcesarMensaje {
  constructor() {}

  public async ejecutar(mensaje: Notificacion): Promise<void> {
    console.log('Procesando mensaje:', mensaje.contenido);

    try {
      const response = await fetch('https://super-bowl-api-2.onrender.com/users/user' , {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: {
            _id: "6620065d03034a56d4bd6eec",
            kit: {
              id: "b33d9c7d-c65b-4217-b944-9647a14c51ce",
              base64: mensaje.contenido // Base64 del mensaje
            }
          }
        })
      });

      if (!response.ok) {
        throw new Error('Error al enviar la solicitud');
        console.log(response);
      }

      const data = await response.json();
      console.log("Enviado:", data);
    } catch (error) {
      console.log("Error:", error);
    }
  }
}