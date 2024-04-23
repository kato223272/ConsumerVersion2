import { MensajeControlador } from "../helper/Notificacion";
import { ProcesarMensaje } from '../../aplicacion/serviceNoti';
import { MensajeQueueAdapter } from '../response/respuesta';

export const procesarMensaje = new ProcesarMensaje();
export const mensajeControlador = new MensajeControlador(procesarMensaje);

const mensajeQueueAdapter = new MensajeQueueAdapter(mensajeControlador);