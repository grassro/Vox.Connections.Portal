import { Component, OnInit, Input} from '@angular/core';
import { NivelFuncao } from './nivel-funcao';
import { NivelFuncaoService} from './nivel-funcao.service';
import { MakeProvider, AbstractValueAccessor } from '../../abstract-value-accessor';

@Component({
  selector: 'nivel-funcao',
  providers: [ MakeProvider(NivelFuncaoComponent)],
  templateUrl: '../drop-down-list/drop-down-list.component.html'
})

export class NivelFuncaoComponent extends AbstractValueAccessor implements OnInit {
  @Input() id;
  @Input() name;
  @Input() text;
  @Input() labelClass;
  @Input() selectClass;
  @Input() required: boolean;
  @Input() controlDivClass;
  titulo = "Nível de Função"
  items : NivelFuncao[];
  constructor(private service : NivelFuncaoService) {
    super();
   }

  ngOnInit() {
    this.service.getAll().subscribe(result => this.items = result);
  }
}
