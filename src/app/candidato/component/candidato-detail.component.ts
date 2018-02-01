import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import * as FileSaver from 'file-saver'; 

import { AlertService } from '../../_services/alert.service';
import {FormatUtils} from '../../_directives/format-utils';

import { Candidato } from '../candidato';
import { CandidatoService } from '../service/candidato.service';

@Component({
  selector: 'candidato-detail',
  templateUrl: './candidato-detail.component.html',
  styleUrls: ['./candidato-detail.component.css']
})
export class CandidatoDetailComponent implements OnInit {

  @Input() item: Candidato;
  constructor(
    private service: CandidatoService,
    private route: ActivatedRoute,
    private location: Location,
    private message: AlertService
  ) { }

  ngOnInit() {
    this.getDetail();
  }

  getDetail() {
    this.item = null;
    const id: number = +this.route.snapshot.paramMap.get('id');
    this.service.getById(id)
      .subscribe(obj => { this.item = obj 
      console.log(obj)},
      err => { console.log(err) },
      () => {
        if (!this.item)
          this.location.back();
      });
  }

  getDataFormatada(data : Date) {
    return FormatUtils.DateToString(data);
  }

  downloadCV() {
    if(this.item.curriculo){
      var cvType = this.item.curriculo.fileTypeCurriculumVitae.replace('.', '');
      if(cvType.toLowerCase() == 'pdf')
        cvType = 'application/pdf';
        else
        cvType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      var blob = new Blob([this.item.curriculo.curriculumVitae], { type: cvType });
      let filename = this.item.nome + this.item.curriculo.fileTypeCurriculumVitae;
      console.log(blob);
      FileSaver.saveAs(blob, filename);
    }
    else{
      this.message.error("Ocorreu um erro ao realizar o download.");
    }
    // this.service.getCurriculum(this.item)
    //   .subscribe(curriculum => {
    //     if(curriculum != null){
    //       var cvType = this.item.curriculo.fileTypeCurriculumVitae.replace('.', '');
    //       if(cvType.toLowerCase() == 'pdf')
    //         cvType = 'application/pdf';
    //         else
    //         cvType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    //       var blob = new Blob([curriculum], { type: cvType });
    //       var url = window.URL.createObjectURL(blob);
    //       window.open(url);
    //     }
    //     else{
    //       this.message.error("Ocorreu um erro ao realizar o download.");
    //     }
    //   },
    //   error => this.message.error("Ocorreu um erro ao realizar o download")
    //   );
  };

  goBack(): void {
    this.location.back();
  }
}
