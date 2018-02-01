import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadhunterDetailComponent } from './headhunter-detail.component';

describe('HeadhunterDetailComponent', () => {
  let component: HeadhunterDetailComponent;
  let fixture: ComponentFixture<HeadhunterDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadhunterDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadhunterDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
