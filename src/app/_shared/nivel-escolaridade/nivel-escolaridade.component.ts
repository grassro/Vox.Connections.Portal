import { Component, OnInit, Input} from '@angular/core';
import { NivelEscolaridade } from './nivel-escolaridade';
import { NivelEscolaridadeService} from './nivel-escolaridade.service';
import { MakeProvider, AbstractValueAccessor } from '../../abstract-value-accessor';

@Component({
  selector: 'nivel-escolaridade',
  providers: [ MakeProvider(NivelEscolaridadeComponent)],
  templateUrl: '../drop-down-list/drop-down-list.component.html'
})

export class NivelEscolaridadeComponent extends AbstractValueAccessor implements OnInit {
  @Input() id;
  @Input() name;
  @Input() text;
  @Input() labelClass;
  @Input() selectClass;
  @Input() required: boolean;
  @Input() controlDivClass;
  titulo = "Nível de Escolaridade"
  items : NivelEscolaridade[];
  constructor(private service : NivelEscolaridadeService) {
    super();
   }

  ngOnInit() {
    this.service.getAll().subscribe(result => this.items = result);
  }
}
