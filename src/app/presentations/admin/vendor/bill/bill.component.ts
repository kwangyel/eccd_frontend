import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ERPBillStatus, ProductType } from 'src/app/core/constants/enums';
import { ERPBillDTO } from 'src/app/core/dto/product/bill.dto';

@Component({
  selector: 'app-bill',
  standalone: true,
  imports: [TableModule, ButtonModule, CommonModule],
  templateUrl: './bill.component.html',
  styleUrl: './bill.component.scss'
})
export class BillComponent {
  bills: ERPBillDTO[] = [];

  openAddBillModal(): void {
    console.log('openAddBillModal');
  }

  ngOnInit(): void {
    this.getBills();
  }

  getBills(): void {
    this.bills = [
      {
        id: 0,
        billDate: new Date(),
        billNumber: 'INV-/sdf',
        billStatus: ERPBillStatus.DUE,
        billAmount: 1000,
        vendorId: 1,
        vendor: {
          id: 1,
          name: 'Vendor 1',
          contactNumber: 1234567890,
          email: 'vendor1@example.com',
          address: '123 Main St, Anytown, USA'
        },
        billLines: [
          {
            id: 0,
            billId: 0,
            productId: 0,
            quantity: 0,
            price: 0,
            totalAmount: 0,
            bill: undefined,
            product: {
              id: 0,
              name: '',
              description: '',
              price: 0,
              type: ProductType.GOODS,
              isSale: false,
              isPurchase: true,
              gst: 0,
              unit: ''
            }
          }
        ]
      },
    ];
  }
}
