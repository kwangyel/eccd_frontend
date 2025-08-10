import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AccordionModule } from 'primeng/accordion';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { KnobModule } from 'primeng/knob';
import { RadioButtonModule } from 'primeng/radiobutton';
import { SelectButtonModule } from 'primeng/selectbutton';
import { StepperModule } from 'primeng/stepper';
import { TableModule } from 'primeng/table';
import { LEASESTATUS, LEASETYPE, LEASEUSES, LESSEETYPE, LESSORTYPE, NOTIFICATIONTYPES } from 'src/app/core/constants/enums';
import { BankAccountDto } from 'src/app/core/dataservice/bankaccounts/bankaccount.dto';
import { BankAccountDataService } from 'src/app/core/dataservice/bankaccounts/bankaccounts.dataservice';
import { PlotDTO } from 'src/app/core/dataservice/land/dto/plot.dto';
import { LeaseCreateState_LeasePurposeAndChargesDTO, LeaseCreateState_LeaseTermsDTO } from 'src/app/core/dataservice/lease/create-lease.dataservice';
import { LeaseAgreementDataService } from 'src/app/core/dataservice/lease/lease-agreement.dataservice';
import { CreateLeaseAgreementDTO, LeaseAgreeementDTO, PropertyLeaseAvailabilityCheckerReturnDTO, PropertyLeaseAvailabiltyCheckerDTO, PropertyLeaseOverDueReturnDTO } from 'src/app/core/dataservice/lease/lease-agreement.dto';
import { LeaseRuleDTO } from 'src/app/core/dataservice/lease/lease-rule.dto';
import { LeaseSurchargeDTO } from 'src/app/core/dataservice/lease/lease-surcharge.dto';
import { NotificationService } from 'src/app/core/dataservice/notifications/notification.service';
import { AuthService } from 'src/app/core/dataservice/users-and-auth/auth.service';
import { UserDTO } from 'src/app/core/dataservice/users-and-auth/dto/user.dto';
import { UserDataService } from 'src/app/core/dataservice/users-and-auth/user.dataservice';
import { PaymentAdviceDto } from 'src/app/core/dto/payments/payment-advice.dto';
import { GETDURATIONDIFFINYEAR, GETTOTALMONTHS } from 'src/app/core/utility/date.helper';
import { PARSEBUILDINGFLOORS } from 'src/app/core/utility/helper.function';
import { TerminateLeaseComponentComponent } from '../terminate-lease-component/terminate-lease-component.component';

@Component({
  selector: 'app-create-unit-lease',
  standalone: true,
  imports: [
    StepperModule,
    CommonModule,
    ButtonModule,
    CalendarModule,
    FormsModule,
    AccordionModule,
    TableModule,
    DropdownModule,
    InputTextModule,
    DividerModule,
    RouterModule,
    InputNumberModule,
    InputGroupModule,
    InputGroupAddonModule,
    AvatarModule,
    KnobModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextareaModule,
    ConfirmPopupModule,
    RadioButtonModule,
    SelectButtonModule,
  ],
  providers: [ConfirmationService, DialogService],
  templateUrl: './create-unit-lease.component.html',
  styleUrl: './create-unit-lease.component.scss'
})
export class CreateUnitLeaseComponent implements OnInit {
  getBuildingFloorConfiguration = PARSEBUILDINGFLOORS;
  calculateMonthsDifference = GETTOTALMONTHS;
  getDurationDiffInYears = GETDURATIONDIFFINYEAR;
  unitId: number;
  plotId: number;
  buildingId: number;
  selectedPlot: PlotDTO;
  selectedTenant: UserDTO = null;

  leaseStartDate;
  leaseEndDate;
  propertyAvailabilityResult: PropertyLeaseAvailabilityCheckerReturnDTO;
  propertyPaymentDueResult: PropertyLeaseOverDueReturnDTO;
  searchedUser: UserDTO;
  searchPhoneNumber: number;
  tenantScore: number = 100;
  ownerBankAccounts: BankAccountDto[] = [];

