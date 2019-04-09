import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterInvestmentComponent } from './master-investment.component';

describe('MasterInvestmentComponent', () => {
  let component: MasterInvestmentComponent;
  let fixture: ComponentFixture<MasterInvestmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterInvestmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterInvestmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
