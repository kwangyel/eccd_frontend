import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { DialogService, DynamicDialogComponent, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { CreateListingDTO } from 'src/app/core/dataservice/land/dto/plot.dto';
import { ListingsDataService } from 'src/app/core/dataservice/listings/listings.dataservice';

@Component({
  selector: 'app-add-listing-modal',
  standalone: true,
  imports: [
    InputNumberModule,
    CalendarModule,
    CommonModule,
    FormsModule,
  ],
  templateUrl: './add-listing-modal.component.html',
  styleUrl: './add-listing-modal.component.scss'
})
export class AddListingModalComponent {
  description: string;
  rent: number;
  availableFrom: Date;
  instance: DynamicDialogComponent | undefined;
  unitId: number = 0;
  isSubmitting:boolean=false;

  constructor(
    private ref: DynamicDialogRef,
    private dialogService: DialogService,
    private config: DynamicDialogConfig,
    private listingService: ListingsDataService,
    private messageService: MessageService
  ) {
    this.instance = this.dialogService.getInstance(this.ref);
    if (this.config.data && this.config.data?.unitId) {
      this.unitId = this.config.data.unitId;
    }
  }

  close() {
    this.ref.close();
  }

  createListing() {
    const listingData: CreateListingDTO = {
      description: this.description,
      rent: this.rent,
      availableFrom: this.availableFrom,
      isActive: true,
      unitId: this.unitId
    };

    if (this.unitId !== 0) {
      this.listingService.CreateListing(listingData).subscribe({
        next: (response) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Listing created successfully.'
          });
          this.ref.close(response);
        },
        error: (error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Failed to create listing.'
          });
        }
      });
    } else {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Unit ID is required to create a listing.'
      });
    }
  }


}
