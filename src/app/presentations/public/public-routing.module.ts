import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PublicHomeComponent } from './public-home/public-home.component';
import { PublicLaunchSequenceComponent } from './public-launch-sequence/public-launch-sequence.component';
import { PublicRentalListingsComponent } from './public-rental-listings/public-rental-listings.component';
import { BrandZhidhayComponent } from './brand-zhidhay/brand-zhidhay.component';
import { ApplicationFormComponent } from './application-form/application-form.component';
import { LandingComponent } from './landing/landing.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: LandingComponent
            },
            // {
            //     path: 'launch',
            //     component: PublicLaunchSequenceComponent,
            // },
            {
                path: 'listings',
                component: PublicRentalListingsComponent,
            },
            {
                path: 'brand',
                component: BrandZhidhayComponent,
            },
            {
                path: 'application/:applicationId',
                component:ApplicationFormComponent
            }
        ]),
    ],
    exports: [RouterModule],
})
export class PublicRoutingModule {}
