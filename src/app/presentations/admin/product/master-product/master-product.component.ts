import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ProductType } from 'src/app/core/constants/enums';
import { ProductDTO } from 'src/app/core/dto/product/product.dto';

@Component({
  selector: 'app-master-product',
  standalone: true,
  imports: [TableModule, CommonModule, ButtonModule],
  templateUrl: './master-product.component.html',
  styleUrl: './master-product.component.scss'
})
export class MasterProductComponent {

  products: ProductDTO[] = [];

  ngOnInit(): void {
    this.getProducts();
  }

  openAddProductModal() {
  }

  getProducts() {
    // this.productDataService.getProducts().subscribe((res) => {
    //   this.products = res;
    // });
    this.products = [
      {
        id: 1,
        name: '3 month package',
        description: 'Description 1',
        price: 10000,
        type: ProductType.SERVICE,
        isSale: true,
        isPurchase: false,
        gst: 0,
        unit: 'pcs',
      },
      {
        id: 2,
        name: '6 month package',
        description: 'Description 2',
        price: 18000,
        type: ProductType.SERVICE,
        isSale: true,
        isPurchase: false,
        gst: 0,
        unit: 'pcs',
      },
    ];
  }
}
