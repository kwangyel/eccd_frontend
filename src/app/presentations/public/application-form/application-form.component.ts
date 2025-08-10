import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateLeaseApplicationEntryDto, ListingsDataService } from 'src/app/core/dataservice/listings/listings.dataservice';

export class CreateApplicationFormDto {
  applicationId: string;
  name?: string;
  cid?: string;
  occupation?: string;
  phoneNumber?: string;
  hasCar?: boolean;
  noOfPeopleLiving?: number;
}

@Component({
  selector: 'app-application-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './application-form.component.html',
  styleUrl: './application-form.component.scss'
})
export class ApplicationFormComponent implements OnInit {
  applicationForm: FormGroup;
  applicationId: string = '';
  isSubmitting: boolean = false;
  isSubmitted: boolean = false;
  isError: boolean = false;
  errorMessage: string = '';
  isFormDisabled: boolean = false;
  isApplicationClosed: boolean = false;
  applicationClosedMessage: string = '';
  applicationDescription: string = '';

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private applicationService: ListingsDataService // Assuming you have a service to handle application logic
  ) {
    this.applicationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      cid: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      occupation: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      hasCar: [false],
      noOfPeopleLiving: [1, [Validators.required, Validators.min(1), Validators.max(20)]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.applicationId = params['applicationId'];
      this.checkApplicationStatus();
    });
  }

  private checkApplicationStatus(): void {
    this.applicationService.GetApplicationForm(this.applicationId).subscribe(applicationForm => {
      if (applicationForm == null) {
        this.handleApplicationStatus(false, 'Application form not found.');
        return;
      } else if (applicationForm && applicationForm.isActive) {
        this.handleApplicationStatus(true, '');
        this.applicationDescription = applicationForm.name;
      } else {
        this.handleApplicationStatus(false, 'This application period has ended. Please try again during the next application window.');
      }
    });
  }

  private handleApplicationStatus(isOpen: boolean, message: string): void {
    this.isApplicationClosed = !isOpen;
    this.isFormDisabled = !isOpen;
    this.applicationClosedMessage = message;

    if (!isOpen) {
      this.applicationForm.disable();
    } else {
      this.applicationForm.enable();
    }
  }

  onSubmit(): void {
    // Prevent submission if application is closed
    if (this.isFormDisabled || this.isApplicationClosed) {
      this.markFormGroupTouched();
      return;
    }

    if (this.applicationForm.valid) {
      this.isSubmitting = true;

      const data : CreateLeaseApplicationEntryDto = {
        name: this.applicationForm.get('name')?.value,
        cid: this.applicationForm.get('cid')?.value,
        phoneNumber: this.applicationForm.get('phoneNumber')?.value,
        noOfTenants: this.applicationForm.get('noOfPeopleLiving')?.value,
        haveCar: this.applicationForm.get('hasCar')?.value,
        occupation: this.applicationForm.get('occupation')?.value,
        applicationUuId: this.applicationId
      }

      this.applicationService.SubmitApplicationForm(data).subscribe({
        next: (response) => {
          this.isSubmitting = false;
          this.isSubmitted = true;
          this.isApplicationClosed = true;
        },
        error: (error) => {
          this.isSubmitting = false;
          this.isApplicationClosed = true;
          this.isError = true;
          this.errorMessage = error.error?.message || 'An error occurred while submitting the application.';
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  private markFormGroupTouched(): void {
    Object.keys(this.applicationForm.controls).forEach(key => {
      this.applicationForm.get(key)?.markAsTouched();
    });
  }

  getFieldError(fieldName: string): string {
    const field = this.applicationForm.get(fieldName);
    if (field?.errors && field.touched) {
      if (field.errors['required']) return `${this.getFieldDisplayName(fieldName)} is required`;
      if (field.errors['minlength']) return `${this.getFieldDisplayName(fieldName)} must be at least ${field.errors['minlength'].requiredLength} characters`;
      if (field.errors['pattern']) {
        if (fieldName === 'cid') return 'CID must be 11 digits';
        if (fieldName === 'phoneNumber') return 'Phone number must be 8 digits';
      }
      if (field.errors['min']) return `Minimum value is ${field.errors['min'].min}`;
      if (field.errors['max']) return `Maximum value is ${field.errors['max'].max}`;
    }
    return '';
  }

  private getFieldDisplayName(fieldName: string): string {
    const displayNames: { [key: string]: string } = {
      name: 'Name',
      cid: 'CID',
      occupation: 'Occupation',
      phoneNumber: 'Phone Number',
      noOfPeopleLiving: 'Number of People Living'
    };
    return displayNames[fieldName] || fieldName;
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.applicationForm.get(fieldName);
    return !!(field?.invalid && field.touched);
  }

  // Method to manually toggle form status for testing
  toggleFormStatus(): void {
    if (this.isApplicationClosed) {
      this.handleApplicationStatus(true, '');
    } else {
      this.handleApplicationStatus(false, 'This application period has ended. Please try again during the next application window.');
    }
  }

  // Method to retry submission after error
  retrySubmission(): void {
    this.isError = false;
    this.errorMessage = '';
    this.isSubmitted = false;
  }

  // Method to dismiss success banner
  dismissSuccessBanner(): void {
    this.isSubmitted = false;
  }

  // Method to dismiss error banner
  dismissErrorBanner(): void {
    this.isError = false;
    this.errorMessage = '';
  }
}
