import { Component, OnInit, Input} from '@angular/core';
import { Estado } from './estado';
import { EstadoService} from './estado.service';
import { MakeProvider, AbstractValueAccessor } from '../../abstract-value-accessor';

@Component({
  selector: 'estado',
  providers: [
    EstadoService,
     MakeProvider(EstadoComponent)],
  templateUrl: '../drop-down-list/drop-down-list.component.html'
})

export class EstadoComponent extends AbstractValueAccessor implements OnInit {
  @Input() id;
  @Input() name;
  @Input() text;
  @Input() labelClass;
  @Input() selectClass;
  @Input() controlDivClass;
  @Input() formControl;
  @Input() required: boolean;
  titulo = "Estado"
  items : Estado[];
  constructor(private service : EstadoService) {
    super();
   }

  ngOnInit() {
    this.service.getAll().subscribe(result => this.items = result);
  }
}
