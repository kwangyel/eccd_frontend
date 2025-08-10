import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProgressBarModule } from 'primeng/progressbar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { TreeTableModule } from 'primeng/treetable';
import { BuildingDataService } from 'src/app/core/dataservice/building/building.dataservice';
import { ExcelGeneratorDataService } from 'src/app/core/dataservice/excel.generator.dataservice';
import { BuildingDTO, BuildingRentalDTO } from 'src/app/core/dto/properties/building.dto';
import { UnitDTO } from 'src/app/core/dto/units/unit.dto';

@Component({
  selector: 'app-tax-report',
  standalone: true,
  imports: [
    CommonModule,
    DividerModule,
    TabViewModule,
    ProgressBarModule,
    ButtonModule,
    CalendarModule,
    FormsModule,
    InputGroupModule,
    TableModule,
    InputGroupAddonModule,
    InputNumberModule,
    InputTextModule,
    TreeTableModule,
    DropdownModule,
    InputTextareaModule,
    DialogModule,
    ProgressSpinnerModule,
  ],
  providers: [MessageService],
  templateUrl: './tax-report.component.html',
  styleUrl: './tax-report.component.scss'
})
export class TaxReportComponent implements OnInit {
  buildingId: number;
  units: UnitDTO[] = [];
  building: BuildingDTO;
  selectedYear: Date = new Date();

  vacantUnitCount: number = 0;
  totalPending: number = 0;

  grossIncome: number = 0;
  totalInterestDeduction: number = 0;
  taxDeductions: number = 0;
  repairsDeduction: number = 0;
  otherDeductions: number = 0;
  netIncome: number = this.grossIncome - this.totalInterestDeduction - this.repairsDeduction - this.otherDeductions;
  taxableIncome: number = this.netIncome - 300000; // 300,000 is the tax-free threshold
  estimatedTax: number = 0;


  constructor(
    private route: ActivatedRoute,
    private messageService: MessageService,
    private buildingDataService: BuildingDataService,
    private excelGeneratorDataService: ExcelGeneratorDataService
  ) {
    this.buildingId = Number(
      this.route.snapshot.paramMap.get('buildingId')
    );
  }

  ngOnInit(): void {
    this.buildingDataService
      .GetOneById(this.buildingId)
      .subscribe((building: BuildingDTO) => {
        this.building = building;
      });
    this.loadData();
  }

  calculateTaxes() {
    if (this.taxDeductions == null || this.taxDeductions == undefined) {
      this.taxDeductions = 0;
    }
    if (this.otherDeductions == null || this.otherDeductions == undefined) {
      this.otherDeductions = 0;
    }
    this.repairsDeduction = this.grossIncome * 0.2; // 20% of gross income
    this.netIncome = this.grossIncome - this.totalInterestDeduction - this.repairsDeduction - this.otherDeductions -this.taxDeductions;
    this.taxableIncome = this.netIncome - 300000; // 300,000 is the tax-free threshold
    this.estimatedTax = this.incomeTaxCalculation(this.netIncome);
  }

  downloadRentalSheet() {
    let data = {
      buildingId: this.buildingId,
      year: this.selectedYear.getFullYear()
    };
    this.excelGeneratorDataService.DownloadRentalSheetByOwnerBuildingIdYear(data).subscribe((blob: Blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `RentalSheet_${this.selectedYear.getFullYear().toString()}.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      this.messageService.add({
        severity: 'success',
        summary: 'Downloaded',
        detail: 'Download Completed.',
        life: 3000,
      });
    });
  }

  loadData() {
    this.units = [];
    this.vacantUnitCount = 0;
    this.totalPending = 0;
    this.excelGeneratorDataService.GetBuildingRentalJson({
      buildingId: this.buildingId,
      year: +this.selectedYear.getFullYear().toString()
    }).subscribe((data: UnitDTO[]) => {
      this.units = data;
      for (const unit of this.units) {
        console.log(unit);
        if (!unit.activeLeaseAgreement) {
          this.vacantUnitCount++;
        }
        for (const advice of unit.paymentAdvices) {
          if (advice && advice.status === 'DUE') {
            this.totalPending += advice.totalAmount;
          }
          if (advice) {
            this.grossIncome += advice.totalAmount;
            this.calculateTaxes();
          }
        }
      }
    });
  }



  incomeTaxCalculation(taxableAmount: number) {
    if (taxableAmount <= 300000) {
      return 0;
    }

    let tax = 0;
    let remainingAmount = taxableAmount;

    // First bracket: 0 - 300,000 (0%)
    if (remainingAmount > 300000) {
      remainingAmount -= 300000;

      // Second bracket: 300,001 - 400,000 (10%)
      if (remainingAmount > 0) {
        const taxableInBracket = Math.min(remainingAmount, 100000);
        tax += taxableInBracket * 0.10;
        remainingAmount -= taxableInBracket;
      }

      // Third bracket: 400,001 - 650,000 (15%)
      if (remainingAmount > 0) {
        const taxableInBracket = Math.min(remainingAmount, 250000);
        tax += taxableInBracket * 0.15;
        remainingAmount -= taxableInBracket;
      }

      // Fourth bracket: 650,001 - 1,000,000 (20%)
      if (remainingAmount > 0) {
        const taxableInBracket = Math.min(remainingAmount, 350000);
        tax += taxableInBracket * 0.20;
        remainingAmount -= taxableInBracket;
      }

      // Fifth bracket: 1,000,001 - 1,500,000 (25%)
      if (remainingAmount > 0) {
        const taxableInBracket = Math.min(remainingAmount, 500000);
        tax += taxableInBracket * 0.25;
        remainingAmount -= taxableInBracket;
      }

      // Sixth bracket: 1,500,001 and above (30%)
      if (remainingAmount > 0) {
        tax += remainingAmount * 0.30;
      }
    }

    return tax;

  }


}
