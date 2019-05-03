import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerInstallmentDetailsComponent } from './customer-installment-details.component';

describe('customerInstallmentDetailsComponent', () => {
  let component: CustomerInstallmentDetailsComponent;
  let fixture: ComponentFixture<CustomerInstallmentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerInstallmentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerInstallmentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
