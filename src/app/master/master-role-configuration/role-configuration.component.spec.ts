import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterRoleComponent } from './role-configuration.component';

describe('MasterAdditionalChargesComponent', () => {
  let component: MasterRoleComponent;
  let fixture: ComponentFixture<MasterRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
