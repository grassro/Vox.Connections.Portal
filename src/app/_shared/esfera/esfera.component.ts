import { Component, OnInit, Input} from '@angular/core';
import { Esfera } from './esfera';
import { EsferaService} from './esfera.service';
import { MakeProvider, AbstractValueAccessor } from '../../abstract-value-accessor';

@Component({
  selector: 'esfera',
  providers: [
    EsferaService,
    MakeProvider(EsferaComponent)],
  templateUrl: '../drop-down-list/drop-down-list.component.html'
})

export class EsferaComponent extends AbstractValueAccessor implements OnInit {
  @Input() id;
  @Input() name;
  @Input() text;
  @Input() labelClass;
  @Input() selectClass;
  @Input() required: boolean;
  @Input() controlDivClass;
  titulo = "Esfera"
  items : Esfera[];
  constructor(private service : EsferaService) {
    super();
   }

  ngOnInit() {
    this.service.getAll().subscribe(result => this.items = result);
  }
}
