import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterInvestorComponent } from './master-investor.component';

describe('MasterInvestorComponent', () => {
  let component: MasterInvestorComponent;
  let fixture: ComponentFixture<MasterInvestorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterInvestorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterInvestorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
