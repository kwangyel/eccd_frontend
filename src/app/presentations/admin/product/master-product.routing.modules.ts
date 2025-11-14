import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterProductComponent } from './master-product/master-product.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PaymentComponent } from './payment/payment.component';
import { CustomerComponent } from './customer/customer.component';

const routes: Routes = [
    {
        path: '',
        component: MasterProductComponent,
    },
    {
        path: 'invoices',
        component: InvoiceComponent
    },
    {
        path: 'payments',
        component: PaymentComponent
    },
    {
        path: 'customers',
        component: CustomerComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminMasterProductRoutingModule {}
