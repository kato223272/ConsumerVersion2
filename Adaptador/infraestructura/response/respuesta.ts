import amqp from "amqplib";
import axios from "axios";
import { MensajeControlador } from "../helper/Notificacion";

export class MensajeQueueAdapter {
    constructor(private mensajeControlador: MensajeControlador) {}

    async conectarYEscuchar() {
        const connection = await amqp.connect('amqp://Kato:kato@34.231.168.155');
        const channel = await connection.createChannel();

        const exchange = 'colaKato'; // Nombre del exchange al que apunta
        await channel.assertExchange(exchange, 'direct', { durable: true });

        const queueName = 'kato'; // Busca la cola a la que apunta el exchange
        const queue = await channel.assertQueue(queueName, { exclusive: false });
        await channel.bindQueue(queue.queue, exchange, 'kato');

        console.log('Escuchando eventos de RabbitMQ');

        channel.consume(queue.queue, async (mensaje) => {
            if (mensaje !== null) {
                console.log(`Mensaje recibido de RabbitMQ: ${mensaje.content.toString()}`);
                
                // Enviar el mensaje a través de una solicitud POST a una API externa
                const id = mensaje.content.toString();
                try {
                    const idNumber = Number(id);
                    if (!isNaN(idNumber)) {
                        const response = await axios.post('https://katoapi2.onrender.com/mensaje', { id: idNumber });
                        console.log("Respuesta de la API externa:", response.data);
                    } else {
                        console.error("El mensaje no es un número válido:", id);
                    }
                } catch (error) {
                    console.error("Error al enviar el mensaje a la API externa:", error);
                }
            }
        }, { noAck: true });
    }
}
