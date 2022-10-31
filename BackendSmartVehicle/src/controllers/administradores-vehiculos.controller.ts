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
  Administradores,
  Vehiculos,
} from '../models';
import {AdministradoresRepository} from '../repositories';

export class AdministradoresVehiculosController {
  constructor(
    @repository(AdministradoresRepository) protected administradoresRepository: AdministradoresRepository,
  ) { }

  @get('/administradores/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Array of Administradores has many Vehiculos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Vehiculos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Vehiculos>,
  ): Promise<Vehiculos[]> {
    return this.administradoresRepository.vehiculos(id).find(filter);
  }

  @post('/administradores/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Administradores model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Administradores.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculos, {
            title: 'NewVehiculosInAdministradores',
            exclude: ['id'],
            optional: ['administradoresId']
          }),
        },
      },
    }) vehiculos: Omit<Vehiculos, 'id'>,
  ): Promise<Vehiculos> {
    return this.administradoresRepository.vehiculos(id).create(vehiculos);
  }

  @patch('/administradores/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Administradores.Vehiculos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculos, {partial: true}),
        },
      },
    })
    vehiculos: Partial<Vehiculos>,
    @param.query.object('where', getWhereSchemaFor(Vehiculos)) where?: Where<Vehiculos>,
  ): Promise<Count> {
    return this.administradoresRepository.vehiculos(id).patch(vehiculos, where);
  }

  @del('/administradores/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Administradores.Vehiculos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vehiculos)) where?: Where<Vehiculos>,
  ): Promise<Count> {
    return this.administradoresRepository.vehiculos(id).delete(where);
  }
}
