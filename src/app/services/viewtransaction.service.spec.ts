import { TestBed, inject } from '@angular/core/testing';

import { ViewtransactionService } from './viewtransaction.service';

describe('ViewtransactionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ViewtransactionService]
    });
  });

  it('should be created', inject([ViewtransactionService], (service: ViewtransactionService) => {
    expect(service).toBeTruthy();
  }));
});
