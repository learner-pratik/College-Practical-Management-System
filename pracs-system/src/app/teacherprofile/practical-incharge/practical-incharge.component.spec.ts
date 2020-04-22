import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticalInchargeComponent } from './practical-incharge.component';

describe('PracticalInchargeComponent', () => {
  let component: PracticalInchargeComponent;
  let fixture: ComponentFixture<PracticalInchargeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticalInchargeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticalInchargeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
