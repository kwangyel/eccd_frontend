import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogComponent, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { LeaseAgreementDataService } from 'src/app/core/dataservice/lease/lease-agreement.dataservice';
import { TerminateLeaseAgreementDTO } from 'src/app/core/dataservice/lease/lease-agreement.dto';

@Component({
  selector: 'app-terminate-lease-component',
  standalone: true,
  imports: [
    InputNumberModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './terminate-lease-component.component.html',
  styleUrl: './terminate-lease-component.component.scss'
})
export class TerminateLeaseComponentComponent implements OnInit {
  terminateLeaseData: TerminateLeaseAgreementDTO = {
    leaseAgreementId: 0,
    leaseModificationDate: new Date().toISOString().split('T')[0],
    leaseModificationRemarks: ''
  };
  instance: DynamicDialogComponent | undefined;
  isSubmitting: boolean = false;

  constructor(
    private dialogService: DialogService,
    private ref: DynamicDialogRef,
    private config: DynamicDialogConfig,
    private leaseAgreementDataService: LeaseAgreementDataService
  ) {
    this.instance = this.dialogService.getInstance(this.ref);
    if (this.config.data && this.config.data.leaseAgreementId) {
      this.terminateLeaseData.leaseAgreementId = this.config.data.leaseAgreementId;
    }
  }
  ngOnInit(): void { }

  close() {
    this.ref.close();
  }
  confirmTermination() {
    if(!this.terminateLeaseData.leaseModificationRemarks) {
      console.error('Termination remarks are required.');
      return;
    }
    this.isSubmitting = true;
    this.leaseAgreementDataService.TerminateLeaseAgreement(this.terminateLeaseData).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        this.ref.close(response);
      },
      error: (error) => {
        this.isSubmitting = false;
        console.error('Error terminating lease:', error);
      }
    });

  }

}
