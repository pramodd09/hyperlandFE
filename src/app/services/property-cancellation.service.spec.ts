import { TestBed, inject } from '@angular/core/testing';

import { PropertyCancellationService } from './property-cancellation.service';

describe('PropertyCancellationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PropertyCancellationService]
    });
  });

  it('should be created', inject([PropertyCancellationService], (service: PropertyCancellationService) => {
    expect(service).toBeTruthy();
  }));
});
