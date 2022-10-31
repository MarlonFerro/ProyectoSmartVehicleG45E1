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
  Clientes,
  Vehiculos,
} from '../models';
import {ClientesRepository} from '../repositories';

export class ClientesVehiculosController {
  constructor(
    @repository(ClientesRepository) protected clientesRepository: ClientesRepository,
  ) { }

  @get('/clientes/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Array of Clientes has many Vehiculos',
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
    return this.clientesRepository.vehiculos(id).find(filter);
  }

  @post('/clientes/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Clientes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Vehiculos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Clientes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Vehiculos, {
            title: 'NewVehiculosInClientes',
            exclude: ['id'],
            optional: ['clientesId']
          }),
        },
      },
    }) vehiculos: Omit<Vehiculos, 'id'>,
  ): Promise<Vehiculos> {
    return this.clientesRepository.vehiculos(id).create(vehiculos);
  }

  @patch('/clientes/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Clientes.Vehiculos PATCH success count',
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
    return this.clientesRepository.vehiculos(id).patch(vehiculos, where);
  }

  @del('/clientes/{id}/vehiculos', {
    responses: {
      '200': {
        description: 'Clientes.Vehiculos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Vehiculos)) where?: Where<Vehiculos>,
  ): Promise<Count> {
    return this.clientesRepository.vehiculos(id).delete(where);
  }
}
