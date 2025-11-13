import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnrollPaymentsComponent } from './enroll-payments.component';

describe('EnrollPaymentsComponent', () => {
  let component: EnrollPaymentsComponent;
  let fixture: ComponentFixture<EnrollPaymentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnrollPaymentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EnrollPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
