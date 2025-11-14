import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { VendorDTO } from 'src/app/core/dto/product/vendor.dto';

@Component({
  selector: 'app-vendor',
  standalone: true,
  imports: [TableModule, ButtonModule, CommonModule],
  templateUrl: './vendor.component.html',
  styleUrl: './vendor.component.scss'
})
export class VendorComponent {
  vendors: VendorDTO[] = [];

  openAddVendorModal(): void {
    console.log('openAddVendorModal');
  }

  ngOnInit(): void {
    this.getVendors();
  }

  getVendors(): void {
    this.vendors = [
      {
        id: 0,
        name: 'Vendor 1',
        contactNumber: 1234567890,
        email: 'vendor1@example.com',
        address: '123 Main St, Anytown, USA'
      },
      {
        id: 1,
        name: 'Vendor 2',
        contactNumber: 1234567890,
        email: 'vendor2@example.com',
        address: '123 Main St, Anytown, USA'
      }
    ]
  }
}
