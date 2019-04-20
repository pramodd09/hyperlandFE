import { TestBed, inject } from '@angular/core/testing';

import { CustomerInstallmentDetailsService } from './customer-installment-details.service';

describe('CustomerInstallmentDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CustomerInstallmentDetailsService]
    });
  });

  it('should be created', inject([CustomerInstallmentDetailsService], (service: CustomerInstallmentDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
