import { Notificacion } from '../../dominio/Notificacion';
import { ProcesarMensaje } from '../../aplicacion/serviceNoti';

export class MensajeControlador {
  constructor(private procesarMensaje: ProcesarMensaje) {}

  public async recibirMensaje(contenido: string): Promise<void> {
    await this.procesarMensaje.ejecutar(new Notificacion(contenido));
  }
}