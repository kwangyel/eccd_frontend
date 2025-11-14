import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MasterFacilityComponent } from './master-facility/master-facility.component';
import { ClassroomComponent } from './classroom/classroom.component';

const routes: Routes = [
    {
        path: '',
        component: MasterFacilityComponent,
    },
    {
        path: 'classrooms',
        component: ClassroomComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminMasterFacilityRoutingModule {}
