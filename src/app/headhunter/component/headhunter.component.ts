import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { AlertService } from '../../_services/alert.service';
import { ValidationService } from '../../_shared/validation/validation.service';
import { ValidationMessageComponent } from '../../_shared/validation/validation-message.component';
import { Headhunter } from '../headhunter'
import { HeadhunterService } from '../service/headhunter.service'
import { AuthService } from '../../_shared/_guard/auth.service';

@Component({
  selector: 'headhunter',
  templateUrl: './headhunter.component.html',
  styleUrls: ['./headhunter.component.css']
})
export class HeadhunterComponent implements OnInit {
  inputForm: FormGroup;
  private model: Headhunter;
  errorMessage: string = null;
  compareSenhaErrorMessage: string = null;
  guid: string;
  private editing: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: HeadhunterService,
    private authService: AuthService,
    private message: AlertService,
    private route: ActivatedRoute,
    private location: Location
  ) {
    this.model = new Headhunter();
  }

  ngOnInit() {
    if (this.route.snapshot.data['edit']) {
      this.editing = true;
      this.service.getById(this.authService.getUserIdIdentificador())
        .subscribe(o => {
          this.model = o;
          this.editing = true;
          this.loadValues();
        },
        err => {
          this.location.back();
        }
        );
    } else {
      this.editing = false;
      if (!this.route.snapshot.paramMap.has('guid')) {
        this.router.navigate(['/pagenotfound']);
      }
      else {
        this.guid = this.route.snapshot.paramMap.get('guid');
        this.inputForm = this.formBuilder.group(
          {
            'nome': [null, Validators.required],
            'email': [null, [Validators.required, Validators.email]],
            'empresa': [null, Validators.required],
            'telefone': [null, ValidationService.telefoneValidator],
            'celular': [null, [Validators.required, ValidationService.celularValidator]],
            'senha': [null, [Validators.required, ValidationService.passwordValidator]],
            'confirmasenha': [null, [Validators.required]]
          }
        );
      }
    }
  }

  private loadValues() {
    this.inputForm.controls['nome'].setValue(this.model.nome);
    this.inputForm.controls['email'].setValue(this.model.email);
    this.inputForm.controls['empresa'].setValue(this.model.empresa);
    this.inputForm.controls['telefone'].setValue(this.model.telefone);
    this.inputForm.controls['celular'].setValue(this.model.celular);
  }

  public fieldchanged(filename : string, value :any)
  {
    this.inputForm.controls[filename].setValue(value);
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
    let data: Headhunter = <Headhunter>JSON.parse(jsonData);
    if(!this.editing)
    {
      let s = this.inputForm.controls['senha'].value;
      let s2 = this.inputForm.controls['confirmasenha'].value;
      if (s != s2) {
        // this.compareSenhaErrorMessage = 'As senhas são diferentes';
        this.message.error('As senhas são diferentes');
        return false;
      }

      data.idUsuario = this.guid;
      this.service.create(data, s)
        .subscribe(obj => {
          this.router.navigate(['/finalizado']);
        },
        err => { this.message.error(err) }
        );
    }
    else{
      data.id = this.model.id;
      data.idHeadhunter = this.model.idHeadhunter;
      data.idUsuario = this.model.idUsuario;
      this.service.update(data)
      .subscribe(obj => {
        this.message.success('As alterações foram salvas');
      },
      err => { this.message.error(err) }
      );
    }

    return false;
  }
}
