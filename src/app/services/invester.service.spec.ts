import { TestBed, inject } from '@angular/core/testing';

import { InvesterService } from './invester.service';

describe('LocationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InvesterService]
    });
  });

  it('should be created', inject([InvesterService], (service: InvesterService) => {
    expect(service).toBeTruthy();
  }));
});
