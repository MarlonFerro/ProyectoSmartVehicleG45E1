import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Administradores} from '../models';
import {AdministradoresRepository} from '../repositories';

export class AdministradoresController {
  constructor(
    @repository(AdministradoresRepository)
    public administradoresRepository : AdministradoresRepository,
  ) {}

  @post('/administradores')
  @response(200, {
    description: 'Administradores model instance',
    content: {'application/json': {schema: getModelSchemaRef(Administradores)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Administradores, {
            title: 'NewAdministradores',
            exclude: ['id'],
          }),
        },
      },
    })
    administradores: Omit<Administradores, 'id'>,
  ): Promise<Administradores> {
    return this.administradoresRepository.create(administradores);
  }

  @get('/administradores/count')
  @response(200, {
    description: 'Administradores model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Administradores) where?: Where<Administradores>,
  ): Promise<Count> {
    return this.administradoresRepository.count(where);
  }

  @get('/administradores')
  @response(200, {
    description: 'Array of Administradores model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Administradores, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Administradores) filter?: Filter<Administradores>,
  ): Promise<Administradores[]> {
    return this.administradoresRepository.find(filter);
  }

  @patch('/administradores')
  @response(200, {
    description: 'Administradores PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Administradores, {partial: true}),
        },
      },
    })
    administradores: Administradores,
    @param.where(Administradores) where?: Where<Administradores>,
  ): Promise<Count> {
    return this.administradoresRepository.updateAll(administradores, where);
  }

  @get('/administradores/{id}')
  @response(200, {
    description: 'Administradores model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Administradores, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Administradores, {exclude: 'where'}) filter?: FilterExcludingWhere<Administradores>
  ): Promise<Administradores> {
    return this.administradoresRepository.findById(id, filter);
  }

  @patch('/administradores/{id}')
  @response(204, {
    description: 'Administradores PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Administradores, {partial: true}),
        },
      },
    })
    administradores: Administradores,
  ): Promise<void> {
    await this.administradoresRepository.updateById(id, administradores);
  }

  @put('/administradores/{id}')
  @response(204, {
    description: 'Administradores PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() administradores: Administradores,
  ): Promise<void> {
    await this.administradoresRepository.replaceById(id, administradores);
  }

  @del('/administradores/{id}')
  @response(204, {
    description: 'Administradores DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.administradoresRepository.deleteById(id);
  }
}
