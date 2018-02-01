import { Component, OnInit, Input} from '@angular/core';
import { AreaAtuacao } from './area-atuacao';
import { AreaAtuacaoService} from './area-atuacao.service';
import { MakeProvider, AbstractValueAccessor } from '../../abstract-value-accessor';

@Component({
  selector: 'area-atuacao',
  providers: [ MakeProvider(AreaAtuacaoComponent)],
  templateUrl: '../drop-down-list/drop-down-list.component.html'
})

export class AreaAtuacaoComponent extends AbstractValueAccessor implements OnInit {
  @Input() id;
  @Input() name;
  @Input() text;
  @Input() labelClass;
  @Input() selectClass;
  @Input() required: boolean;
  @Input() controlDivClass;
  @Input() titulo = "Área atuação";
  items : AreaAtuacao[];
  constructor(private service : AreaAtuacaoService) {
    super();
   }

  ngOnInit() {
    this.service.getAll().subscribe(result => this.items = result);
  }
}
