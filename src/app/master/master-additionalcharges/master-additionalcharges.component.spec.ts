import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterAdditionalChargesComponent } from './master-additionalcharges.component';

describe('MasterAdditionalChargesComponent', () => {
  let component: MasterAdditionalChargesComponent;
  let fixture: ComponentFixture<MasterAdditionalChargesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterAdditionalChargesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterAdditionalChargesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
