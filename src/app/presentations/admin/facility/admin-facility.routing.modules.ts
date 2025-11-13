import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterFacilityComponent } from './master-facility/master-facility.component';

const routes: Routes = [
    {
        path: '',
        component: MasterFacilityComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminMasterFacilityRoutingModule {}
