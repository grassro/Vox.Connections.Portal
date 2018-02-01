import { Component, OnInit, Input} from '@angular/core';
import { TipoContratacao } from './tipo-contratacao';
import { TipoContratacaoService} from './tipo-contratacao.service';
import { MakeProvider, AbstractValueAccessor } from '../../abstract-value-accessor';

@Component({
  selector: 'tipo-contratacao',
  providers: [ MakeProvider(TipoContratacaoComponent)],
  templateUrl: '../drop-down-list/drop-down-list.component.html'
})

export class TipoContratacaoComponent extends AbstractValueAccessor implements OnInit {
  @Input() id;
  @Input() name;
  @Input() text;
  @Input() labelClass;
  @Input() selectClass;
  @Input() required: boolean;
  @Input() controlDivClass;
  titulo = "Tipo de Contratação"
  items : TipoContratacao[];
  constructor(private service : TipoContratacaoService) {
    super();
   }

  ngOnInit() {
    this.service.getAll().subscribe(result => this.items = result);
  }
}
