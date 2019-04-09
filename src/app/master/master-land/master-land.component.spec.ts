import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterLandComponent } from './master-land.component';

describe('MasterLandComponent', () => {
  let component: MasterLandComponent;
  let fixture: ComponentFixture<MasterLandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterLandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterLandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
