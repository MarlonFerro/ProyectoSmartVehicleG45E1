import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Solicitudes, SolicitudesRelations, Vehiculos} from '../models';
import {VehiculosRepository} from './vehiculos.repository';

export class SolicitudesRepository extends DefaultCrudRepository<
  Solicitudes,
  typeof Solicitudes.prototype.id,
  SolicitudesRelations
> {

  public readonly vehiculos: BelongsToAccessor<Vehiculos, typeof Solicitudes.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('VehiculosRepository') protected vehiculosRepositoryGetter: Getter<VehiculosRepository>,
  ) {
    super(Solicitudes, dataSource);
    this.vehiculos = this.createBelongsToAccessorFor('vehiculos', vehiculosRepositoryGetter,);
    this.registerInclusionResolver('vehiculos', this.vehiculos.inclusionResolver);
  }
}
