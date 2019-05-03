import { TestBed, inject } from '@angular/core/testing';

import { AssociatePaymentDetailsService } from './associate-payment-details.service';

describe('AssociatePaymentDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AssociatePaymentDetailsService]
    });
  });

  it('should be created', inject([AssociatePaymentDetailsService], (service: AssociatePaymentDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
