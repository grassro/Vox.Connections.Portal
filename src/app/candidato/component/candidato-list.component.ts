import { Component, OnInit, AfterViewInit, AfterViewChecked } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AppService } from '../../app.service';

import { Candidato } from '../candidato';
import { CandidatoService } from '../service/candidato.service';

import * as $ from 'jquery';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'candidato-list',
  templateUrl: './candidato-list.component.html',
  styleUrls: ['./candidato-list.component.css']
})
export class CandidatoListComponent implements OnInit {
  loading = false;
  list: Candidato[] = [];
  showSearch = false;
  showParameters = false;
  searchLoaded = false;
  searchForm: FormGroup;
  _tableList: any;
  _tableListConfig : any;
  constructor(
    private app: AppService,
    private service: CandidatoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
    this.searchForm = this.formBuilder.group(
      {
        'areaAtuacao': [''],
        'nivelEscolaridade': [''],
        'idioma': [''],
        'areaInteresse': [''],
        'nivelFuncao': ['']
      });
  }

  ngOnInit() {
    this._tableListConfig = this.app.getDataTableConfig([null, null, null, null]);
    if (this.route.snapshot.data['search']) {
      this.showSearch = true;
      this.showParameters = this.showSearch;
    }
    else {
      this.showSearch = false;
    }

    if (this.showSearch) {
      this.route.params.subscribe(params => {
        if (params.areaAtuacao != undefined
          && params.nivelEscolaridade != undefined
          && params.idioma != undefined
          && params.areaInteresse != undefined
          && params.nivelFuncao != undefined
        ) {
          this.service.search(
            params.areaAtuacao,
            params.nivelEscolaridade,
            params.idioma,
            params.areaInteresse,
            params.nivelFuncao
          )
            .subscribe(o => {
              this.list = o;
              this.searchLoaded = true;
              this.showParameters = false;
            }, 
            () => {}, 
            () => {
              setTimeout(this.createTableList, 100);
            });
        }
        else {
          this.searchLoaded = false;
          this.showParameters = true;
        }
      });
    }
    else {
      this.service.getAll()
        .subscribe(obj => {
          this.list = obj
          this.searchLoaded = true;
          this.showParameters = false;
        }, 
        () => {}, 
        () => {
          setTimeout(this.createTableList, 100);
        });
    }
  }
  
  ngOnDestroy() {
    this.destroyTableList();
  }

  destroyTableList() {
    if (this._tableList)
      this._tableList.fnDestroy();
  }

  createTableList() {
    if (this._tableList)
      this._tableList.fnDestroy();
      this._tableList = $('#tableList').dataTable({
        "oLanguage": { "sUrl": "//cdn.datatables.net/plug-ins/1.10.12/i18n/Portuguese-Brasil.json" }
      });
  }

  ngAfterViewInit() {
  }

  search() {
    this.router.navigate(
      [
        '/candidato/search',
        {
          'areaAtuacao': this.searchForm.controls['areaAtuacao'].value,
          'nivelEscolaridade': this.searchForm.controls['nivelEscolaridade'].value,
          'idioma': this.searchForm.controls['idioma'].value,
          'areaInteresse': this.searchForm.controls['areaInteresse'].value,
          'nivelFuncao': this.searchForm.controls['nivelFuncao'].value
        }
      ]
    );
  }

  showSearchForm() {
    this.router.navigateByUrl('/candidato/search');
    return false;
  }

}
