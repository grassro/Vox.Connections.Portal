import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GestorDetailComponent } from './gestor-detail.component';

describe('GestorDetailComponent', () => {
  let component: GestorDetailComponent;
  let fixture: ComponentFixture<GestorDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestorDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GestorDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
