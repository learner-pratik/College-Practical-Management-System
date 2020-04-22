import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentinfoComponent } from './studentinfo.component';

describe('StudentinfoComponent', () => {
  let component: StudentinfoComponent;
  let fixture: ComponentFixture<StudentinfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentinfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentinfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
