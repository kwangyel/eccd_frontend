import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ERPInvoiceStatus } from 'src/app/core/constants/enums';
import { ERPInvoiceDTO } from 'src/app/core/dto/product/invoice.dto';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [TableModule, ButtonModule, CommonModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.scss'
})
export class InvoiceComponent {
  invoices: ERPInvoiceDTO[] = [];

  ngOnInit(): void {
    this.getInvoices();
  }

  openAddInvoiceModal(): void {
    console.log('openAddInvoiceModal');
  }

  getInvoices(): void {
    // this.invoiceDataService.getInvoices().subscribe((res) => {
    //   this.invoices = res;
    // });
    this.invoices = [
      {
        id: 1,
        invoiceNumber: 'INV123',
        invoiceDate: new Date(),
        invoiceStatus: ERPInvoiceStatus.DRAFT,
        dueDate: new Date(),
        totalAmount: 1000,
        customerId: 1,
        customer: {
          id: 1,
          contactNumber: 1234567890,
          userId: 1,
          user: {
            id: 1,
            nameEnglish: 'User 1',
            email: 'user1@example.com',
            phoneNumber: 1234567890,
            hasLoginAccess: false
          },
          name: ''
        },
        invoiceLines: [],
        JournalEntries: []
      },
    ];
  }
}
