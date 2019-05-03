import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatePaymentDetailsComponent } from './associate-payment-details.component';

describe('AssociatePaymentDetailsComponent', () => {
  let component: AssociatePaymentDetailsComponent;
  let fixture: ComponentFixture<AssociatePaymentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociatePaymentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociatePaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
