import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_guard/auth.service';

@Component({
  selector: '[vox-menu]',
  templateUrl: './menu.component.html'
})
export class MenuComponent implements OnInit {
  isAutenticado: boolean = false;
  isGestor: boolean = false;
  isHeadhunter: boolean = false;
  isCandidato: boolean = false;
  nomeUsuario: string = '';
  idPerfil : number;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.autentication.subscribe(value => {
      this.atualiza();
    });
    this.atualiza();
  }

  atualiza(){
    this.isAutenticado = this.authService.isAuthenticated();
    if (this.isAutenticado) {
      this.isGestor = this.authService.hasRole(['gestor']);
      this.isHeadhunter = this.authService.hasRole(['headhunter']);
      this.isCandidato = this.authService.hasRole(['candidato']);
      this.nomeUsuario = this.authService.getUserName();
      this.idPerfil = this.authService.getUserIdIdentificador();
    }
  }

  getEditLink() {
    if (!this.isAutenticado)
      return '';

    if (this.isGestor)
      return 'gestor/edit';

    if (this.isHeadhunter)
      return 'headhunter/edit';

    if (this.isCandidato)
      return 'candidato/edit';

    return '';
  }

}
