import { TestBed, inject } from '@angular/core/testing';

import { TipoContratacaoService } from './tipo-contratacao.service';

describe('TipoContratacaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TipoContratacaoService]
    });
  });

  it('should be created', inject([TipoContratacaoService], (service: TipoContratacaoService) => {
    expect(service).toBeTruthy();
  }));
});
