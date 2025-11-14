import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterProductComponent } from './master-product/master-product.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { PaymentComponent } from './payment/payment.component';

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
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminMasterProductRoutingModule {}
