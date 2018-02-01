import { TestBed, inject } from '@angular/core/testing';

import { AreaExecutivaService } from './area-executiva.service';

describe('AreaExecutivaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AreaExecutivaService]
    });
  });

  it('should be created', inject([AreaExecutivaService], (service: AreaExecutivaService) => {
    expect(service).toBeTruthy();
  }));
});
