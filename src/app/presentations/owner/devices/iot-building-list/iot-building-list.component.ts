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
import { PlotDataService } from 'src/app/core/dataservice/land/plot.dataservice';
import { ThramDataService } from 'src/app/core/dataservice/land/thram.dataservice';
import { AuthService } from 'src/app/core/dataservice/users-and-auth/auth.service';
import { PaginatedData } from 'src/app/core/dto/paginated-data.dto';

@Component({
  selector: 'app-iot-building-list',
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
  templateUrl: './iot-building-list.component.html',
  styleUrl: './iot-building-list.component.scss'
})
export class IotBuildingListComponent {
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
    private plotDataService: PlotDataService,
    private router: Router,
    private messageService: MessageService,
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
      `owner/devices/valve-list/${buildingId}`,
    ]);
  }

}
