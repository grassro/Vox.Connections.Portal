import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsferaComponent } from './esfera.component';

describe('EsferaComponent', () => {
  let component: EsferaComponent;
  let fixture: ComponentFixture<EsferaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsferaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsferaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
