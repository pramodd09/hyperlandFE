import { TestBed, inject } from '@angular/core/testing';

import { FarmerPaymentDetailsService } from './farmer-payment-details.service';

describe('FarmerPaymentDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FarmerPaymentDetailsService]
    });
  });

  it('should be created', inject([FarmerPaymentDetailsService], (service: FarmerPaymentDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
