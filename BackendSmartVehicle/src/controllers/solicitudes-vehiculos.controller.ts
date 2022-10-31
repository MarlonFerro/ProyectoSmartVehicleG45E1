import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Solicitudes,
  Vehiculos,
} from '../models';
import {SolicitudesRepository} from '../repositories';

export class SolicitudesVehiculosController {
  constructor(
    @repository(SolicitudesRepository)
    public solicitudesRepository: SolicitudesRepository,
  ) { }

  @get('/solicitudes/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Vehiculos belonging to Solicitudes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculos)},
          },
        },
      },
    },
  })
  async getVehiculos(
    @param.path.string('id') id: typeof Solicitudes.prototype.id,
  ): Promise<Vehiculos> {
    return this.solicitudesRepository.vehiculos(id);
  }
}
