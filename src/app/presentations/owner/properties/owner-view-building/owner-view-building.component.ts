import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { QRCodeModule } from 'angularx-qrcode';
import { ButtonModule } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { DividerModule } from 'primeng/divider';
import { GalleriaModule } from 'primeng/galleria';
import { TabViewChangeEvent, TabViewModule } from 'primeng/tabview';
import { BuildingDataService } from 'src/app/core/dataservice/building/building.dataservice';
import { TenantDataService } from 'src/app/core/dataservice/users-and-auth/tenant.dataservice';
import { BuildingDTO } from 'src/app/core/dto/properties/building.dto';
import { TenantDTO } from 'src/app/core/dto/users/tenant.dto';
import { AdminTabPreferenceService } from 'src/app/core/preferences/admin.tab.selection.preferences';
import { AdminListUnitsComponent } from 'src/app/presentations/admin/properties/buildings/building-units/admin-list-units/admin-list-units.component';
import { AdminBuildingAmenitiesComponent } from 'src/app/presentations/admin/properties/buildings/buildings/components/admin-building-amenities/admin-building-amenities.component';
import { AdminBuildingDetailsCardComponent } from 'src/app/presentations/admin/properties/buildings/buildings/components/admin-building-details-card/admin-building-details-card.component';
import { AdminBuildingMapComponent } from 'src/app/presentations/admin/properties/buildings/buildings/components/admin-building-map/admin-building-map.component';
import { AdminBuildingOwnershipCardComponent } from 'src/app/presentations/admin/properties/buildings/buildings/components/admin-building-ownership-card/admin-building-ownership-card.component';
import { AdminBuildingPhotosComponent } from 'src/app/presentations/admin/properties/buildings/buildings/components/admin-building-photos/admin-building-photos.component';
import { AdminBuildingPlotComponent } from 'src/app/presentations/admin/properties/buildings/buildings/components/admin-building-plot/admin-building-plot.component';
import { AdminBuildingRulesComponent } from 'src/app/presentations/admin/properties/buildings/buildings/components/admin-building-rules/admin-building-rules.component';
import { AdminBuildingSurchargesComponent } from 'src/app/presentations/admin/properties/buildings/buildings/components/admin-building-surcharges/admin-building-surcharges.component';
import { AdminBuildingTenantListingComponent } from 'src/app/presentations/admin/properties/buildings/buildings/components/admin-building-tenant-listing/admin-building-tenant-listing.component';
import { AdminBuildingUnitPaymentSheetComponent } from 'src/app/presentations/admin/properties/buildings/buildings/components/admin-building-unit-payment-sheet/admin-building-unit-payment-sheet.component';

@Component({
  selector: 'app-owner-view-building',
  standalone: true,
  imports: [
        TabViewModule,
        QRCodeModule,
        CommonModule,
        GalleriaModule,
        ButtonModule,
        AdminListUnitsComponent,
        AdminBuildingDetailsCardComponent,
        AdminBuildingSurchargesComponent,
        AdminBuildingRulesComponent,
        RouterModule,
        AdminBuildingAmenitiesComponent,
        AdminBuildingMapComponent,
        CarouselModule,
        AdminBuildingPhotosComponent,
        DividerModule,
  ],
  templateUrl: './owner-view-building.component.html',
  styleUrl: './owner-view-building.component.scss'
})
export class OwnerViewBuildingComponent implements OnInit {
  buildingId: number;
  building: BuildingDTO = {} as BuildingDTO;
  responsiveOptions: any[] | undefined;
  tenants: TenantDTO[];
  activeIndex: number;

  constructor(
    private route: ActivatedRoute,
    private buildingDataService: BuildingDataService,
    private tenantDataService: TenantDataService,
  ) { }
  ngOnInit(): void {
    this.activeIndex = 0;

    this.buildingId = Number(
      this.route.snapshot.paramMap.get('buildingId')
    );
    this.getBuilding();

    this.tenantDataService
      .GetActiveTenantsByBuilding(this.buildingId)
      .subscribe((res) => {
        this.tenants = res;
        console.log(this.tenants);
      });

    this.responsiveOptions = [
      {
        breakpoint: '1199px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '991px',
        numVisible: 1,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  handleTabChange(event: TabViewChangeEvent) {
    this.activeIndex = event.index;
  }

  getQr(val) {
    return val;
  }

  getBuilding() {
    this.buildingDataService
      .GetOneById(this.buildingId)
      .subscribe((res) => {
        this.building = res;
      });
  }

}
