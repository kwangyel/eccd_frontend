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
import { TerminateLeaseComponentComponent } from '../terminate-lease-component/terminate-lease-component.component';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AddListingModalComponent } from '../listings/add-listing-modal/add-listing-modal.component';
import { ListingsDataService } from 'src/app/core/dataservice/listings/listings.dataservice';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-view-unit-lease',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    DividerModule,
    PaginatorModule,
    InputTextModule,
    ConfirmDialogModule,
    TooltipModule,
  ],
  templateUrl: './view-unit-lease.component.html',
  styleUrl: './view-unit-lease.component.scss',
  providers: [DialogService, ConfirmationService],
})
export class ViewUnitLeaseComponent implements OnInit {
  buildingId: number;
  building: BuildingDTO = {} as BuildingDTO;
  isSubmitting: boolean = false;

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
    private listingService: ListingsDataService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
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

  cancelLease(leaseId: number) {
    this.ref = this.dialogService.open(TerminateLeaseComponentComponent, {
      header: 'Terminate Lease?',
      data: {
        leaseAgreementId: leaseId
      },
    });
    this.ref.onClose.subscribe((res) => {
      this.handlePagination();
    });
  }

  onPageChange(event: PageEvent): void {
    this.firstPageNumber = event.first;
    this.currentPage = event.page;
    this.rows = event.rows;
    this.handlePagination();
  }

  goToDetailedView(leaseId: number) {
    this.router.navigate([`/owner/lease/view-detail-lease/${leaseId}`]);
  }

  goToAddLease(unitId: number, plotId: number) {
    this.router.navigate([`/owner/lease/create-unit-lease/${unitId}/${plotId}/${this.buildingId}`]);
  }

  getBuilding() {
    this.buildingDataService
      .GetOneById(this.buildingId)
      .subscribe((res) => {
        this.building = res;
      });
  }

  listUnit(unitId: number, unitString: string) {
    this.ref = this.dialogService.open(AddListingModalComponent, {
      header: `Add Listing for unit ${unitString}`,
      width: '50%',
      data: {
        unitId: unitId,
      },
    })
    this.ref.onClose.subscribe((res) => {
      if (res) {
        this.handlePagination()
      }
    });
  }

  unList(unitId: number) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to unlist this unit?',
      accept: () => {
        this.listingService.UnListByUnitIt(unitId).subscribe({
          next: (res) => {
            this.messageService.add({
              severity: 'success',
              summary: 'Success',
              detail: 'Unit unlisted successfully.'
            });
            this.handlePagination();
          },
          error: (err) => {
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Failed to unlist unit.'
            });
          }
        });
      }
    });
  }
}
