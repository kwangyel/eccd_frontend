import { Component } from '@angular/core';
import { ERPPaymentMethod, ERPPaymentStatus } from 'src/app/core/constants/enums';
import { ERPPaymentDTO } from 'src/app/core/dto/product/payments.dto';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  payments: ERPPaymentDTO[] = [];

  ngOnInit(): void {
    this.getPayments();
  }

  getPayments(): void {
    this.payments = [
      { 
        id: 1, 
        paymentDate: new Date(), 
        paymentNumber: 'PAY123', 
        paymentStatus: ERPPaymentStatus.PAID, 
        paymentAmount: 1000, 
        paymentMethod: ERPPaymentMethod.CASH,
        isSend: true,
        isReceive: false,
        parent: {
          id: 1,
          userId: 1,
          user: {
            phoneNumber: 0,
            role: ''
          },
        },
        parentId: 1,
      },
      { 
        id: 2, 
        paymentDate: new Date(), 
        paymentNumber: 'PAY123', 
        paymentStatus: ERPPaymentStatus.PAID, 
        paymentAmount: 1000, 
        paymentMethod: ERPPaymentMethod.CASH,
        isSend: true,
        isReceive: false,
        parent: {
          id: 1,
          userId: 1,
          user: {
            phoneNumber: 0,
            role: ''
          },
        },
        parentId: 1,
      },
    ];
  }
}
