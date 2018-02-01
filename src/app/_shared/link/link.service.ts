import { Injectable } from '@angular/core';
import { Link } from './link';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';

@Injectable()
export class LinkService {

  constructor() { }

  list: Link[] = [
    { descricao: 'Link Bela Vista' },
    { descricao: 'Link Brooklin' },
    { descricao: 'Link Jardins' },
    { descricao: 'Link Morumbi (Monte Kemel)' },
    { descricao: 'Link Morumbi (Panamby)' },
    { descricao: 'Link Morumbi (Vila Andrade)' },
    { descricao: 'Link Morumbi (Vila Andrade 2)' },
    { descricao: 'Link Morumbi (Vila Andrade 3)' },
    { descricao: 'Link Morumbi (Vila Andrade 4)' },
    { descricao: 'Link Morumbi VOX (Vila Sônia)' },
    { descricao: 'Link Morumbi (Vila Sônia 2)' },
    { descricao: 'Link Morumbi (Vila Sônia 3)' },
    { descricao: 'Link Perdizes' },
    { descricao: 'Link Taboão da Serra' },
    { descricao: 'Link VOX Vila Mariana' },
    { descricao: 'Link VOX Vila Sofia' },
    { descricao: 'Link VOX Vila Olimpia' },
    { descricao: 'Link Alto de Pinheiros' },
    { descricao: 'Link Campo Belo' },
    { descricao: 'Link Casa Verde' },
    { descricao: 'Link Interlagos' },
    { descricao: 'Link Morumbi (Vila Progredior)' },
    { descricao: 'Link Morumbi (Vila Sônia 2)' },
    { descricao: 'Link Morumbi VOX (Vila Sonia 3)' },
    { descricao: 'Link Morumbi (Vila Suzana)' },
    { descricao: 'Link Rio Pequeno' },
    { descricao: 'Link VOX Moema' },
    { descricao: 'Link VOX Vila Buarque' },
    { descricao: 'Link Morumbi (Vila Andrade)' },
    { descricao: 'Link Vila Formosa' },
    { descricao: 'Link VOX Vila Sonia' },
    { descricao: 'Link VOX Interlagos' },
    { descricao: 'Link Morumbi (Vila Andrade)' },
    { descricao: 'Link VOX Morumbi (Vila Andrade)' }
  ];

  getAll(): Observable<Link[]> {
    return of(this.list);
  }
}
