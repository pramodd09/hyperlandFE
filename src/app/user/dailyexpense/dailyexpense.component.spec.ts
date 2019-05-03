import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterDailyExpenseComponent } from './dailyexpense.component';

describe('MasterAgentComponent', () => {
  let component: MasterDailyExpenseComponent;
  let fixture: ComponentFixture<MasterDailyExpenseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterDailyExpenseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterDailyExpenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
