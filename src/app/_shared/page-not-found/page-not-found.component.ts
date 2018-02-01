import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  template: `<div class="page-error centered">
  <div class="error-symbol">
    <i class="fa-warning"></i>
  </div>
  <h2>
    Página não encontrada
  </h2>
  <p>Desculpe, nós não encontramos a página que você procura</p>
</div>`
})
export class PageNotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
