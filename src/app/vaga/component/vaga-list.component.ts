import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { AppService } from '../../app.service';

import { VagaService } from '../service/vaga.service';
import { Vaga } from '../vaga';

import * as $ from 'jquery';
import '../../../assets/js/datatables/js/jquery.dataTables.js';
import { AlertService } from '../../_services/alert.service';
import { AuthService } from '../../_shared/_guard/auth.service';

@Component({
  selector: 'vaga-list',
  templateUrl: './vaga-list.component.html',
  styleUrls: ['./vaga-list.component.css']
})
export class VagaListComponent implements OnInit {
  loading = false;
  showSearch = false;
  showParameters = false;
  searchLoaded = false;
  list: Vaga[] = [];
  searchForm: FormGroup;
  _tableList: any;
  _tableListConfig: any;
  constructor(
    private app: AppService,
    private service: VagaService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private alert: AlertService,
    private authService : AuthService
  ) {
    this.searchForm = this.formBuilder.group(
      {
        'areaAtuacao': [''],
        'nivelEscolaridade': [''],
        'idioma': [''],
        'tipoContratacao': [''],
        'nivelFuncao': ['']
      });
  }

  ngOnInit() {
    this._tableListConfig = this.app.getDataTableConfig();
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
          && params.tipoContratacao != undefined
          && params.nivelFuncao != undefined
        ) {
          this.service.search(
            params.areaAtuacao,
            params.nivelEscolaridade,
            params.idioma,
            params.tipoContratacao,
            params.nivelFuncao
          )
            .subscribe(o => {
              this.list = o;
              this.searchLoaded = true;
              this.showParameters = false;
            },
            () => { },
            () => {
              setTimeout(this.createTableList, 300);
            });
        }
        else {
          this.searchLoaded = false;
          this.showParameters = true;
        }
      });
    }
    else {
      this.service.getAllCreatedByMe(this.authService.getUserIdIdentificador())
        .subscribe(obj => {
          this.list = obj;
        },
        () => { },
        () => {
          setTimeout(this.createTableList, 300);
        });
    }
  }

  createTableList() {
    if (this._tableList)
      this._tableList.fnDestroy();
    this._tableList = $('#tableList').dataTable({
      "oLanguage": { "sUrl": "//cdn.datatables.net/plug-ins/1.10.12/i18n/Portuguese-Brasil.json" }
    });
  }

  ngOnDestroy() {
    if (this._tableList)
      this._tableList.fnDestroy();
  }

  ngAfterViewInit() {
  }

  search() {
    this.router.navigate(
      [
        '/vaga/search',
        {
          'areaAtuacao': this.searchForm.controls['areaAtuacao'].value,
          'nivelEscolaridade': this.searchForm.controls['nivelEscolaridade'].value,
          'idioma': this.searchForm.controls['idioma'].value,
          'tipoContratacao': this.searchForm.controls['tipoContratacao'].value,
          'nivelFuncao': this.searchForm.controls['nivelFuncao'].value
        }
      ]
    );
  }

  returnSearchForm() {
    this.router.navigateByUrl('/vaga/search');
    return false;
  }

  podeCandidatar(item: Vaga) {
    return this.service.checkPodeCandidatar(item);
  }

  podeEncerrar(item: Vaga) {
    return this.service.checkPodeEncerrar(item, this.authService.getUserIdIdentificador());;
  }

  candidatar(item: Vaga) {
    this.service.candidatar(item, this.authService.getUserId())
      .subscribe(obj => {
        item = obj;
        this.alert.success("Você se candidatou a vaga " + item.titulo + " com sucesso");
      },
      err => { this.alert.error("Houve um erro ao se candidatar a vaga " + item.titulo + ", tente novamente"); }
      );
    return false;
  }

  encerrar(item: Vaga) {
    this.service.encerrar(item)
      .subscribe(obj => {
        item = obj;
        this.alert.error("A vaga " + item.titulo + " foi encerrada");
      },
      err => { this.alert.error("Houve um erro ao se candidatar a vaga, tente novamente"); }
      );
    return false;
  }
}
