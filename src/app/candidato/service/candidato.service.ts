import { Injectable } from '@angular/core';
import { Candidato } from '../candidato';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { HttpService } from '../../_services/http.service';

@Injectable()
export class CandidatoService {

  constructor(private http: HttpService) {
   }

  create(obj: Candidato, curriculum: any, senha: string): Observable<Candidato> {
    obj.curriculo = {
      idCurriculo: 0,
      curriculumVitae: curriculum.value,
      fileNameCurriculumVitae: curriculum.fileName,
      fileTypeCurriculumVitae: curriculum.fileType,
    }
    let body = {
      candidato: obj,
      senha: senha
    }
    return this.http.post('Candidato/Criar', body).map(res => {
      return obj;
    })
      .catch(this.http.handleError);
  };

  update(obj: Candidato, curriculum: any): Observable<Candidato> {
    obj.curriculo = {
      idCurriculo: obj.curriculo.idCurriculo,
      curriculumVitae: curriculum.value,
      fileNameCurriculumVitae: curriculum.fileName,
      fileTypeCurriculumVitae: curriculum.fileType,
    }
    let body = {
      candidato: obj
    }
    return this.http.patch('Candidato/Alterar', body).map(res => {
      return obj;
    })
      .catch(this.http.handleError);
  }

  getAll(): Observable<Candidato[]> {
    return this.http.get('Candidato/Listar')
      .map(res => {
        return res.json();
      })
      .catch(() => { return of([]) });
  }

  getById(id): Observable<Candidato> {
    console.log(id);
    return this.http.get(`Candidato/Consultar/${id}`)
      .map(res => {
        return res.json();
      })
      .catch(() => { return of(null) });
  }

  search(
    areaAtuacao: string = '',
    nivelEscolaridade: string = '',
    idioma: string = '',
    areaInteresse: string = '',
    nivelFuncao: string = ''
  ): Observable<Candidato[]> {
    let body = {
      candidatoBusca: {
        "areaAtuacao": areaAtuacao,
        "nivelEscolaridade": nivelEscolaridade,
        "nivelFuncao": nivelFuncao,
        "areaInteresse": areaInteresse,
        "idioma": idioma
      }
    }
    return this.http.get('Candidato/Buscar',
      {
        body: body
      }).map(res => {
        console.log(res);
        console.log(res.json());
        return res.json();
      })
      .catch(() => { return of([]) });
  }

  getCurriculum(obj: Candidato) {
    return null;
  }
}
