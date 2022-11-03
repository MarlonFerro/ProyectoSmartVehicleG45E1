import {injectable, /* inject, */ BindingScope} from '@loopback/core';
import { repository } from '@loopback/repository';
import { validateRequestBody } from '@loopback/rest';
import { Llaves } from '../config/llaves';
import { Clientes } from '../models';
import { ClientesRepository } from '../repositories';
const generador = require("password-generator");
const cryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService {
  constructor(
    @repository(ClientesRepository)
    public ClientesRepository: ClientesRepository  
  ) {}

  /*
   * Add service methods here
   */

  GenerarClave(){
    let clave = generador(8, false);
    return clave;
  }
  CifrarClave(clave:string){
    let claveCifrada = cryptoJS.MD5(clave).toString();
    return claveCifrada;
  }

  IdentificarCliente(usuario: string, clave: string){
    try {
      let cli = this.ClientesRepository.findOne({where : {correo : usuario, clave : clave}});

      if (cli){
        return cli;
      }
      return false;
    } catch {
      return false;
    }
  }

  GenerarTokenJWT(cliente: Clientes){
    let token = jwt.sign(
      {
        data : {
          id : cliente.id,
          correo: cliente.correo,
          nombre: cliente.nombres + " " + cliente.apellidos
        }
      },Llaves.claveJWT);
      return token;
  }
  
  ValidarTokenJWT(token : string){
    try {
      let datos = jwt.verify(token, Llaves.claveJWT);
      return datos;
    } catch {
      return false;
    }


  
  }
}


