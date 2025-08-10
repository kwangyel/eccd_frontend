import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerMasterLeaseComponent } from './owner-master-lease/owner-master-lease.component';
import { ListingsComponent } from './listings/listings.component';
import { UnitLeaseComponent } from './unit-lease/unit-lease.component';
import { BuildingLeaseComponent } from './building-lease/building-lease.component';
import { LandLeaseComponent } from './land-lease/land-lease.component';
import { ViewUnitLeaseComponent } from './view-unit-lease/view-unit-lease.component';
import { ViewDetailedLeaseComponent } from './view-detailed-lease/view-detailed-lease.component';
import { CreateUnitLeaseComponent } from './create-unit-lease/create-unit-lease.component';

const routes: Routes = [
    {
        path: 'create-unit-lease/:unitId/:plotId/:buildingId',
        component: CreateUnitLeaseComponent,
    },
    {
        path: 'view-unit-lease/:buildingId',
        component: ViewUnitLeaseComponent,
    },
    {
        path: 'view-detail-lease/:leaseAgreementId',
        component: ViewDetailedLeaseComponent
    },
    {
        path: 'listing',
        component:ListingsComponent
    },
    {
        path: 'unit-lease',
        component: UnitLeaseComponent
    },
    {
        path:'building-lease',
        component: BuildingLeaseComponent,
    },
    {
        path:'land-lease',
        component: LandLeaseComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OwnerLeaseRoutingModule {}
