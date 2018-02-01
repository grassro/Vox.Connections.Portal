import { Injectable } from '@angular/core';
import { Gestor } from '../gestor';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpService } from '../../_services/http.service';

@Injectable()
export class GestorService {

  constructor(private http: HttpService) {
  }

  create(obj: Gestor, curriculum: any, senha: string): Observable<Gestor> {
    obj.curriculo = {
      idCurriculo: 0,
      curriculumVitae: curriculum.value,
      fileNameCurriculumVitae: curriculum.fileName,
      fileTypeCurriculumVitae: curriculum.fileType,
    }
    let body = {
      gestor: obj,
      senha: senha
    }
    return this.http.post('Gestor/Criar', body).map(res => {
      return obj;
    })
      .catch(this.http.handleError);
  };

  update(obj: Gestor, curriculum: any): Observable<Gestor> {
    obj.curriculo = {
      idCurriculo: obj.curriculo.idCurriculo,
      curriculumVitae: curriculum.value,
      fileNameCurriculumVitae: curriculum.fileName,
      fileTypeCurriculumVitae: curriculum.fileType,
    }
    let body = {
      candidato: obj
    }
    return this.http.patch('Gestor/Alterar', body).map(res => {
      return obj;
    })
      .catch(this.http.handleError);
  }

  getAll(): Observable<Gestor[]> {
    return this.http.get('Gestor/Listar')
      .map(res => {
        return res.json();
      })
      .catch(() => {return of([])});
  }

  getById(id): Observable<Gestor> {
    return this.http.get(`Gestor/Consultar/${id}`)
      .map(res => {
        return res.json();
      })
      .catch(() => {return of(null)});
  }

  getByUserId(id): Observable<Gestor> {
    return this.http.get(`Gestor/ConsultarUsuario/${id}`)
      .map(res => {
        return res.json();
      })
      .catch(() => {return of(null)});
  }

  getCurriculum(obj: Gestor) {
    return null;
  }
}
