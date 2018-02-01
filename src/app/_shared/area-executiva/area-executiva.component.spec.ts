import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreaExecutivaComponent } from './area-executiva.component';

describe('AreaExecutivaComponent', () => {
  let component: AreaExecutivaComponent;
  let fixture: ComponentFixture<AreaExecutivaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreaExecutivaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreaExecutivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
