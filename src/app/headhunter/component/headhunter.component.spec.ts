import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadhunterComponent } from './headhunter.component';

describe('HeadhunterComponent', () => {
  let component: HeadhunterComponent;
  let fixture: ComponentFixture<HeadhunterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadhunterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadhunterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
