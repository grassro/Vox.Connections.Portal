import { Injectable } from '@angular/core';
import { NivelFuncao } from './nivel-funcao';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class NivelFuncaoService {

  constructor() { }

  list: NivelFuncao[] = [
    { descricao: 'Auxiliar/Operacional' },
    { descricao: 'Técnico' },
    { descricao: 'Estágio' },
    { descricao: 'Trainee' },
    { descricao: 'Junior' },
    { descricao: 'Pleno' },
    { descricao: 'Sênior' },
    { descricao: 'Expert' },
    { descricao: 'Coordenador/Supervisor' },
    { descricao: 'Gerente' },
    { descricao: 'Outros' }
  ];

  getAll(): Observable<NivelFuncao[]> {
    return of(this.list);
  }
}
