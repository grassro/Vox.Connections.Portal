import { TestBed, inject } from '@angular/core/testing';

import { AreaAtuacaoService } from './area-atuacao.service';

describe('AreaAtuacaoService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AreaAtuacaoService]
    });
  });

  it('should be created', inject([AreaAtuacaoService], (service: AreaAtuacaoService) => {
    expect(service).toBeTruthy();
  }));
});
