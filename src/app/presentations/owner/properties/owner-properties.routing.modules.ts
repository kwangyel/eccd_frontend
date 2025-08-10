import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OwnerBuildingsComponent } from './owner-buildings/owner-buildings.component';
import { OwnerPlotsComponent } from './owner-plots/owner-plots.component';
import { OwnerViewBuildingComponent } from './owner-view-building/owner-view-building.component';
import { AdminListUnitsComponent } from '../../admin/properties/buildings/building-units/admin-list-units/admin-list-units.component';

const routes: Routes = [
    {
        path: 'plots',
        component: OwnerPlotsComponent,
    },
    {
        path: 'buildings/:buildingId',
        component: OwnerViewBuildingComponent,
        children: [
            {
                path: '',
                component: AdminListUnitsComponent,
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class OwnerPropertiesRoutingModule { }
