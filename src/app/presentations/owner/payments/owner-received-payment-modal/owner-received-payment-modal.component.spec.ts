import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerReceivedPaymentModalComponent } from './owner-received-payment-modal.component';

describe('OwnerReceivedPaymentModalComponent', () => {
  let component: OwnerReceivedPaymentModalComponent;
  let fixture: ComponentFixture<OwnerReceivedPaymentModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OwnerReceivedPaymentModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OwnerReceivedPaymentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
