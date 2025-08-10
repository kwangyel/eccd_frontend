import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { PageEvent, ROWSPERPAGEOPTION } from 'src/app/core/constants/constants';
import { BuildingDataService } from 'src/app/core/dataservice/building/building.dataservice';
import { UnitDataService } from 'src/app/core/dataservice/units/unit.dataservice';
import { TenantDataService } from 'src/app/core/dataservice/users-and-auth/tenant.dataservice';
import { PaginatedData } from 'src/app/core/dto/paginated-data.dto';
import { BuildingDTO } from 'src/app/core/dto/properties/building.dto';
import { UnitDTO } from 'src/app/core/dto/units/unit.dto';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ValveDetailComponent } from '../valve-detail/valve-detail.component';

@Component({
  selector: 'app-valve-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DividerModule,
    PaginatorModule,
    InputTextModule,
    TooltipModule,
  ],
  templateUrl: './valve-list.component.html',
  styleUrl: './valve-list.component.scss',
  providers: [DialogService],
})
export class ValveListComponent implements OnInit {
  buildingId: number;
  building: BuildingDTO = {} as BuildingDTO;

  paginatedUnit: PaginatedData<UnitDTO> = {
    firstPage: 0,
    currentPage: 0,
    previousPage: 0,
    nextPage: 0,
    lastPage: 0,
    limit: 0,
    count: 0,
    data: [],
  };

  rowsPerPageOptions = ROWSPERPAGEOPTION;
  firstPageNumber = 0;
  rows = ROWSPERPAGEOPTION[0];
  currentPage = 0;
  ref: DynamicDialogRef;

  constructor(
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private router: Router,
    private buildingDataService: BuildingDataService,
    private unitDataService: UnitDataService
  ) { }

  ngOnInit(): void {
    this.buildingId = Number(
      this.route.snapshot.paramMap.get('buildingId')
    );
    this.getBuilding();
    this.handlePagination();
  }

  handlePagination() {
    const queryParams: any = {
      pageNo: this.currentPage,
      pageSize: this.rows,
    };
    this.unitDataService.GetAllUnitsByBuildingAndOwner(this.buildingId, queryParams).subscribe((res) => {
      this.paginatedUnit = res;
    });

  }

  onPageChange(event: PageEvent): void {
    this.firstPageNumber = event.first;
    this.currentPage = event.page;
    this.rows = event.rows;
    this.handlePagination();
  }


  goToValveSettings(unitId: number) {
    // this.router.navigate([`/owner/devices/valve-detail/${unitId}`]);
    this.dialogService.open(ValveDetailComponent, {
      header: 'Valve Settings',
      data: {
        unitId: unitId,
      },
      width: '50%',
    });
  }


  getBuilding() {
    this.buildingDataService
      .GetOneById(this.buildingId)
      .subscribe((res) => {
        this.building = res;
      });
  }
}
