import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Administradores, AdministradoresRelations, Vehiculos} from '../models';
import {VehiculosRepository} from './vehiculos.repository';

export class AdministradoresRepository extends DefaultCrudRepository<
  Administradores,
  typeof Administradores.prototype.id,
  AdministradoresRelations
> {

  public readonly vehiculos: HasManyRepositoryFactory<Vehiculos, typeof Administradores.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VehiculosRepository') protected vehiculosRepositoryGetter: Getter<VehiculosRepository>,
  ) {
    super(Administradores, dataSource);
    this.vehiculos = this.createHasManyRepositoryFactoryFor('vehiculos', vehiculosRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
  }
}
