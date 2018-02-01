import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoContratacaoComponent } from './tipo-contratacao.component';

describe('TipoContratacaoComponent', () => {
  let component: TipoContratacaoComponent;
  let fixture: ComponentFixture<TipoContratacaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoContratacaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoContratacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
