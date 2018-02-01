import { Injectable } from '@angular/core';
import { AreaExecutiva } from './area-executiva';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class AreaExecutivaService {

  constructor() { }

  list: AreaExecutiva[] = [
    { descricao: 'Apoio' },
    { descricao: 'Arrumação' },
    { descricao: 'Cozinha' },
    { descricao: 'Estacionamento' },
    { descricao: 'Fotografia' },
    { descricao: 'Iluminação' },
    { descricao: 'Mídias' },
    { descricao: 'Projeção' },
    { descricao: 'Recepção' },
    { descricao: 'Shaba Store' },
    { descricao: 'Som' },
    { descricao: 'Vídeo' }
  ];

  getAll(): Observable<AreaExecutiva[]> {
    return of(this.list);
  }
}
