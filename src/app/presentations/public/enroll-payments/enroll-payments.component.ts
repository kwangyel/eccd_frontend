import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { MessagesModule } from 'primeng/messages';
import { RadioButtonModule } from 'primeng/radiobutton';
import { StepsModule } from 'primeng/steps';
import { PaymentState } from 'src/app/core/constants/enums';

@Component({
  selector: 'app-enroll-payments',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StepsModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    RadioButtonModule,
    CalendarModule,
    InputTextareaModule,
    CheckboxModule,
    CardModule,
    DividerModule,
    MessagesModule
  ],
  templateUrl: './enroll-payments.component.html',
  styleUrl: './enroll-payments.component.scss'
})
export class EnrollPaymentsComponent {
  isPaid = false;

  currentPaymentState = PaymentState.DR_APPROVED;
  paymentStates = PaymentState;
  amount = 5000;
  paymentDate = new Date();
  receiptId = '1234567890';
  banks = [
    { name: 'Bank of Bhutan', code: 'BOB' },
    { name: 'Bhutan National Bank', code: 'BNB' },
    { name: 'Druk PNBL', code: 'PNB' },
    { name: 'Bhutan Development Bank', code: 'BDB' },
    { name: 'T Bank', code: 'TBANK' },
    { name: 'DK Limited Bank', code: 'DKBANK' },
  ];
}
