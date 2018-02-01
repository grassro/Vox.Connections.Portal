import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatoDetailComponent } from './candidato-detail.component';

describe('CandidatoDetailComponent', () => {
  let component: CandidatoDetailComponent;
  let fixture: ComponentFixture<CandidatoDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidatoDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CandidatoDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
