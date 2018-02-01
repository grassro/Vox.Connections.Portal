import { Injectable } from '@angular/core';
import { Vaga } from '../vaga';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpService } from '../../_services/http.service';
import { FormatUtils } from '../../_directives/format-utils';
import { jsonpFactory } from '@angular/http/src/http_module';
import { AuthService } from '../../_shared/_guard/auth.service';

@Injectable()
export class VagaService {
  private MAXPAGE: number = 5;
  private timeline: Vaga[];
  constructor(private http: HttpService,
    private authService: AuthService
  ) {
    this.timeline = [];
  }

  checkPodeEncerrar(item: Vaga, userIdIdentificador: number): boolean {
    return this.authService.hasRole(['headhunter']) && item.idHeadhunter === userIdIdentificador && item.ativo;
  }

  checkPodeCandidatar(item: Vaga): boolean {
    return item.ativo && !item.candidatou;
  }

  getAllCreatedByMe(useridVaga: number): Observable<Vaga[]> {
    return this.http.get('Vagas/Listar')
      .map(resp => {
        return resp.json();
      })
      .catch(this.http.handleError);
  }

  getById(idVaga: number): Observable<Vaga> {
    return this.http.get(`Vagas/Consultar/${idVaga}`)
      .map(resp => {
        return resp.json();
      })
      .catch(this.http.handleError);
  }

  search(
    areaAtuacao: string = '',
    nivelEscolaridade: string = '',
    idioma: string = '',
    tipoContratacao: string = '',
    nivelFuncao: string = ''
  ): Observable<Vaga[]> {
    let body = {
      vagas: {
        "areaAtuacao": areaAtuacao,
        "nivelEscolaridade": nivelEscolaridade,
        "nivelFuncao": nivelFuncao,
        "tipoContratacao": tipoContratacao,
        "idioma": idioma
      }
    }
    return this.http.post('Vagas/Buscar', body).map(res => {
      return res.json();
    })
      .catch(() => { return of([]) });
  }

  create(object: Vaga): Observable<Vaga> {
    object.data = new Date();
    let body = {
      vaga: object
    }
    return this.http.post('Vagas/Criar', body)
      .map(res => {
        return object;
      })
      .catch(this.http.handleError);
  };

  candidatar(object: Vaga, userId: string): Observable<Vaga> {
    let body = {
      idVaga: object.idVaga,
      idUsuario: userId
    };
    
    return this.http.post('Vagas/Candidatar', body)
      .map(res => {
        if (res.status == 200)
          object.candidatou = true;
        return object;
      })
      .catch(this.http.handleError);
  };

  encerrar(object: Vaga): Observable<Vaga> {
    return this.http.put(`Vagas/Encerrar/${object.idVaga}`, {})
      .map(res => {
        if (res.status == 200)
          object.ativo = false;
        return object;
      })
      .catch(this.http.handleError);
  };

  getTimelinePage(userId: string, pageNumber: number, pageSize: number, forceReload: boolean): Observable<Vaga[]> {
    let startIndex = pageNumber * pageSize;
    if (!forceReload && this.timeline && this.timeline.length > 0) {
      return of(this.timeline.slice(startIndex, startIndex + pageSize));
    }
    else {
      return this.http.get(`Vagas/Timeline/${userId}`)
        .map(res => {
          console.log(res);
          this.timeline = res.json();
          return this.timeline.slice(startIndex, startIndex + pageSize);
        })
        .catch(() => { return of([]) });
    }
  }
}
