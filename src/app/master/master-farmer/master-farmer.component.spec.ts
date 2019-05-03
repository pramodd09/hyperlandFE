import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterFarmerComponent } from './master-farmer.component';

describe('MasterFarmerComponent', () => {
  let component: MasterFarmerComponent;
  let fixture: ComponentFixture<MasterFarmerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterFarmerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterFarmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
