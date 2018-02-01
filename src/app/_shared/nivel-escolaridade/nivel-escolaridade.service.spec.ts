import { TestBed, inject } from '@angular/core/testing';

import { NivelEscolaridadeService } from './nivel-escolaridade.service';

describe('NivelEscolaridadeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NivelEscolaridadeService]
    });
  });

  it('should be created', inject([NivelEscolaridadeService], (service: NivelEscolaridadeService) => {
    expect(service).toBeTruthy();
  }));
});
