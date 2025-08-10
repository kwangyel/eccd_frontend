import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxReportComponent } from './tax-report/tax-report.component';
import { OwnerListBuildingComponent } from './owner-list-building/owner-list-building.component';
import { OwnerListPaymentAdviceComponent } from './owner-list-payment-advice/owner-list-payment-advice.component';
import { TaxReportBuildingListComponent } from './tax-report-building-list/tax-report-building-list.component';

const routes: Routes = [
    {
        path: 'list-building',
        component:OwnerListBuildingComponent 
    },
    {
        path: 'list-building-pa/:buildingId',
        component:OwnerListPaymentAdviceComponent
    },
    {
        path: 'tax-report-building-list',
        component:TaxReportBuildingListComponent 
    },
    {
        path: 'tax-reports/:buildingId',
        component: TaxReportComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OwnerPaymentsRoutingModule {}
