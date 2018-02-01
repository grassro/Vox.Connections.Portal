import { Component, OnInit } from '@angular/core';

import { FormatUtils } from '../_directives/format-utils';

import { Vaga } from '../vaga/vaga';
import { VagaService } from '../vaga/service/vaga.service';
import { AuthService } from '../_shared/_guard/auth.service';
import { AlertService } from '../_services/alert.service';

declare var $: any;

@Component({
  selector: 'timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {
  vagas: Vaga[];
  currentPage = 0;
  noMorePage = false;
  textoDataAtual = "";
  locked = false;
  throttle = 300;
  scrollDistance = 1;
  scrollUpDistance = 2;
  today: Date;
  messageModal: string = '';

  constructor(
    private service: VagaService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.today = new Date();
    this.loadNewPage(true);
  }
  onScrollDown() {
    if (!this.noMorePage && !this.locked) {
      this.loadNewPage(false);
    }
  }

  loadNewPage(forceReload : boolean) {
    this.textoDataAtual = FormatUtils.DateToString(this.today);
    this.locked = true;
    this.service.getTimelinePage(this.authService.getUserId(), this.currentPage, 5, forceReload)
      .subscribe(o => {
        if (o.length == 0)
          this.noMorePage = true;

        if (!this.vagas)
          this.vagas = o;
        else
          this.vagas = this.vagas.concat(o);
        this.currentPage++;
      },
      () => { },
      () => {
        this.locked = false;
      })
  }

  podeCandidatar(item: Vaga): boolean {
    return this.service.checkPodeCandidatar(item);
  }

  candidatar(item: Vaga) {
    this.service.candidatar(item, this.authService.getUserId())
      .subscribe(obj => {
        item = obj;
        this.messageModal = 'Você se candidatou a vaga ' + item.titulo;
        $('#modal-candidatar').modal('show', { backdrop: 'fade' });
      })
  }

  getIconClass(item: Vaga) {
    return !item.ativo ? "cbp_tmicon timeline-bg-gray"
      : item.candidatou ? "cbp_tmicon timeline-bg-info" : "cbp_tmicon timeline-bg-success";
  }

  getHoraDescricao(d: Date): string {
    return FormatUtils.HourToString(d);
  }

  getDiaDescricao(d: Date): string {
    var daysDiff = FormatUtils.DaysBetween(d, this.today);
    switch (daysDiff) {
      case 0:
        return "Hoje às " + this.getHoraDescricao(d);
      case 1:
        return "Ontem às " + this.getHoraDescricao(d);
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        return "Há " + daysDiff + " dias";
      default:
        return "Há mais de uma semana";
    }
  }

  getIdiomas(item: Vaga) {
    if (!item.idiomas)
      return '';

    var textoIdiomas : string[] = [];
    item.idiomas.forEach(i => textoIdiomas.push(`${i.nomeIdioma } - ${i.nivelIdioma}`));

    return textoIdiomas.join(', ');
  }
}
