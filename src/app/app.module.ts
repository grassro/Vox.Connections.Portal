import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, Http, XHRBackend, RequestOptions } from '@angular/http';
import { Routes, RouterModule, Router } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';

import { HttpService } from './_services/http.service';
import { httpServiceFactory } from './_services/http-service-factory';

import { CandidatoComponent } from './candidato/component/candidato.component';
import { CandidatoListComponent } from './candidato/component/candidato-list.component';
import { CandidatoDetailComponent } from './candidato/component/candidato-detail.component';

import { GestorComponent } from './gestor/component/gestor.component';
import { GestorDetailComponent } from './gestor/component/gestor-detail.component';
import { GestorListComponent } from './gestor/component/gestor-list.component';

import { NivelEscolaridadeService } from './_shared/nivel-escolaridade/nivel-escolaridade.service';
import { AreaAtuacaoService } from './_shared/area-atuacao/area-atuacao.service'
import { NivelFuncaoService } from './_shared/nivel-funcao/nivel-funcao.service';
import { CandidatoService } from './candidato/service/candidato.service';
import { GestorService } from './gestor/service/gestor.service';
import { HeadhunterComponent } from './headhunter/component/headhunter.component';
import { HeadhunterListComponent } from './headhunter/component/headhunter-list.component';
import { HeadhunterDetailComponent } from './headhunter/component/headhunter-detail.component';
import { HeadhunterService } from './headhunter/service/headhunter.service';
import { VagaComponent } from './vaga/component/vaga.component';
import { VagaDetailComponent } from './vaga/component/vaga-detail.component';
import { VagaService } from './vaga/service/vaga.service';
import { ValidationService } from './_shared/validation/validation.service';
import { ValidationMessageComponent } from './_shared/validation/validation-message.component';
import { ConviteComponent } from './convite/convite.component';
import { ConviteService } from './convite/convite.service';
import { AppService } from './app.service';
import { TipoContratacaoService } from './_shared/tipo-contratacao/tipo-contratacao.service';
import { IdiomaListSelectComponent } from './_shared/idioma/idioma-list-select.component';
import { AreaAtuacaoComponent } from './_shared/area-atuacao/area-atuacao.component';
import { NivelEscolaridadeComponent } from './_shared/nivel-escolaridade/nivel-escolaridade.component';
import { NivelFuncaoComponent } from './_shared/nivel-funcao/nivel-funcao.component';
import { TipoContratacaoComponent } from './_shared/tipo-contratacao/tipo-contratacao.component';
import { EstadoComponent } from './_shared/estado/estado.component';
import { EsferaComponent } from './_shared/esfera/esfera.component';
import { LinkComponent } from './_shared/link/link.component';
import { AreaExecutivaComponent } from './_shared/area-executiva/area-executiva.component';
import { VagaListComponent } from './vaga/component/vaga-list.component';
import { AlertComponent } from './_directives/alert.component';
import { AlertService } from './_services/alert.service';
import { TimelineComponent } from './timeline/timeline.component';
import { DatepickerDirective } from './_directives/date-picker-directive';
import { InputMaskDirective } from './_directives/input-mask-directive';
import { PageNotFoundComponent } from './_shared/page-not-found/page-not-found.component';
import { AuthService } from './_shared/_guard/auth.service';
import { PermissionActivate } from './_shared/_guard/permission-activate';
import { LoginComponent } from './login/login.component';
import { MenuComponent } from './_shared/menu/menu.component';
import { AccountCreateComponent } from './_shared/account-create.component';
import { UsuarioService } from './_shared/usuario.service';
import { FinalizadoComponent } from './_shared/finalizado/finalizado.component';

