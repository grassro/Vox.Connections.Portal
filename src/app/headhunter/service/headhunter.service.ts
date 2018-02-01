import { Injectable } from '@angular/core';
import { Headhunter } from '../headhunter';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { delay } from 'q';
import { HttpService } from '../../_services/http.service';

@Injectable()
export class HeadhunterService {
  // private OBJECTS: Headhunter[] = [
  //   { nome: 'André Alberto Gattini', empresa: 'Empresa AAAAAA', celular: '(11) 96717-5012', telefone: '(11) 3687-0818', email: 'andre_gattini@hotmail.com', id: 1 },
  //   { nome: 'Alberto André Gattini', empresa: 'Empresa AAAAAA', celular: '(11) 96717-5012', telefone: '(11) 3687-0818', email: 'andre_gattini@hotmail.com', id: 2 },
  //   { nome: 'Alberto Gattini André', empresa: 'Empresa BBBBBB', celular: '(11) 96717-5012', telefone: '(11) 3687-0818', email: 'andre_gattini@hotmail.com', id: 3 },
  //   { nome: 'Gattini André Alberto', empresa: 'Empresa ZZZZZZ', celular: '(11) 96717-5012', telefone: '(11) 3687-0818', email: 'andre_gattini@hotmail.com', id: 4 }
  // ];

  constructor(private http: HttpService) {
  }

  getAll(): Observable<Headhunter[]> {
    return this.http.get('Headhunter/Listar')
      .map(res => {
        console.log(res.json());
        return res.json();
      })
      .catch(() => { return of([]) });
  }

  getById(id: number): Observable<Headhunter> {
    return this.http.get(`Headhunter/Consultar/${id}`)
      .map(res => {
        return res.json();
      })
      .catch(() => { return of(null) });
  }

  create(object: Headhunter, senha: string): Observable<Headhunter> {
    let body = {
      headhunter: {
        nome: object.nome,
        email: object.email,
        celular: object.celular,
        empresa: object.empresa,
        idUsuario: object.idUsuario
      },
      senha: senha
    }
    return this.http.post(`Headhunter/Criar`, body)
      .map(resp => {
        return object;
      })
      .catch(this.http.handleError);
  };

  update(obj: Headhunter): Observable<Headhunter> {
    let body = {
      headhunter: obj
    };
    return this.http.patch('Headhunter/Alterar', body).map(res => {
      return obj;
    })
      .catch(this.http.handleError);
    // let old: Headhunter = this.OBJECTS.find(o => o.id === object.id);
    // this.OBJECTS[this.OBJECTS.indexOf(old)] = object;
  };

}
