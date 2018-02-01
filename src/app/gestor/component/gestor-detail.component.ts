import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import 'rxjs/Rx';

import { AlertService } from '../../_services/alert.service';
import {FormatUtils} from '../../_directives/format-utils';

import { Gestor } from '../gestor';
import { GestorService } from '../service/gestor.service';

@Component({
  selector: 'gestor-detail',
  templateUrl: './gestor-detail.component.html',
  styleUrls: ['./gestor-detail.component.css']
})
export class GestorDetailComponent implements OnInit {

  @Input() item: Gestor;
  constructor(
    private service : GestorService,
    private route : ActivatedRoute,
    private location : Location,
    private message : AlertService
  ) { }

  ngOnInit() {
    this.getGestor();
  }

  getGestor(){
    this.item = null;
    const id : number = +this.route.snapshot.paramMap.get('id');
    this.service.getById(id)
        .subscribe(obj => { this.item = obj },
                   err => { console.log(err) },
                   () => { 
                    if(!this.item)
                      this.location.back();
                   });
  }

  getDataFormatada(data : Date) {
    return FormatUtils.DateToString(data);
  }

  downloadCV() {
    this.service.getCurriculum(this.item)
      .subscribe(curriculum => {
        if(curriculum != null){
          var blob = new Blob([curriculum], { type: 'text/csv' });
          var url = window.URL.createObjectURL(blob);
          window.open(url);
        }
        else{
          this.message.error("Ops! Ocorreu um erro ao realizar o download.");
        }
      },
      error => this.message.error("Ops! Ocorreu um erro ao realizar o download")
      );
  };

  goBack() : void {
    this.location.back();
  }
}
