import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { ApplicationComponent } from './application/application.component';
import { EventComponent } from './event/event.component';

const routes: Routes = [
    {
        path: '',
        component:DashboardComponent 
    },
    {
        path: 'application',
        component: ApplicationComponent
    },
    {
        path: 'event',
        component: EventComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminEccdRoutingModule {}
