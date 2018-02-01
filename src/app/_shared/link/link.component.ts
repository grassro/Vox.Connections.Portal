import { Component, OnInit, Input} from '@angular/core';
import { Link } from './link';
import { LinkService} from './link.service';
import { MakeProvider, AbstractValueAccessor } from '../../abstract-value-accessor';

@Component({
  selector: 'vox-link',
  providers: [
    LinkService,
    MakeProvider(LinkComponent)],
  templateUrl: '../drop-down-list/drop-down-list.component.html'
})

export class LinkComponent extends AbstractValueAccessor implements OnInit {
  @Input() id;
  @Input() name;
  @Input() text;
  @Input() labelClass;
  @Input() selectClass;
  @Input() required: boolean;
  @Input() controlDivClass;
  titulo = "Link"
  items : Link[];
  constructor(private service : LinkService) {
    super();
   }

  ngOnInit() {
    this.service.getAll().subscribe(result => this.items = result);
  }
}
