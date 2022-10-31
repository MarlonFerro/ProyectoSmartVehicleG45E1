import {Entity, model, property, hasMany} from '@loopback/repository';
import {Solicitudes} from './solicitudes.model';

@model()
export class Vehiculos extends Entity {
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
  tipoVehiculo: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @property({
    type: 'string',
    required: true,
  })
  marca: string;

  @property({
    type: 'string',
    required: true,
  })
  modelo: string;

  @property({
    type: 'number',
    required: true,
  })
  valorArriendo: number;

  @property({
    type: 'number',
    required: true,
  })
  valorVenta: number;

  @hasMany(() => Solicitudes)
  solicitudes: Solicitudes[];

  @property({
    type: 'string',
  })
  asesoresId?: string;

  @property({
    type: 'string',
  })
  administradoresId?: string;

  @property({
    type: 'string',
  })
  clientesId?: string;

  constructor(data?: Partial<Vehiculos>) {
    super(data);
  }
}

export interface VehiculosRelations {
  // describe navigational properties here
}

export type VehiculosWithRelations = Vehiculos & VehiculosRelations;
