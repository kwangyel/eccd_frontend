import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { PageEvent, ROWSPERPAGEOPTION } from 'src/app/core/constants/constants';
import { ExcelGeneratorDataService } from 'src/app/core/dataservice/excel.generator.dataservice';
import { PlotDTO } from 'src/app/core/dataservice/land/dto/plot.dto';
import { ThramDTO } from 'src/app/core/dataservice/land/dto/thram.dto';
import { PlotDataService } from 'src/app/core/dataservice/land/plot.dataservice';
import { ThramDataService } from 'src/app/core/dataservice/land/thram.dataservice';
import { AuthService } from 'src/app/core/dataservice/users-and-auth/auth.service';
import { PaginatedData } from 'src/app/core/dto/paginated-data.dto';
import { AdminMapviewPlotdetailsComponent } from 'src/app/presentations/admin/mapview/components/admin-mapview-plotdetails/admin-mapview-plotdetails.component';
import { AdminAddBuildingComponent } from 'src/app/presentations/admin/properties/buildings/buildings/crud-modal/admin-add-building/admin-add-building.component';
import { AdminPlotCreateComponent } from 'src/app/presentations/admin/properties/land/plots/components/admin-plot-create/admin-plot-create.component';
import { AdminPlotUpdateComponent } from 'src/app/presentations/admin/properties/land/plots/components/admin-plot-update/admin-plot-update.component';

@Component({
  selector: 'app-owner-plots',
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
  providers: [DialogService],
  templateUrl: './owner-plots.component.html',
  styleUrl: './owner-plots.component.scss'
})
export class OwnerPlotsComponent implements OnInit {
  ref: DynamicDialogRef;

  plots: PlotDTO[];
  paginatedPlotData: PaginatedData<PlotDTO> = {
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

  constructor(
    private dialogService: DialogService,
    private plotDataService: PlotDataService,
    private thramDataService: ThramDataService,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService,
    private excelGeneratorService: ExcelGeneratorDataService
  ) { }

  ngOnInit() {
    this.handlePagination();
  }

  onPageChange(event: PageEvent): void {
    this.firstPageNumber = event.first;
    this.currentPage = event.page;
    this.rows = event.rows;
    this.handlePagination();
  }

  private handlePagination(): void {
    const queryParams: any = {
      pageNo: this.currentPage,
      pageSize: this.rows,
    };

    this.plotDataService.GetAllPlotsByOwnerPaginated(queryParams).subscribe({
      next: (res) => {
        console.log(res);
        this.paginatedPlotData = res;
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Failed to load plots. Please try again later.',
        });
      }
    });
  }

  navigateToBuilding(buildingId: string) {
    this.router.navigate([
      `owner/properties/buildings/${buildingId}`,
    ]);
  }
}
