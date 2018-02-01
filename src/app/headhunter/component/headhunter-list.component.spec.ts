import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HeadhunterListComponent } from './headhunter-list.component';

describe('HeadhunterListComponent', () => {
  let component: HeadhunterListComponent;
  let fixture: ComponentFixture<HeadhunterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HeadhunterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HeadhunterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
