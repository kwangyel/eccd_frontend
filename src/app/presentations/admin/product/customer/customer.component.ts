import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ParentDTO } from 'src/app/core/dto/users/parent.dto';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.scss'
})
export class CustomerComponent {
  customers: ParentDTO[] = [];
  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(): void {
    // this.customerDataService.getCustomers().subscribe((res) => {
    //   this.customers = res;
    // });
    this.customers = [
      {
        id: 1,
        userId: 1,
        user: {
          id: 1,
          nameEnglish: 'Customer 1',
          email: 'customer1@example.com',
          phoneNumber: 1234567890,
          hasLoginAccess: false
        },
      },
      {
        id: 2,
        userId: 2,
        user: {
          id: 2,
          nameEnglish: 'Customer 2',
          email: 'customer2@example.com',
          phoneNumber: 1234567890,
          hasLoginAccess: false
        },
      },
    ];
  }

}
