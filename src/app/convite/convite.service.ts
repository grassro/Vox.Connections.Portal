import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

import { Convite } from './convite';
import { HttpService } from '../_services/http.service';
import { Headers } from '@angular/http';

@Injectable()
export class ConviteService {
  constructor(private http: HttpService) {
   }

  send(tipo: string, convites: Convite[]): Observable<boolean> {
    let bodyArray: Array<{ nome: string, email: string, tipoUsuario: number }> = [];
    let tipoUsuario = tipo === "CONVIDADO" ? 1 : tipo === "GESTOR" ? 3 : 3;
    convites.forEach(i => {
      bodyArray.push({ nome: i.nome, email: i.email, tipoUsuario: tipoUsuario });
    });
    
    return this.http.post('Usuario/Criar', bodyArray)
      .map(resp => {
        return true;
      })
      .catch(this.http.handleError);
  };
}
