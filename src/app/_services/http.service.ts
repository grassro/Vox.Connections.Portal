import { Injectable, EventEmitter } from '@angular/core';
import {
  Http,
  RequestOptions,
  RequestOptionsArgs,
  Response,
  Request,
  Headers,
  XHRBackend,
  ResponseContentType
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ObservableInput } from 'rxjs/Observable';
import { Router } from '@angular/router';
@Injectable()
export class HttpService extends Http {

  private DEFAULT_URL = 'http://localhost:7083/api/';
  private VAGA_URL = 'http://localhost:56436/api/';
  private TOKEN_URL = 'http://localhost:27495/api/';
  constructor(
    backend: XHRBackend,
    defaultOptions: RequestOptions,
    private route: Router
  ) {
    super(backend, defaultOptions);
  }
  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    if (typeof url !== 'string') {
      url.headers.set('Content-Type', 'application/json');
      url.headers.set('Cache-Control', 'no-cache');

      let data = JSON.parse(localStorage.getItem('appcurrentuser'));
      if (data != null && data.token) {
        url.headers.set('Authorization', `Bearer ${data.token}`);
      }
    }
    return super.request(this.getFullUrl(url), options).catch(this.catchAuthError(this));
  }
  private getFullUrl(url: string | Request): string | Request {
    let prefixUrl: string = '';
    if (typeof url === 'string') {
      prefixUrl = url.toLowerCase().indexOf('vagas/') >= 0 ? this.VAGA_URL : this.DEFAULT_URL;
      prefixUrl = url.toLowerCase().indexOf('token') >= 0 ? this.TOKEN_URL : prefixUrl;
      return prefixUrl + url;
    }
    else {
      prefixUrl = url.url.toLowerCase().indexOf('vagas/') >= 0 ? this.VAGA_URL : this.DEFAULT_URL;

      if (url.url.toLowerCase().indexOf('token') >= 0) {
        prefixUrl = this.TOKEN_URL;
      }
      url.url = prefixUrl + url.url;
    }
    return url;
  }

  private catchAuthError(self: HttpService) {
    return (res: Response) => {
      if (res.status === 401 || res.status === 403) {
        this.route.navigate(['/logout']);
      }

      return Observable.throw(res);
    };
  }

  public handleError(error: any, caught: Observable<any>): ObservableInput<any> {
    return Observable.throw(error.json().error || 'Server error');
  }
}
