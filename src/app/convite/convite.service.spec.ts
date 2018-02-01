import { TestBed, inject } from '@angular/core/testing';

import { ConviteService } from './convite.service';

describe('ConviteService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ConviteService]
    });
  });

  it('should be created', inject([ConviteService], (service: ConviteService) => {
    expect(service).toBeTruthy();
  }));
});
