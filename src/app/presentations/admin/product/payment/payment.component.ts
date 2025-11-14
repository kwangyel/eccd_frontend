import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ERPPaymentMethod, ERPPaymentStatus } from 'src/app/core/constants/enums';
import { ERPPaymentDTO } from 'src/app/core/dto/product/payments.dto';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [TableModule, ButtonModule, CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent {
  payments: ERPPaymentDTO[] = [];

  ngOnInit(): void {
    this.getPayments();
  }

  openAddPaymentModal(): void {
    console.log('openAddPaymentModal');
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
            id: 1,
            phoneNumber: 0,
            nameEnglish: 'John Doe',
            hasLoginAccess: false
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
            id: 1,
            phoneNumber: 0,
            nameEnglish: 'John Doe',
            hasLoginAccess: false
          },
        },
        parentId: 1,
      },
    ];
  }
}
