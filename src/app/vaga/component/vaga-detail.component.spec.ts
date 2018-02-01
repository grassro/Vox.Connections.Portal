import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VagaDetailComponent } from './vaga-detail.component';

describe('VagaDetailComponent', () => {
  let component: VagaDetailComponent;
  let fixture: ComponentFixture<VagaDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VagaDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VagaDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
