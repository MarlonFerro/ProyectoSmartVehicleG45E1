import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Vehiculos,
  Solicitudes,
} from '../models';
import {VehiculosRepository} from '../repositories';

export class VehiculosSolicitudesController {
  constructor(
    @repository(VehiculosRepository) protected vehiculosRepository: VehiculosRepository,
  ) { }

  @get('/vehiculos/{id}/solicitudes', {
    responses: {
      '200': {
        description: 'Array of Vehiculos has many Solicitudes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Solicitudes)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Solicitudes>,
  ): Promise<Solicitudes[]> {
    return this.vehiculosRepository.solicitudes(id).find(filter);
  }

  @post('/vehiculos/{id}/solicitudes', {
    responses: {
      '200': {
        description: 'Vehiculos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Solicitudes)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Vehiculos.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitudes, {
            title: 'NewSolicitudesInVehiculos',
            exclude: ['id'],
            optional: ['vehiculosId']
          }),
        },
      },
    }) solicitudes: Omit<Solicitudes, 'id'>,
  ): Promise<Solicitudes> {
    return this.vehiculosRepository.solicitudes(id).create(solicitudes);
  }

  @patch('/vehiculos/{id}/solicitudes', {
    responses: {
      '200': {
        description: 'Vehiculos.Solicitudes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Solicitudes, {partial: true}),
        },
      },
    })
    solicitudes: Partial<Solicitudes>,
    @param.query.object('where', getWhereSchemaFor(Solicitudes)) where?: Where<Solicitudes>,
  ): Promise<Count> {
    return this.vehiculosRepository.solicitudes(id).patch(solicitudes, where);
  }

  @del('/vehiculos/{id}/solicitudes', {
    responses: {
      '200': {
        description: 'Vehiculos.Solicitudes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Solicitudes)) where?: Where<Solicitudes>,
  ): Promise<Count> {
    return this.vehiculosRepository.solicitudes(id).delete(where);
  }
}
