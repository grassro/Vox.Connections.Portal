import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Convite } from './convite';
import { ConviteService } from './convite.service';

import { ValidationService } from '../_shared/validation/validation.service';
import { ValidationMessageComponent } from '../_shared/validation/validation-message.component';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-convite',
  templateUrl: './convite.component.html',
  styleUrls: ['./convite.component.css']
})
export class ConviteComponent implements OnInit {

  listaConvites: Convite[];
  tipoConvite: string;
  formConvite: FormGroup;
  errorMessage: string = null;
  conviteEnviado: boolean = false;

  constructor(
    private service: ConviteService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private message: AlertService
  ) {
    this.formConvite = this.formBuilder.group(
      {
        'nome': [null, Validators.required],
        'email': [null, [Validators.required, Validators.email]]
      });
  }

  ngOnInit() {
    this.listaConvites = [];
    this.tipoConvite = this.route.snapshot.data['tipo'];
    if (!this.tipoConvite ||
      (this.tipoConvite.toUpperCase() !== "GESTOR" &&
        this.tipoConvite.toUpperCase() !== "CANDIDATO" &&
        this.tipoConvite.toUpperCase() !== "HEADHUNTER")
    ) {
      this.router.navigate(['/PageNotFound']);
    }
  }

  public get DescricaoTipo(): string {
    return !this.tipoConvite ? '[EMPTY]' : this.tipoConvite;
  }

  adicionarConvite(): boolean {
    this.message.clear();
    if (!this.formConvite.controls['nome'] || !this.formConvite.controls['email']) {
      this.message.error('Preencha os campos obrigatórios');
      return false;
    }
    let jsonData = JSON.stringify(this.formConvite.getRawValue());
    let data: Convite = <Convite>JSON.parse(jsonData);
    this.listaConvites.push(data);

    this.formConvite.reset();
    // this.formConvite.controls['nome'].setValue('');
    // this.formConvite.controls['nome'].setErrors(null);
    // this.formConvite.controls['email'].setValue('');
    // this.formConvite.controls['email'].setErrors(null);
    return true;
  }

  removerConvite(convite: Convite) {
    this.listaConvites.splice(this.listaConvites.indexOf(convite), 1);
  }

  submit(): void {
    this.service.send(this.tipoConvite.toUpperCase(), this.listaConvites)
      .subscribe(resp => {
        this.conviteEnviado = true;
        this.listaConvites = [];
        this.errorMessage = null;
        this.message.success('Os convites foram enviados');
      },
      err => this.message.error(err));
  }

}
