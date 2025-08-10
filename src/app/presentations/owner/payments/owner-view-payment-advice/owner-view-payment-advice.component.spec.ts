import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerViewPaymentAdviceComponent } from './owner-view-payment-advice.component';

describe('OwnerViewPaymentAdviceComponent', () => {
  let component: OwnerViewPaymentAdviceComponent;
  let fixture: ComponentFixture<OwnerViewPaymentAdviceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerViewPaymentAdviceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnerViewPaymentAdviceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
