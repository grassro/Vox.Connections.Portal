import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { User } from '../_models/user';
import { HttpService } from '../_services/http.service';

@Injectable()
export class UsuarioService {

  constructor(private http : HttpService) { }

  buscar(guid: string) : Observable<User>{
    return this.http.get(`Usuario/Buscar/${guid}`)
        .map(resp =>{
          console.log(resp);
          return resp.json();
        })
        .catch((error: any) => Observable.throw(error || 'Server error'));
  }
}
