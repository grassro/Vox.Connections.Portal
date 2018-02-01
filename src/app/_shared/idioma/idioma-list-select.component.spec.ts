import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdiomaListSelectComponent } from './idioma-list-select.component';

describe('IdiomaListSelectComponent', () => {
  let component: IdiomaListSelectComponent;
  let fixture: ComponentFixture<IdiomaListSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdiomaListSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdiomaListSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
