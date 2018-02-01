import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { AppService } from '../../app.service';

import { GestorService } from '../service/gestor.service';
import { Gestor } from '../gestor';

import * as $ from 'jquery';
import '../../../assets/js/datatables/js/jquery.dataTables.js';

@Component({
  selector: 'gestor-list',
  templateUrl: './gestor-list.component.html',
  styleUrls: ['./gestor-list.component.css']
})
export class GestorListComponent implements OnInit {
  loading = false;
  list: Gestor[] = [];
  _tableList: any;
  _tableListConfig: any;

  constructor(
    private app: AppService,
    private service: GestorService
  ) { }

  ngOnInit() {
    this._tableListConfig = this.app.getDataTableConfig([null, null, null, null]);
    this.service.getAll()
      .subscribe(obj => {
        this.list = obj;
      }, 
      () => {}, 
      () => {
        setTimeout(this.createTableList, 300);
      });
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

  ngDestroy() {
    if (this._tableList)
      this._tableList.fnDestroy();
  }
}
