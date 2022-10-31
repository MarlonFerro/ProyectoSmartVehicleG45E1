import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Asesores, AsesoresRelations, Vehiculos} from '../models';
import {VehiculosRepository} from './vehiculos.repository';

export class AsesoresRepository extends DefaultCrudRepository<
  Asesores,
  typeof Asesores.prototype.id,
  AsesoresRelations
> {

  public readonly vehiculos: HasManyRepositoryFactory<Vehiculos, typeof Asesores.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VehiculosRepository') protected vehiculosRepositoryGetter: Getter<VehiculosRepository>,
  ) {
    super(Asesores, dataSource);
    this.vehiculos = this.createHasManyRepositoryFactoryFor('vehiculos', vehiculosRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
  }
}
