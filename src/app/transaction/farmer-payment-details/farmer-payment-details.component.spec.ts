import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmerPaymentDetailsComponent } from './farmer-payment-details.component';

describe('FarmerPaymentDetailsComponent', () => {
  let component: FarmerPaymentDetailsComponent;
  let fixture: ComponentFixture<FarmerPaymentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FarmerPaymentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FarmerPaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
