import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';

import { Vaga } from '../vaga';
import { VagaService } from '../service/vaga.service';
import { AppService } from '../../app.service';
import { AlertService } from '../../_services/alert.service';
import { AuthService } from '../../_shared/_guard/auth.service';

@Component({
  selector: 'vaga-detail',
  templateUrl: './vaga-detail.component.html',
  styleUrls: ['./vaga-detail.component.css']
})
export class VagaDetailComponent implements OnInit {
  podeEncerrar = false;
  podeCandidatar = false;
  podeVoltar = true;
  fromSearch = false;
  _item: Vaga = null;
  get item() {
    return this._item;
  }
  set item(value) {
    this._item = value;
    if (this._item) {
      if (this.fromSearch)
        this.podeEncerrar = false;
      else
        this.podeEncerrar = this.service.checkPodeEncerrar(this._item, this.authService.getUserIdIdentificador());
      this.podeCandidatar = this.service.checkPodeCandidatar(this._item);
    }
    else {
      this.podeCandidatar = false;
      this.podeEncerrar = false;
    }
  }
  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private service: VagaService,
    private app: AppService,
    private alert: AlertService,
    private authService : AuthService
  ) {
  }

  ngOnInit() {
    window.scrollTo(0,0);
    if (this.route.snapshot.data[0]) {
      this.fromSearch = this.route.snapshot.data[0]['search'];
    }
    else {
      this.fromSearch = false;
    }
    this.podeVoltar = !this.route.snapshot.queryParams["new"];

    this.item = null;
    const id: number = +this.route.snapshot.paramMap.get('id');
    this.service.getById(id)
      .subscribe(obj => {
        this.item = obj;
        console.log(obj);
        
      },
      err => { console.log(err) },
      () => {
        if (!this.item)
          this.router.navigate(['/pagenotfound']);
      });
  }

  goBack(): void {
    this.location.back();
  }

  candidatar() {
    this.service.candidatar(this.item, this.authService.getUserId())
      .subscribe(obj => {
        this.item = obj;
        this.alert.success("Você se candidatou a vaga com sucesso");
      },
      err => { this.alert.error("Houve um erro ao se candidatar a vaga, tente novamente"); });
  }

  encerrar() {
    this.service.encerrar(this.item)
      .subscribe(obj => {
        this.item = obj;
        this.alert.success("A vaga foi encerrada");
      },
      err => { this.alert.error("Houve um erro ao encerrar a vaga"); });
  }
}
