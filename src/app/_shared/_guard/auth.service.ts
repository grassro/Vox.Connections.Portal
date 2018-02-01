import { Injectable, EventEmitter } from '@angular/core';
import { User } from '../../_models/user';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpService } from '../../_services/http.service';
import { ResponseContentType, RequestOptions } from '@angular/http';
import * as jwt from 'jwt-decode';
@Injectable()
export class AuthService {
  private roles: string[] = ['gestor', 'candidato', 'headhunter'];

  constructor(private http: HttpService) {
  }

  public autentication: EventEmitter<boolean> = new EventEmitter();

  login(user: User): Observable<boolean> {
    let body = {
      "Username": user.email,
      "Password": user.senha
    }

    let options = new RequestOptions();
    options.responseType = ResponseContentType.Text;
    return this.http.post('Token', JSON.stringify(body), options)
      .map(res => {
        if (res.status != 200) {
          return false;
        }
        let token = res.text()
        let decodedToken = jwt(token);
        let role = decodedToken.Perfil.toLowerCase();
        user.tipoUsuario = role == 'candidato' ? 1 : role == 'gestor' ? 3 : 2;
        user.nome = decodedToken.sub;
        user.idUsuario = decodedToken.IdUsuario;
        user.id = +decodedToken.IdPerfil;
        localStorage.setItem('appcurrentuser', JSON.stringify({
          user: user,
          token: token
        }));
        this.autentication.emit(true);

        return true;
      })
      .catch(this.http.handleError);
  }

  logout() {
    localStorage.removeItem('appcurrentuser');
    this.autentication.emit(false);
  }

  isAuthenticated(): boolean {
    if (localStorage.getItem('appcurrentuser')) {
      let data = JSON.parse(localStorage.getItem('appcurrentuser'));
      if (data.token) {
        return true;
      }
    }
    return false;
  }

  private getLoggedUser(): User {
    let d1 = JSON.parse(localStorage.getItem('appcurrentuser'));
    if (!d1 || !d1.user)
      return null;
    
    return <User>d1.user;
  }

  hasRole(roles: string[]): boolean {
    if (this.isAuthenticated()) {
      let data = JSON.parse(localStorage.getItem('appcurrentuser'));
      let role = roles.find(v => v == '*' || v == this.getUserTipo(data.user.tipoUsuario));
      if (role) {
        return true;
      }
    }

    return false;
  }

  getUserName(): string {
    if (this.isAuthenticated()) {
      let data = JSON.parse(localStorage.getItem('appcurrentuser'));
      return data.user.nome;
    }

    return '';
  }

  getUserId(): string {
    if (this.isAuthenticated()) {
      let data = JSON.parse(localStorage.getItem('appcurrentuser'));
      return data.user.idUsuario;
    }

    return '';
  }

  getUserIdIdentificador(): number {
    if (this.isAuthenticated()) {
      return this.getLoggedUser().id;
    }

    return 0;
  }

  getInitialPage(): string {
    if (this.hasRole(['headhunter'])) {
      return '/vaga';
    }

    return '/';
  }

  getUserTipo(tipo: number) {
    return tipo == 3 ? 'gestor' : tipo == 2 ? 'headhunter' : 'candidato';
  }
}