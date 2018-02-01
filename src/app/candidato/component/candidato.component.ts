import { Component, OnInit, Input, AfterViewChecked } from '@angular/core';
import { Location } from '@angular/common';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { AppService } from '../../app.service';
import { ValidationService } from '../../_shared/validation/validation.service';
import { ValidationMessageComponent } from '../../_shared/validation/validation-message.component';

import { Candidato } from '../candidato';
import { CandidatoService } from '../service/candidato.service';
import { AlertService } from '../../_services/alert.service';
import { FormControl } from '@angular/forms/src/model';
import { IdiomaNivel } from '../../_shared/idioma/idioma-nivel';
import { AuthService } from '../../_shared/_guard/auth.service';
import { FormatUtils } from '../../_directives/format-utils';

declare var $: any;
@Component({
  selector: 'candidato',
  templateUrl: './candidato.component.html',
  styleUrls: ['./candidato.component.css']
})
export class CandidatoComponent implements OnInit {
  inputForm: FormGroup;
  step1: FormGroup;
  step2: FormGroup;
  step3: FormGroup;
  step4: FormGroup;
  step5: FormGroup;
  step6: FormGroup;
  errorMessage: string = null;
  idiomaList: IdiomaNivel[] = [];
  curriculumFile: any;
  model: Candidato;
  editing: boolean = false;
  guid: string;
  constructor(
    private location: Location,
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private service: CandidatoService,
    private app: AppService,
    private message: AlertService,
    private authService: AuthService
  ) {
    this.model = new Candidato();
  }

  validaFormulario(index: number, form: FormGroup): boolean {
    let groupName = 'step' + (index + 1);
    let group = <FormGroup>form.controls[groupName];
    if (group.invalid) {
      console.log(group.errors);
      for (let controlKey in group.controls) {
        var control = (<FormControl>group.controls[controlKey])
        // var controlError = ValidationService.getControlErrorMessage(control, false, false);
        if (!control.valid && control.errors) {
          control.markAsDirty();
          control.markAsTouched();
        }
      }
      return false;
    }

    return true;
  };

  ngOnInit() {
    this.editing = true;
    if (this.route.snapshot.data['edit']) {
      this.service.getById(this.authService.getUserIdIdentificador())
        .subscribe(o => {
          this.model = o;
          this.loadValues();
        },
        err => {
          this.location.back();
        }
        );
    }
    else {
      this.editing = false;
      if (!this.route.snapshot.paramMap.has('guid')) {
        this.router.navigate(['/pagenotfound']);
      }
      else {
        this.guid = this.route.snapshot.paramMap.get('guid');
      }
    }

    this.loadFormData();
  }

  loadFormData() {
    this.step1 = this.formBuilder.group({
      'nome': [null, Validators.required],
      'email': [null, [Validators.required, Validators.email]],
      'nascimento': [null, [Validators.required]],
      'celular': [null, [Validators.required, ValidationService.celularValidator]],
      'uf': [null, Validators.required],
      'cidade': [null, Validators.required]
    });
    this.step2 = this.formBuilder.group({
      'areaAtuacao': [null, Validators.required],
      'nivelEscolaridade': [null, Validators.required],
      'nivelFuncao': [null, Validators.required],
      'areaInteresse': [null, Validators.required],
      'empregado': [null, Validators.required],
      'empresa': [null]
    });
    this.step3 = this.formBuilder.group({
      'idioma': [null],
      'nivelIdioma': [null]
    });
    this.step4 = this.formBuilder.group({
      'radioesfera': [null, Validators.required],
      'esfera': [null],
      'radiolink': [null, Validators.required],
      'link': [null],
      'areaExecutiva': [null]
    });
    this.step5 = this.formBuilder.group({
      'curriculum': [null],
      'hiddenCurriculum': [null, Validators.required]
    });
    this.step6 = this.formBuilder.group({
      'senha': [null, Validators.required],
      'confirmaSenha': [null, Validators.required]
    });
    this.inputForm = this.formBuilder.group({
      'step1': this.step1,
      'step2': this.step2,
      'step3': this.step3,
      'step4': this.step4,
      'step5': this.step5,
      'step6': this.step6
    });

    // setTimeout(() => {
    //   $('#celular').inputmask('\(99\) 9999\-99999');
    // }, 100)
  }

  public celularchanged(e : any)
  {
    this.step1.controls['celular'].setValue(e);
  }

