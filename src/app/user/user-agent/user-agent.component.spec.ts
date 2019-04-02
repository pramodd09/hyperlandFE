import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterAgentComponent } from './user-agent.component';

describe('MasterAgentComponent', () => {
  let component: MasterAgentComponent;
  let fixture: ComponentFixture<MasterAgentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MasterAgentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MasterAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
