import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillComponent } from './bill/bill.component';
import { VendorComponent } from './vendor/vendor.component';

const routes: Routes = [
    {
        path: 'bills',
        component: BillComponent 
    },
    {
        path: 'vendors',
        component: VendorComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminVendorRoutingModule {}
