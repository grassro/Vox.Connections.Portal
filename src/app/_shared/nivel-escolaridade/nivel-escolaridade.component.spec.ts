import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NivelEscolaridadeComponent } from './nivel-escolaridade.component';

describe('NivelEscolaridadeComponent', () => {
  let component: NivelEscolaridadeComponent;
  let fixture: ComponentFixture<NivelEscolaridadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NivelEscolaridadeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NivelEscolaridadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