  ngAfterViewChecked() {
    this.app.registrarFormWizard($, this.inputForm, 'inputForm', this.validaFormulario);
  }

  private loadValues() {
    this.step1.controls['nome'].setValue(this.model.nome);
    this.step1.controls['email'].setValue(this.model.email);
    this.step1.controls['nascimento'].setValue(FormatUtils.FormatDateToEdit(this.model.dataNascimento));
    this.step1.controls['celular'].setValue(this.model.celular);
    this.step1.controls['uf'].setValue(this.model.estado);
    this.step1.controls['cidade'].setValue(this.model.cidade);

    this.step2.controls['areaAtuacao'].setValue(this.model.areaAtuacao);
    this.step2.controls['nivelEscolaridade'].setValue(this.model.nivelEscolaridade);
    this.step2.controls['nivelFuncao'].setValue(this.model.nivelFuncao);
    this.step2.controls['areaInteresse'].setValue(this.model.areaInteresse);
    this.step2.controls['empregado'].setValue(this.model.empregado);
    this.step2.controls['empresa'].setValue(this.model.empresa);

    this.idiomaList = this.model.idiomas;

    this.step4.controls['esfera'].setValue(this.model.esfera);
    this.step4.controls['link'].setValue(this.model.link);
    this.step4.controls['areaExecutiva'].setValue(this.model.areaExecutiva);

    this.curriculumFile =
      {
        filename: this.model.curriculo.fileNameCurriculumVitae,
        filetype: this.model.curriculo.fileTypeCurriculumVitae,
        value: this.model.curriculo.curriculumVitae
      }
    this.step5.controls['hiddenCurriculum'].setValue('ok');
    this.step5.controls['linkedin'].setValue(this.model.linkedin);
  }

  adicionarIdioma(): void {
    var obj: IdiomaNivel = new IdiomaNivel(this.step3.controls['idioma'].value, this.step3.controls['nivelIdioma'].value);
    this.idiomaList.push(obj);

    this.step3.reset();
  }

  removerIdioma(item: number): void {
    this.idiomaList.splice(item, 1);
  }

  onCurriculumChange(event) {
    if (event.target.files && event.target.files[0]) {
      let file = event.target.files[0];

      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.curriculumFile = {
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        };
        this.step5.controls['hiddenCurriculum'].setValue('ok');
      }
    }
    else {
      this.curriculumFile = null;
      this.step5.controls['hiddenCurriculum'].setValue(null);
    }
  }

  submit(): boolean {
    let s = this.step6.controls['senha'].value;
    let s2 = this.step6.controls['confirmaSenha'].value;
    if (s != s2) {
      this.message.error('As senhas são diferentes');
      return false;
    }

    let data: Candidato = new Candidato();
    data.nome = this.step1.controls['nome'].value;
    data.email = this.step1.controls['email'].value;
    data.dataNascimento = new Date(this.step1.controls['nascimento'].value);
    data.celular = this.step1.controls['celular'].value;
    data.estado = this.step1.controls['uf'].value;
    data.cidade = this.step1.controls['cidade'].value;
    data.areaAtuacao = this.step2.controls['areaAtuacao'].value;
    data.nivelEscolaridade = this.step2.controls['nivelEscolaridade'].value;
    data.nivelFuncao = this.step2.controls['nivelFuncao'].value;
    data.areaInteresse = this.step2.controls['areaInteresse'].value;
    data.empregado = this.step2.controls['empregado'].value;
    data.empresa = this.step2.controls['empresa'].value;
    data.idiomas = this.idiomaList;
    data.esfera = this.step4.controls['esfera'].value;
    data.link = this.step4.controls['link'].value;
    data.areaExecutiva = this.step4.controls['areaExecutiva'].value;
    data.linkedin = this.step4.controls['linkedin'].value;
    data.idUsuario = this.guid;

    if (this.editing) {
      data.curriculo = this.model.curriculo;
      data.idCandidato = this.model.idCandidato;
      data.idUsuario = this.model.idUsuario;
      this.service.update(data, this.curriculumFile)
        .subscribe(obj => { this.message.success('As alterações foram salvas'); },
        err => { this.message.error(err); }
        );
    }
    else {
      this.service.create(data, this.curriculumFile, this.step6.controls['senha'].value)
        .subscribe(obj => { this.router.navigate(['/finalizado']); },
        err => { this.message.error(err); }
        );
    }

    return true;
  }

  goBack(): void {
    this.location.back();
  }
}
