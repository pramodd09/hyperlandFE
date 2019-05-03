import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentPaymentDetailsComponent } from './agent-payment-details.component';

describe('AgentPaymentDetailsComponent', () => {
  let component: AgentPaymentDetailsComponent;
  let fixture: ComponentFixture<AgentPaymentDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentPaymentDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentPaymentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