const routes: Routes = [
  { path: 'timeline', component: TimelineComponent, canActivate: [PermissionActivate], data: { roles: ['candidato', 'gestor'] } },
  { path: 'vaga', component: VagaListComponent, canActivate: [PermissionActivate], data: { roles: ['*'] } },
  { path: 'vaga/search', component: VagaListComponent, canActivate: [PermissionActivate], data: { roles: ['*'], search: true } },
  { path: 'vaga/search/:id', component: VagaDetailComponent, canActivate: [PermissionActivate], data: { roles: ['*'], search: true } },
  { path: 'vaga/create', component: VagaComponent, canActivate: [PermissionActivate], data: { roles: ['headhunter', 'gestor'] } },
  { path: 'vaga/:id', component: VagaDetailComponent, canActivate: [PermissionActivate], data: { roles: ['*'] } },
  { path: 'gestor', component: GestorListComponent, canActivate: [PermissionActivate], data: { roles: ['gestor'] } },
  { path: 'gestor/create/:guid', component: GestorComponent },
  { path: 'gestor/edit', component: GestorComponent, canActivate: [PermissionActivate], data: { edit: true, roles: ['gestor'] } },
  { path: 'gestor/convite', component: ConviteComponent, canActivate: [PermissionActivate], data: { tipo: 'gestor', roles: ['gestor'] } },
  { path: 'gestor/:id', component: GestorDetailComponent, canActivate: [PermissionActivate], data: { roles: ['*'] } },
  { path: 'candidato', component: CandidatoListComponent, canActivate: [PermissionActivate], data: { roles: ['*'] } },
  { path: 'candidato/search', component: CandidatoListComponent, canActivate: [PermissionActivate], data: { search: true, roles: ['*'] } },
  { path: 'candidato/create/:guid', component: CandidatoComponent },
  { path: 'candidato/convite', component: ConviteComponent, canActivate: [PermissionActivate], data: { tipo: 'candidato', roles: ['candidato', 'gestor'] } },
  { path: 'candidato/edit', component: CandidatoComponent, canActivate: [PermissionActivate], data: { edit: true, roles: ['candidato'] } },
  { path: 'candidato/:id', component: CandidatoDetailComponent, canActivate: [PermissionActivate], data: { roles: ['*'] } },
  { path: 'headhunter', component: HeadhunterListComponent, canActivate: [PermissionActivate], data: { roles: ['*'] } },
  { path: 'headhunter/create/:guid', component: HeadhunterComponent, },
  { path: 'headhunter/convite', component: ConviteComponent, canActivate: [PermissionActivate], data: { tipo: 'headhunter', roles: ['headhunter', 'gestor'] } },
  { path: 'headhunter/:id', component: HeadhunterDetailComponent, canActivate: [PermissionActivate], data: { roles: ['*'] } },
  { path: 'create/:guid', component: AccountCreateComponent },
  { path: 'login', component: LoginComponent },
  { path: 'finalizado', component: FinalizadoComponent },
  { path: 'logout', component: LoginComponent, data: { logout: true } },
  { path: 'pagenotfound', component: PageNotFoundComponent },
  { path: '', redirectTo: '/timeline', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CandidatoComponent,
    CandidatoListComponent,
    CandidatoDetailComponent,
    GestorComponent,
    GestorDetailComponent,
    GestorListComponent,
    HeadhunterComponent,
    HeadhunterListComponent,
    HeadhunterDetailComponent,
    VagaComponent,
    VagaDetailComponent,
    ValidationMessageComponent,
    ConviteComponent,
    IdiomaListSelectComponent,
    AreaAtuacaoComponent,
    NivelEscolaridadeComponent,
    NivelFuncaoComponent,
    TipoContratacaoComponent,
    EstadoComponent,
    EsferaComponent,
    LinkComponent,
    AreaExecutivaComponent,
    VagaListComponent,
    AlertComponent,
    TimelineComponent,
    DatepickerDirective,
    InputMaskDirective,
    PageNotFoundComponent,
    LoginComponent,
    MenuComponent,
    AccountCreateComponent,
    FinalizadoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    InfiniteScrollModule
  ],
  providers: [
    NivelEscolaridadeService,
    AreaAtuacaoService,
    NivelFuncaoService,
    CandidatoService,
    GestorService,
    HeadhunterService,
    VagaService,
    ValidationService,
    ConviteService,
    AppService,
    TipoContratacaoService,
    AlertService,
    AuthService,
    PermissionActivate,
    UsuarioService,
    {
      provide: HttpService,
      useFactory: httpServiceFactory,
      deps: [XHRBackend, RequestOptions, Router]
    }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
}