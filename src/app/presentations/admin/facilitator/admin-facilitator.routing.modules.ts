import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminFacilitatorComponent } from './master-facilitator/master-facilitator.component';

const routes: Routes = [
    {
        path: '',
        component: AdminFacilitatorComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminMasterFacilitatorRoutingModule {}
