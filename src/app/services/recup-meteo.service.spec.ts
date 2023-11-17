import { TestBed } from '@angular/core/testing';

import { RecupMeteoService } from './recup-meteo.service';

describe('RecupMeteoService', () => {
  let service: RecupMeteoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecupMeteoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