  createLeaseChargeForm: FormGroup;

  // general terms
  uses = Object.values(LEASEUSES);
  selectedUse: LEASEUSES = LEASEUSES.RESIDENTIAL;
  rent: number;
  securityDepositAmount: number;
  showAddLeaseChargeForm: boolean = false;
  selectedOwnerBankAccount: BankAccountDto = null;
  generalTerms: LeaseCreateState_LeasePurposeAndChargesDTO = null;

  leaseCharges: LeaseSurchargeDTO[] = [];

  // detailed terms
  yesNoOptions = [
    {
      name: 'Yes',
      value: true,
    },
    {
      name: 'No',
      value: false,
    },
  ];

  tenantSubletAuthority: boolean = true;
  ownerPrematureTermination: boolean = false;
  tenantPrematureTermination: boolean = false;
  paymentDueDay: number = 10;
  rentIncreaseNoticePeriod: number = 2;
  vacationNoticePeriod: number = 2;
  evictionNoticePeriod: number = 2;
  penaltyPercentagePerAnnum: number = 24;
  rentIncrementPercentage: number = 10;
  rentIncrementDurationYear: number = 2;
  leaseRules: LeaseRuleDTO[] = [];
  showAddLeaseRuleForm: boolean = false;
  createLeaseRuleForm: FormGroup;
  detailedLease: LeaseCreateState_LeaseTermsDTO = null;

