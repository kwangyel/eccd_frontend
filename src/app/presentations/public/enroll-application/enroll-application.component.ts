import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { StepsModule } from 'primeng/steps';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { MessagesModule } from 'primeng/messages';
import { Message, MenuItem } from 'primeng/api';

export interface ChildEnrollmentDto {
  // Step 1: Child Information
  childName: string;
  dateOfBirth: Date;
  gender: string;
  medicalConditions?: string;
  allergies?: string;
  
  // Step 2: Parent/Guardian Information
  parentName: string;
  relationship: string;
  cid: string;
  phoneNumber: string;
  email: string;
  address: string;
  occupation: string;
  workplaceContact?: string;
  
  // Step 3: Emergency Contact
  emergencyContactName: string;
  emergencyRelationship: string;
  emergencyPhone: string;
  alternateEmergencyName?: string;
  alternateEmergencyPhone?: string;
  
  // Step 4: Program & Preferences
  programType: string;
  preferredStartDate: Date;
  preferredTimeslot: string;
  specialRequests?: string;
  
  // Step 5: Consent & Agreements
  photoConsent: boolean;
  medicalTreatmentConsent: boolean;
  dataProcessingConsent: boolean;
  termsAccepted: boolean;
}

@Component({
  selector: 'app-enroll-application',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    StepsModule,
    ButtonModule,
    InputTextModule,
    InputNumberModule,
    DropdownModule,
    RadioButtonModule,
    CalendarModule,
    InputTextareaModule,
    CheckboxModule,
    CardModule,
    DividerModule,
    MessagesModule
  ],
  templateUrl: './enroll-application.component.html',
  styleUrl: './enroll-application.component.scss'
})
export class EnrollApplicationComponent implements OnInit {
  enrollmentForm: FormGroup;
  currentStep: number = 0;
  isSubmitting: boolean = false;
  isSubmitted: boolean = false;
  messages: Message[] = [];
  
  // Date properties
  maxDate: Date = new Date();
  minDate: Date = new Date();
  
  steps: MenuItem[] = [
    { label: 'Child Information' },
    { label: 'Parent/Guardian' },
    { label: 'Emergency Contact' },
    { label: 'Program & Preferences' },
    { label: 'Consent & Review' }
  ];

  genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' }
  ];

  relationshipOptions = [
    { label: 'Father', value: 'father' },
    { label: 'Mother', value: 'mother' },
    { label: 'Guardian', value: 'guardian' },
    { label: 'Grandparent', value: 'grandparent' },
    { label: 'Other', value: 'other' }
  ];

  programTypes = [
    { label: 'Full Day Care (8 AM - 5 PM)', value: 'fullday' },
    { label: 'Half Day Morning (8 AM - 12 PM)', value: 'halfday_morning' },
    { label: 'Half Day Afternoon (1 PM - 5 PM)', value: 'halfday_afternoon' },
    { label: 'Extended Hours (7 AM - 6 PM)', value: 'extended' }
  ];

  timeslotOptions = [
    { label: 'Morning (8:00 AM - 12:00 PM)', value: 'morning' },
    { label: 'Afternoon (1:00 PM - 5:00 PM)', value: 'afternoon' },
    { label: 'Full Day (8:00 AM - 5:00 PM)', value: 'fullday' },
    { label: 'Extended (7:00 AM - 6:00 PM)', value: 'extended' }
  ];

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.enrollmentForm = this.createForm();
  }

  ngOnInit(): void {
    // Initialize any additional setup
  }

  createForm(): FormGroup {
    return this.fb.group({
      // Step 1: Child Information
      childName: ['', [Validators.required, Validators.minLength(2)]],
      dateOfBirth: ['', Validators.required],
      gender: ['', Validators.required],
      medicalConditions: [''],
      allergies: [''],
      
      // Step 2: Parent/Guardian Information
      parentName: ['', [Validators.required, Validators.minLength(2)]],
      relationship: ['', Validators.required],
      cid: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      occupation: ['', Validators.required],
      workplaceContact: [''],
      
      // Step 3: Emergency Contact
      emergencyContactName: ['', [Validators.required, Validators.minLength(2)]],
      emergencyRelationship: ['', Validators.required],
      emergencyPhone: ['', [Validators.required, Validators.pattern(/^[0-9]{8}$/)]],
      alternateEmergencyName: [''],
      alternateEmergencyPhone: ['', Validators.pattern(/^[0-9]{8}$/)],
      
      // Step 4: Program & Preferences
      programType: ['', Validators.required],
      preferredStartDate: ['', Validators.required],
      preferredTimeslot: ['', Validators.required],
      specialRequests: [''],
      
      // Step 5: Consent & Agreements
      photoConsent: [false, Validators.requiredTrue],
      medicalTreatmentConsent: [false, Validators.requiredTrue],
      dataProcessingConsent: [false, Validators.requiredTrue],
      termsAccepted: [false, Validators.requiredTrue]
    });
  }

  nextStep(): void {
    if (this.isStepValid()) {
      if (this.currentStep < this.steps.length - 1) {
        this.currentStep++;
      }
    } else {
      this.showStepValidationErrors();
    }
  }

  previousStep(): void {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  isStepValid(): boolean {
    const stepFields = this.getStepFields(this.currentStep);
    return stepFields.every(field => {
      const control = this.enrollmentForm.get(field);
      return control?.valid || false;
    });
  }

  getStepFields(step: number): string[] {
    switch (step) {
      case 0: return ['childName', 'dateOfBirth', 'gender'];
      case 1: return ['parentName', 'relationship', 'cid', 'phoneNumber', 'email', 'address', 'occupation'];
      case 2: return ['emergencyContactName', 'emergencyRelationship', 'emergencyPhone'];
      case 3: return ['programType', 'preferredStartDate', 'preferredTimeslot'];
      case 4: return ['photoConsent', 'medicalTreatmentConsent', 'dataProcessingConsent', 'termsAccepted'];
      default: return [];
    }
  }

  showStepValidationErrors(): void {
    const stepFields = this.getStepFields(this.currentStep);
    stepFields.forEach(field => {
      const control = this.enrollmentForm.get(field);
      if (control?.invalid) {
        control.markAsTouched();
      }
    });
    
    this.messages = [{
      severity: 'error',
      summary: 'Validation Error',
      detail: 'Please fill in all required fields before proceeding.'
    }];
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.enrollmentForm.get(fieldName);
    return !!(field?.invalid && field?.touched);
  }

  getFieldError(fieldName: string): string {
    const field = this.enrollmentForm.get(fieldName);
    if (field?.errors && field?.touched) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['email']) return 'Please enter a valid email address';
      if (field.errors['pattern']) {
        if (fieldName === 'cid') return 'CID must be 11 digits';
        if (fieldName.includes('Phone')) return 'Phone number must be 8 digits';
      }
      if (field.errors['minlength']) return `${fieldName} is too short`;
    }
    return '';
  }

  submitApplication(): void {
    if (this.enrollmentForm.valid) {
      this.isSubmitting = true;
      
      // Simulate API call
      setTimeout(() => {
        this.isSubmitting = false;
        this.isSubmitted = true;
        this.messages = [{
          severity: 'success',
          summary: 'Application Submitted',
          detail: 'Your child enrollment application has been submitted successfully. We will contact you within 2-3 business days.'
        }];
      }, 2000);
    } else {
      this.showStepValidationErrors();
    }
  }

  goHome(): void {
    this.router.navigate(['/']);
  }
}
