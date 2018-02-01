import { Component, OnInit, Input} from '@angular/core';
import { AreaExecutiva } from './area-executiva';
import { AreaExecutivaService} from './area-executiva.service';
import { MakeProvider, AbstractValueAccessor } from '../../abstract-value-accessor';

@Component({
  selector: 'area-executiva',
  providers: [
    AreaExecutivaService,
    MakeProvider(AreaExecutivaComponent)],
  templateUrl: '../drop-down-list/drop-down-list.component.html'
})

export class AreaExecutivaComponent extends AbstractValueAccessor implements OnInit {
  @Input() id;
  @Input() name;
  @Input() text;
  @Input() labelClass;
  @Input() selectClass;
  @Input() required: boolean;
  @Input() controlDivClass;
  titulo = "Área Executiva"
  items : AreaExecutiva[];
  constructor(private service : AreaExecutivaService) {
    super();
   }

  ngOnInit() {
    this.service.getAll().subscribe(result => this.items = result);
  }
}
