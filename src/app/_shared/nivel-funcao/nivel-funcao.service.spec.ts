import { TestBed, inject } from '@angular/core/testing';

import { NivelFuncaoService } from './area-atuacao.service';

describe('NivelFuncaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NivelFuncaoService]
    });
  });

  it('should be created', inject([NivelFuncaoService], (service: NivelFuncaoService) => {
    expect(service).toBeTruthy();
  }));
});