  notifyLeaseCreation: boolean = false;
  notifySecurityDepositPayment: boolean = false;
  notifyLeaseAcceptance: boolean = false;
  ref: DynamicDialogRef;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    private router: Router,
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private userDataService: UserDataService,
    private authService: AuthService,
    private leaseAgreementDataService: LeaseAgreementDataService,
    private dialogService: DialogService,
    private bankAccountDataService: BankAccountDataService,
  ) {
    this.createLeaseChargeForm = this.fb.group({
      particular: [null],
      amount: [null],
    });
    this.createLeaseRuleForm = this.fb.group({
      particular: [null],
    });
  }

  ngOnInit(): void {
    this.unitId = Number(
      this.route.snapshot.paramMap.get('unitId')
    );
    this.plotId = Number(
      this.route.snapshot.paramMap.get('plotId')
    );
    this.buildingId = Number(
      this.route.snapshot.paramMap.get('buildingId')
    );
    this.bankAccountDataService
      .GetAllBankAccountsByOwner(
        this.authService.GetAuthenticatedUser().id
      )
      .subscribe({
        next: (res) => {
          this.ownerBankAccounts = res;
          console.log(res);
        },
      });
  }

  openCreateLeaseSurchargeModal() {
    this.showAddLeaseChargeForm = true;
  }

  deleteCharge(event, selectedLeaseCharge) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Delete Charge?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.leaseCharges = this.leaseCharges.filter((item) => {
          return !(
            item.particular === selectedLeaseCharge.particular &&
            item.amount === selectedLeaseCharge.amount
          );
        });
        this.messageService.add({
          severity: 'info',
          summary: 'Confirmed',
          detail: 'Removed',
          life: 3000,
        });
      },
    });
  }

  // step 1
  checkPropertyAvailabilityForLease() {
    console.log('Checking property availability for lease');
    this.messageService.add({
      severity: 'info',
      summary: 'Checking',
      detail: 'Checking Property availability for lease.',
    });

    let data: PropertyLeaseAvailabiltyCheckerDTO = {
      leaseType: LEASETYPE.UNIT,
      plotId: this.plotId,
      buildingId: this.buildingId,
      unitId: this.unitId,
      leaseStartDate: this.leaseStartDate,
      leaseEndDate: this.leaseEndDate,
    };
    this.leaseAgreementDataService
      .CheckPropertyAvailabilityForLease(data)
      .subscribe({
        next: (res) => {
          this.propertyAvailabilityResult = res;
          this.getPropertyPaymentDues();
        },

        error: (err) => {
          console.log(err);
        },
      });
  }
  getPropertyPaymentDues() {
    this.messageService.add({
      severity: 'info',
      summary: 'Fetching',
      detail: 'Getting Payment dues for the property.',
    });
    this.leaseAgreementDataService
      .CheckPropertyPaymentDue({
        leaseType: LEASETYPE.UNIT,
        plotId: this.plotId,
        buildingId: this.buildingId,
        unitId: this.unitId
      })
      .subscribe((res) => {
        console.log('PROEPTY DEUS', res);
        this.propertyPaymentDueResult = res;
      });
  }

  getColorForScore(score: number): string {
    if (score < 30) {
      return 'Crimson';
    } else if (score < 60) {
      return 'DarkOrange';
    } else if (score < 80) {
      return 'Gold';
    } else if (score < 90) {
      return 'MediumSeaGreen';
    } else {
      return 'MediumSlateBlue';
    }
  }

  SearchTenantByPhoneNumber() {
    this.userDataService
      .AdminSearchTenantByPhoneNumber(this.searchPhoneNumber)
      .subscribe({
        next: (res) => {
          this.searchedUser = res;
          this.messageService.add({
            severity: 'success',
            summary: 'Tenant Found!',
            detail:
              'Tenant with phone ' +
              this.searchedUser.phoneNumber +
              '  found.',
          });
        },
        error: (err) => {
          this.messageService.add({
            severity: 'error',
            summary: err.error.statusCode,
            detail: err.error.message,
          });
        },
      });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case LEASESTATUS.PENDING:
        return 'bg-red-100 text-red-700 px-1';
      case LEASESTATUS.ACTIVE:
        return 'bg-green-600 text-gray-100 px-1';
      case LEASESTATUS.UPCOMING_EXPIRATION:
        return 'bg-yellow-600 text-gray-100 px-1';
      default:
        return 'bg-gray-100 text-gray-700 px-1';
    }
  }

  getPaymentStatusClass(status: string): string {
    switch (status) {
      case 'DUE':
        return 'bg-red-100 text-red-700 px-1';

      default:
        return 'bg-green-100 text-green-700 px-1';
    }
  }

  getStatusName(status: string): string {
    switch (status) {
      case LEASESTATUS.PENDING:
        return 'Pending';
      case LEASESTATUS.ACTIVE:
        return 'Active';
      case LEASESTATUS.UPCOMING_EXPIRATION:
        return 'Expiring';
      default:
        return 'Terminated';
    }
  }

  computeMonthlyPayable(item: LeaseAgreeementDTO) {
    let total = item.rent;
    for (let i = 0; i < item.leaseSurcharges.length; i++) {
      total += item.leaseSurcharges[i].amount;
    }

    return total;
  }

  openTerminateLeaseModal(item: LeaseAgreeementDTO) {
    this.ref = this.dialogService.open(TerminateLeaseComponentComponent, {
      header: 'Terminate Lease?',
      data: {
        leaseAgreementId: item.id
      },
    });
    this.ref.onClose.subscribe((res) => {
      this.checkPropertyAvailabilityForLease();
    });

  }

  writeOffPaymentAdvice(item: PaymentAdviceDto) {
    this.messageService.add({
      severity: 'info',
      summary: 'Writing off Payment advice',
      detail: 'Writing off payment advice',
    });
  }

  getEndDateForTheMonth(selectedDate: Date): Date {
    return new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth() + 1,
      0
    );
  }

  // step 2
  confirmTenantPartySelection() {
    this.selectedTenant = this.searchedUser;
  }

  cancelSelectedTenant() {
    this.selectedTenant = null;
  }

  getTotalMonthlyPayabe() {
    if (!this.rent) return 0;
    let total = Number(this.rent);
    this.leaseCharges.forEach((item) => {
      total += item.amount;
    });
    return total;
  }

  checkDataValid(): boolean {
    if (this.rent && this.selectedOwnerBankAccount) {
      return true;
    }
    return false;
  }
  createLeaseCharge() {
    this.leaseCharges.push({
      particular: this.createLeaseChargeForm.controls['particular'].value,
      amount: this.createLeaseChargeForm.controls['amount'].value,
      origin: 'Agreement',
    });
    this.showAddLeaseChargeForm = false;
  }

  checkDataValidAndThrowError(): boolean {
    const missingFields: string[] = [];
    if (!this.rent) missingFields.push('Rent');

    if (!this.selectedOwnerBankAccount)
      missingFields.push('Owner Bank Account');

    if (missingFields.length > 0) {
      this.messageService.add({
        severity: 'error',
        summary: 'Missing Input',
        detail: `Please provide the following: ${missingFields.join(
          ', '
        )}`,
        life: 3000,
      });
      return false;
    }
    return true;
  }


  openCreateLeaseRuleModal() {
    this.showAddLeaseRuleForm = true;
  }

  createLeaseRule() {
    this.leaseRules.push({
      particular: this.createLeaseRuleForm.controls['particular'].value,
      origin: 'Agreement',
    });
    this.showAddLeaseRuleForm = false;
  }

  formatDateToLocalISO = (date: string | Date): string => {
    if (!date) return null;
    const localDate = new Date(date);
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(localDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`; // Format as 'YYYY-MM-DD'
  };

  sendLeaseCreationNotification(leaseId: number, tenantId: number) {
    this.notificationService
      .SendNotification({
        fromUserId: this.authService.GetCurrentRole().adminId,
        toUserId: tenantId,
        notificationType: NOTIFICATIONTYPES.LEASE_CREATION,
        leaseAgreementId: leaseId,
      })
      .subscribe(() => {
        this.messageService.add({
          severity: 'info',
          summary: 'Notified',
          detail: 'Lease Creation Notification Sent',
        });
      });
  }

  sendSecurityDepositReminder(leaseId: number, tenantId: number) {
    this.notificationService
      .SendNotification({
        fromUserId: this.authService.GetCurrentRole().adminId,
        toUserId: tenantId,
        notificationType:
          NOTIFICATIONTYPES.SECUTIRYDEPOSIT_PAYMENT_REMINDER,
        leaseAgreementId: leaseId,
      })
      .subscribe(() => {
        this.messageService.add({
          severity: 'info',
          summary: 'Notified',
          detail: 'Security Deposit Payment Reminder Sent',
        });
      });
  }

  sendLeaseAcceptanceReminder(leaseId: number, tenantId: number) {
    this.notificationService
      .SendNotification({
        fromUserId: this.authService.GetCurrentRole().adminId,
        toUserId: tenantId,
        notificationType: NOTIFICATIONTYPES.LEASE_SIGNING_REMINDER,
        leaseAgreementId: leaseId,
      })
      .subscribe(() => {
        this.messageService.add({
          severity: 'info',
          summary: 'Notified',
          detail: 'Lease Signing Reminder Sent',
        });
      });
  }

  // step 3
  saveGeneralTerms(nextCallBack) {
    if (this.checkDataValidAndThrowError()) {
      this.generalTerms = {
        selectedUse: this.selectedUse,
        rent: this.rent,
        securityDepositAmount: this.securityDepositAmount,
        ratePerArea: 0,
        areaLeased: 0,
        areaUnit: null,
        selectedBankAcccount: this.selectedOwnerBankAccount,
        leaseCharges: this.leaseCharges,
      };
      nextCallBack.emit();
    }
  }


  // step 4
  saveDetailedTerms(nextCallBack) {
    this.detailedLease = {
      tenantSubletAuthority: this.tenantSubletAuthority,
      ownerPrematureTermination: this.ownerPrematureTermination,
      tenantPrematureTermination: this.tenantPrematureTermination,
      paymentDueDay: this.paymentDueDay,
      vacationNoticePeriod: this.vacationNoticePeriod,
      evictionNoticePeriod: this.evictionNoticePeriod,
      penaltyPercentagePerAnnum: this.penaltyPercentagePerAnnum,
      rentIncrementPercentage: this.rentIncreaseNoticePeriod,
      rentIncrementDurationYear: this.rentIncrementDurationYear,
      rentIncreaseNoticePeriod: this.rentIncreaseNoticePeriod,
      leaseRules: this.leaseRules,
    };
    nextCallBack.emit();
  }

  cancelLeaseCreation() {
    this.messageService.add({
      severity: 'warn',
      summary: 'Cancelled',
      detail: 'Lease creation cancelled.',
    });
    setTimeout(() => {
      this.router.navigate(['/owner/lease/view-unit-lease/' + this.buildingId]);
    }, 1);
  }

  // step 5
  createLeaseAgreement() {

    let data: CreateLeaseAgreementDTO = {
      // Populate the lease agreement details
      type: LEASETYPE.UNIT,
      status: LEASESTATUS.PENDING,
      adminId: this.authService.GetCurrentRole().adminId || 1,
      bankAccountId: this.generalTerms.selectedBankAcccount?.id,
      lesseeType: LESSEETYPE.INDIVIDUAL,
      lessorType: LESSORTYPE.OWNER,
      entryDamageReportSubmitted: false,
      securityDepositPaid: false,
      leaseDurationMonths: this.calculateMonthsDifference(
        new Date(this.leaseStartDate),
        new Date(this.leaseEndDate)
      ),
      leaseStartDate: this.formatDateToLocalISO(
        this.leaseStartDate
      ),
      leaseEndDate: this.formatDateToLocalISO(
        this.leaseEndDate
      ),

      rent: this.generalTerms.rent,
      securityDepositAmount:
        this.generalTerms.securityDepositAmount,
      paymentDueDay: this.detailedLease.paymentDueDay,
      penaltyPercentagePerAnnum: this.detailedLease.penaltyPercentagePerAnnum,
      applyLatePaymentFee: true,
      plotId: this.plotId,
      buildingId: this.buildingId,
      tenantId: this.selectedTenant.id,
      unitId: this.unitId,
      use: this.generalTerms.selectedUse,
      tenantSubletAuthority: this.detailedLease.tenantSubletAuthority,
      tenantPrematureTermination: this.detailedLease.tenantPrematureTermination,
      ownerPrematureTermination: this.detailedLease.ownerPrematureTermination,
      rentIncreaseNoticePeriod: this.detailedLease.rentIncreaseNoticePeriod,
      vacationNoticePeriod: this.detailedLease.vacationNoticePeriod,
      evictionNoticePeriod: this.detailedLease.evictionNoticePeriod,
      rentIncrementPercentage: this.detailedLease.rentIncrementPercentage,
      rentIncrementDurationYear: this.detailedLease.rentIncrementDurationYear,
      leaseSurcharges: this.generalTerms.leaseCharges,
      leaseRules: this.detailedLease.leaseRules,
    };

    this.leaseAgreementDataService.CreateLeaseAgreement(data).subscribe({
      next: (res) => {
        if (res) {
          this.messageService.add({
            severity: 'success',
            summary: 'Created',
            detail: 'Lease Agreement Created! Tenant must accept to activate.',
          });
          if (this.notifyLeaseCreation) {
            this.sendLeaseCreationNotification(
              res.id,
              res.tenantId
            );
          }
          if (this.notifySecurityDepositPayment) {
            this.sendSecurityDepositReminder(res.id, res.tenantId);
          }
          if (this.notifyLeaseAcceptance) {
            this.sendLeaseAcceptanceReminder(res.id, res.tenantId);
          }
          setTimeout(() => {
            this.router.navigate([
              'owner/lease/view-unit-lease/' + this.buildingId,
            ]);
          }, 1);
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Failed to Create',
          detail: err.error.message,
        });
      },
    });
  }
}
