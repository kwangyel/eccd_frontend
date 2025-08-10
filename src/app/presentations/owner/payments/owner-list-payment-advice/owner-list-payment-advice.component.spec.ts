import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerListPaymentAdviceComponent } from './owner-list-payment-advice.component';

describe('OwnerListPaymentAdviceComponent', () => {
  let component: OwnerListPaymentAdviceComponent;
  let fixture: ComponentFixture<OwnerListPaymentAdviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerListPaymentAdviceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnerListPaymentAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
