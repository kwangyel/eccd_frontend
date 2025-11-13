import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterProductComponent } from './master-product/master-product.component';
import { InvoiceComponent } from './invoice/invoice.component';

const routes: Routes = [
    {
        path: '',
        component: MasterProductComponent,
    },
    {
        path: 'invoices',
        component: InvoiceComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminMasterProductRoutingModule {}
