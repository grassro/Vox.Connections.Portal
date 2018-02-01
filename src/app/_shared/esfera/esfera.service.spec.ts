import { TestBed, inject } from '@angular/core/testing';

import { EsferaService } from './esfera.service';

describe('EsferaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EsferaService]
    });
  });

  it('should be created', inject([EsferaService], (service: EsferaService) => {
    expect(service).toBeTruthy();
  }));
});
