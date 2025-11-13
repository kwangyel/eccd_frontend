import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterProductComponent } from './master-product/master-product.component';

const routes: Routes = [
    {
        path: '',
        component: MasterProductComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminMasterProductRoutingModule {}
