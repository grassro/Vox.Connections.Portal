import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { ValidationService } from '../../_shared/validation/validation.service';
import { ValidationMessageComponent } from '../../_shared/validation/validation-message.component';

import { AlertService } from '../../_services/alert.service';
import { AppService } from '../../app.service';

import { Vaga } from '../vaga'
import { VagaService } from '../service/vaga.service'
import { IdiomaNivel } from '../../_shared/idioma/idioma-nivel';
import { AuthService } from '../../_shared/_guard/auth.service';

@Component({
  selector: 'app-vaga',
  templateUrl: './vaga.component.html',
  styleUrls: ['./vaga.component.css']
})
export class VagaComponent implements OnInit {
  inputForm: FormGroup;
  idiomaErrorMessage: string = null;
  idiomaList: IdiomaNivel[] = [];
  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private router: Router,
    private service: VagaService,
    private message: AlertService,
    private app: AppService,
    private authService : AuthService
  ) {
  }

  ngOnInit() {
    this.inputForm = this.formBuilder.group(
      {
        'titulo': [null, Validators.required],
        'empresa': [null, Validators.required],
        'descricao': [null, Validators.required],
        'uf': [null, Validators.required],
        'cidade': [null, Validators.required],
        'areaAtuacao': [null, Validators.required],
        'nivelEscolaridade': [null, Validators.required],
        'nivelFuncao': [null, Validators.required],
        'tipoContratacao': [null, Validators.required],
        'idioma': [null],
        'nivelIdioma': [null]
      }
    );
  }

  adicionarIdioma(): void {
    let idiomaControl = this.inputForm.controls['idioma'];
    let nivelIdiomaControl = this.inputForm.controls['nivelIdioma'];
    this.idiomaErrorMessage = "";
    if (!idiomaControl.value) {
      this.idiomaErrorMessage = "Seleciona um idioma";
      return;
    }

    if (!nivelIdiomaControl.value) {
      this.idiomaErrorMessage = "Seleciona um nível de idioma";
      return;
    }
    var obj: IdiomaNivel = new IdiomaNivel(idiomaControl.value, nivelIdiomaControl.value);
    this.idiomaList.push(obj);

    idiomaControl.setValue('');
    nivelIdiomaControl.setValue('');
  }

  removerIdioma(item: number): void {
    this.idiomaList.splice(item, 1);
  }

  submit(): boolean {
    if (this.inputForm.invalid) {
      for (let controlKey in this.inputForm.controls) {
        var control = (<FormControl>this.inputForm.controls[controlKey])
        var controlError = ValidationService.getControlErrorMessage(control, false, false);
        if (controlError) {
          control.markAsDirty();
          control.markAsTouched();
        }
      }

      return false;
    }

    let jsonData = JSON.stringify(this.inputForm.getRawValue());
    let data: Vaga = <Vaga>JSON.parse(jsonData);
    data.idiomas = this.idiomaList;
    data.idHeadhunter = this.authService.getUserIdIdentificador();
    console.log(data);
    this.service.create(data)
      .subscribe(obj => {
        this.message.success('A vaga foi criada com sucesso');
        this.inputForm.reset();
      },
      err => { this.message.error(err) }
      );

    return false;
  }

  goBack(): void {
    this.location.back();
  }
}
