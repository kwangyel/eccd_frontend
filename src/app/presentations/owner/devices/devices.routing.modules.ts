import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminListUnitsComponent } from '../../admin/properties/buildings/building-units/admin-list-units/admin-list-units.component';
import { IotBuildingListComponent } from './iot-building-list/iot-building-list.component';
import { ValveListComponent } from './valve-list/valve-list.component';
import { ValveDetailComponent } from './valve-detail/valve-detail.component';

const routes: Routes = [
    {
        path: 'building-list',
        component: IotBuildingListComponent,
    },
    {
        path:'valve-list/:buildingId',
        component: ValveListComponent
    },
    {
        path: 'valve-detail/:valveId',
        component: ValveDetailComponent
    }

];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class  DevicesRoutingModule{ }
