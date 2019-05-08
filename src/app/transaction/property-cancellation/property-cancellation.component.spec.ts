import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyCancellationComponent } from './property-cancellation.component';

describe('PropertyCancellationComponent', () => {
  let component: PropertyCancellationComponent;
  let fixture: ComponentFixture<PropertyCancellationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyCancellationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyCancellationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
