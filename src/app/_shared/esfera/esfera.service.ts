import { Injectable } from '@angular/core';
import { Esfera } from './esfera';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class EsferaService {

  constructor() { }

  list: Esfera[] = [
    { descricao: 'Artes, Entretenimento e Esportes' },
    { descricao: 'Economia e Negócios' },
    { descricao: 'Educação e Ciências' },
    { descricao: 'Família' },
    { descricao: 'Governo e Política' },
    { descricao: 'Mídia e Comunicação' },
    { descricao: 'Igreja' }
  ];

  getAll(): Observable<Esfera[]> {
    return of(this.list);
  }
}
