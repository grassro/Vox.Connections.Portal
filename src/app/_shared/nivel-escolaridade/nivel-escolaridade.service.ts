import { Injectable } from '@angular/core';
import { NivelEscolaridade } from './nivel-escolaridade';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class NivelEscolaridadeService {

  constructor() { }

  list: NivelEscolaridade[] = [
    { descricao: 'Ensino Médio Completo' },
    { descricao: 'Ensino Técnico Cursando' },
    { descricao: 'Ensino Técnico Completo' },
    { descricao: 'Ensino Superior Cursando' },
    { descricao: 'Ensino Superior Completo' },
    { descricao: 'MBA Cursando' },
    { descricao: 'MBA Completo' },
    { descricao: 'Mestrado' },
    { descricao: 'Doutorado' }
  ];

  getAll(): Observable<NivelEscolaridade[]> {
    return of(this.list);
  }
}
