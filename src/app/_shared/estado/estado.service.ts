import { Injectable } from '@angular/core';
import { Estado } from './estado';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class EstadoService {

  constructor() { }

  list: Estado[] = [
    { descricao: 'AC' },
    { descricao: 'AL' },
    { descricao: 'AM' },
    { descricao: 'AP' },
    { descricao: 'BA' },
    { descricao: 'CE' },
    { descricao: 'DF' },
    { descricao: 'ES' },
    { descricao: 'GO' },
    { descricao: 'MA' },
    { descricao: 'MG' },
    { descricao: 'MS' },
    { descricao: 'MT' },
    { descricao: 'PA' },
    { descricao: 'PB' },
    { descricao: 'PE' },
    { descricao: 'PI' },
    { descricao: 'PR' },
    { descricao: 'RJ' },
    { descricao: 'RN' },
    { descricao: 'RO' },
    { descricao: 'RR' },
    { descricao: 'RS' },
    { descricao: 'SC' },
    { descricao: 'SE' },
    { descricao: 'SP' },
    { descricao: 'TO' }
  ];

  getAll(): Observable<Estado[]> {
    return of(this.list);
  }
}
