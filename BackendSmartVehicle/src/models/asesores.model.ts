import {Entity, model, property, hasMany} from '@loopback/repository';
import {Vehiculos} from './vehiculos.model';

@model()
export class Asesores extends Entity {
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
  tipoDocumento: string;

  @property({
    type: 'string',
    required: true,
  })
  numeroDocumento: string;

  @property({
    type: 'string',
    required: true,
  })
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  celular: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;

  @hasMany(() => Vehiculos)
  vehiculos: Vehiculos[];

  constructor(data?: Partial<Asesores>) {
    super(data);
  }
}

export interface AsesoresRelations {
  // describe navigational properties here
}

export type AsesoresWithRelations = Asesores & AsesoresRelations;
