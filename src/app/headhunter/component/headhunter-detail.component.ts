import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Headhunter } from '../headhunter';
import { HeadhunterService } from '../service/headhunter.service';

@Component({
  selector: 'headhunter-detail',
  templateUrl: './headhunter-detail.component.html',
  styleUrls: ['./headhunter-detail.component.css']
})
export class HeadhunterDetailComponent implements OnInit {
  @Input() item: Headhunter;
  constructor(
    private service :HeadhunterService,
    private route : ActivatedRoute,
    private location : Location
  ) { }

  ngOnInit() {
    this.getHeadhunter();
  }

  getHeadhunter(){
    this.item = null;
    const id : number = +this.route.snapshot.paramMap.get('id');
    this.service.getById(id)
        .subscribe(obj => { this.item = obj },
                   err => { console.log(err) },
                   () => { 
                    if(!this.item)
                      this.location.back();
                   });
  }

  goBack() : void {
    this.location.back();
  }
}
