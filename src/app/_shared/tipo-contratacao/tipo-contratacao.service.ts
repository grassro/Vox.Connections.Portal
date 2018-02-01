import { Injectable } from '@angular/core';
import { TipoContratacao } from './tipo-contratacao';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class TipoContratacaoService {

  constructor() { }

  list: TipoContratacao[] = [
    { descricao: 'Contrato' },
    { descricao: 'CLT Full' },
    { descricao: 'CLT Flex' },
    { descricao: 'PJ' },
    { descricao: 'Outros' }
  ];

  getAll(): Observable<TipoContratacao[]> {
    return of(this.list);
  }
}
