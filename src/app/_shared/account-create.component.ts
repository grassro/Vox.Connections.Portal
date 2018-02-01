import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UsuarioService } from './usuario.service';

@Component({
  selector: 'app-account-create',
  template: '<h2>Carregando...</h2>'
})
export class AccountCreateComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: UsuarioService
  ) { }

  ngOnInit() {
    if (!this.route.snapshot.paramMap.has('guid')) {
      console.log(this.route.snapshot.paramMap);
      this.router.navigate(['/pagenotfound']);
    }
    {
      this.service.buscar(this.route.snapshot.paramMap.get('guid'))
      .subscribe(result => {
        console.log(result);
        let tipo = this.getTipoDescricao(result.tipoUsuario);
        this.router.navigate([`/${tipo}/create`, result.idUsuario])
      },
      err => {
        console.log(err);
        this.router.navigate(['/pagenotfound']);
      }
    );
    }
  }

  getTipoDescricao(tipoUsuario : number){
    return tipoUsuario === 1 ? 'candidato' : tipoUsuario === 2 ? 'headhunter' : 'gestor';
  }

}
