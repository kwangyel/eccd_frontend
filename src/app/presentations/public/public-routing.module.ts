import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PublicHomeComponent } from './public-home/public-home.component';
import { PublicLaunchSequenceComponent } from './public-launch-sequence/public-launch-sequence.component';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { LandingComponent } from './landing/landing.component';
import { LandingV2Component } from './landing-v2/landing-v2.component';
import { EnrollApplicationComponent } from './enroll-application/enroll-application.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: LandingComponent
            },
            {
                path: 'v2',
                component: LandingV2Component
            },
            // {
            //     path: 'launch',
            //     component: PublicLaunchSequenceComponent,
            // },
            {
                path: 'application/:applicationId',
                component: ApplicationFormComponent
            },
            {
                path: 'enroll',
                component: EnrollApplicationComponent
            }
        ]),
    ],
    exports: [RouterModule],
})
export class PublicRoutingModule { }
