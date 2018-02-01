import { TestBed, inject } from '@angular/core/testing';

import { HeadhunterService } from './headhunter.service';

describe('HeadhunterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HeadhunterService]
    });
  });

  it('should be created', inject([HeadhunterService], (service: HeadhunterService) => {
    expect(service).toBeTruthy();
  }));
});
