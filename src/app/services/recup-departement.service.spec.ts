import { TestBed } from '@angular/core/testing';

import { RecupDepartementService } from './recup-departement.service';

describe('RecupDepartementService', () => {
  let service: RecupDepartementService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecupDepartementService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
