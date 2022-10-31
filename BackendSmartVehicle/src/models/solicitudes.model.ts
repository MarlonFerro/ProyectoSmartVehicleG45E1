import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Vehiculos} from './vehiculos.model';

@model()
export class Solicitudes extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  tipoSolicitud: string;

  @property({
    type: 'date',
  })
  fechaInicioAlquiler: string;

  @property({
    type: 'date',
  })
  fechaFinAlquiler?: string;

  @property({
    type: 'date',
  })
  fechaVenta?: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @belongsTo(() => Vehiculos)
  vehiculosId: string;

  constructor(data?: Partial<Solicitudes>) {
    super(data);
  }
}

export interface SolicitudesRelations {
  // describe navigational properties here
}

export type SolicitudesWithRelations = Solicitudes & SolicitudesRelations;
