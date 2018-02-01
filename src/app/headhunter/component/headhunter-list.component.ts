import { Component, OnInit, AfterViewInit } from '@angular/core';

import { AppService } from '../../app.service';

import { Headhunter } from '../headhunter';
import { HeadhunterService } from '../service/headhunter.service';

import * as $ from 'jquery';
import '../../../assets/js/datatables/js/jquery.dataTables.js';

@Component({
  selector: 'headhunter-list',
  templateUrl: './headhunter-list.component.html',
  styleUrls: ['./headhunter-list.component.css']
})
export class HeadhunterListComponent implements OnInit {

  list: Headhunter[] = [];
  _tableList: any;
  _tableListConfig: any;

  constructor(private app: AppService, private service: HeadhunterService) { }

  ngOnInit() {
    this._tableListConfig = this.app.getDataTableConfig();
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
