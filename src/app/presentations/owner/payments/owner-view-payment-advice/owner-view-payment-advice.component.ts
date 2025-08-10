import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { TableModule } from 'primeng/table';
import { API_URL } from 'src/app/core/constants/constants';
import {
  PaymentAdviceDto,
  PenaltyDetailsDTO,
  PenaltySettingDTO,
} from 'src/app/core/dto/payments/payment-advice.dto';
import { AuthService } from 'src/app/core/dataservice/users-and-auth/auth.service';
import { UserDTO } from 'src/app/core/dataservice/users-and-auth/dto/user.dto';
import { ImageModule } from 'primeng/image';
import { Router } from '@angular/router';
import { TooltipModule } from 'primeng/tooltip';
import { PaymentAdviceDataService } from 'src/app/core/dataservice/payments/payment-advice.dataservice';
import { TagModule } from 'primeng/tag';
import { PAType, PaymentAdviseStatus } from 'src/app/core/constants/enums';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { PDFGeneratorDataService } from 'src/app/core/dataservice/pdf.generator.dataservice';
import { SystemSettingService } from 'src/app/core/dataservice/system.setting.dataservice';
import { UserDataService } from 'src/app/core/dataservice/users-and-auth/user.dataservice';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { OwnerReceivedPaymentModalComponent } from '../owner-received-payment-modal/owner-received-payment-modal.component';

@Component({
  selector: 'app-owner-view-payment-advice',
  standalone: true,
  imports: [
    DividerModule,
    CommonModule,
    TableModule,
    FormsModule,
    ButtonModule,
    CalendarModule,
    TooltipModule,
    ImageModule,
    TagModule,
    ConfirmDialogModule,
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './owner-view-payment-advice.component.html',
  styleUrl: './owner-view-payment-advice.component.scss'
})
export class OwnerViewPaymentAdviceComponent {
  paymentAdvice: PaymentAdviceDto;

  openDialogRef: DynamicDialogRef;

  totalAmmount: number = 0;
  totalAmountDue: number = 0;

  admin: UserDTO;
  paymentAdviceStatus = PaymentAdviseStatus;
  paymentAdviceType = PAType;

  adminProfileUri: string;
  penalty: PenaltyDetailsDTO;
  paymentDate: Date = new Date();
  isPenaltyWrittenOff: boolean = false;

  public applyPenaltySetting: boolean = false;
  constructor(
    private config: DynamicDialogConfig,
    private dialogService: DialogService,
    private authService: AuthService,
    private router: Router,
    private ref: DynamicDialogRef,
    private paymentAdviceDataService: PaymentAdviceDataService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private pdfGeneratorDataService: PDFGeneratorDataService,
    private systemSettingService: SystemSettingService,
    private userDataService: UserDataService
  ) {
    this.paymentAdvice = this.config.data;
    this.isPenaltyWrittenOff = this.paymentAdvice.writeOffPenalty;
  }


  onDateSelected(event: any) {
    this.calculatePenaltyAmount();
    console.log('Selected date:', this.paymentDate);
  }

  calculatePenaltyAmount() {
    if (this.applyPenaltySetting) {
      this.paymentAdviceDataService
        .GetPenaltyByPaymentAdviceWithDate(this.paymentAdvice.id, this.paymentDate)
        .subscribe({
          next: (penalty) => {
            this.penalty = penalty;
            this.totalAmmount = this.paymentAdvice.totalAmount;
            if (this.paymentAdvice.writeOffPenalty) {
              this.totalAmountDue = this.paymentAdvice.amountDue;
            } else {
              this.totalAmountDue =
                this.paymentAdvice.amountDue +
                penalty.totalPenalty;
              console.log("overall penalty", this.totalAmountDue);
              console.log("overdue days", penalty.daysOverDue);
            }
          },
        });
    } else {
      this.totalAmmount = this.paymentAdvice.totalAmount;
      this.totalAmountDue = this.paymentAdvice.amountDue;
    }

  }

  goToTenantDetailedView(tenantId: number) {
    this.router.navigate([`/admin/master-users/tenant/${tenantId}`]);
  }

  async ngOnInit() {
    this.userDataService
      .GetAdminDetails(this.authService.GetCurrentRole().adminId)
      .subscribe((res) => {
        this.admin = res;
        this.adminProfileUri = API_URL + '/' + this.admin.profileUri;
      });
    const admId = this.authService.GetAuthenticatedUser().id;
    console.log(this.authService.GetAuthenticatedUser());
    const penaltySetting: PenaltySettingDTO = await this.paymentAdviceDataService.GetPenaltySettings(admId).toPromise();
    this.applyPenaltySetting = penaltySetting.isPenaltyEnabled == 1 && this.paymentAdvice.type !== PAType.SD ? true : false;
    console.log("applyPenaltySetting", this.applyPenaltySetting);
    await this.calculatePenaltyAmount();
  }

  receivePayment() {
    this.paymentAdvice.paymentDate = this.paymentDate;
    this.openDialogRef = this.dialogService.open(
      OwnerReceivedPaymentModalComponent,
      {
        header: 'Receive Payment',
        width: 'max-content',
        data: [this.paymentAdvice],
      }
    );
    this.openDialogRef.onClose.subscribe((res) => {
      if (res && res.status === 200) {
        this.ref.close({ status: 200 });
      }
    });
  }

  getTagSeverity(status: string): string {
    switch (status) {
      case 'PAID':
        return 'success';
      case 'DUE':
        return 'danger';
      case 'PARTIAL_PAID':
        return 'warning';
      default:
        return 'info';
    }
  }

  confirmWriteOffPenalty(item: PaymentAdviceDto) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Write off penalty?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.paymentAdviceDataService
          .WriteOffPenalty({
            paymentAdviceId: item.id,
          })
          .subscribe({
            next: (res) => {
              if (res) {
                this.isPenaltyWrittenOff = true;
                this.messageService.add({
                  severity: 'info',
                  summary: 'Writted Off',
                  detail: 'Penalty has been writted off',
                });
              }
            },
          });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
          life: 3000,
        });
      },
    });
  }

  confirmRevertWriteOffPenalty(item: PaymentAdviceDto) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Revert Write off penalty?',
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      acceptIcon: 'none',
      rejectIcon: 'none',
      rejectButtonStyleClass: 'p-button-text',
      accept: () => {
        this.paymentAdviceDataService
          .RevertWriteOffPenalty({
            paymentAdviceId: item.id,
          })
          .subscribe({
            next: (res) => {
              if (res) {
                this.isPenaltyWrittenOff = false;
                this.messageService.add({
                  severity: 'info',
                  summary: 'Apply Penalty',
                  detail: 'Penalty has been applied',
                });
              }
            },
          });
      },
      reject: () => {
        this.messageService.add({
          severity: 'error',
          summary: 'Rejected',
          detail: 'You have rejected',
          life: 3000,
        });
      },
    });
  }

  downloadAdvicePdf() {
    this.messageService.add({
      severity: 'info',
      summary: 'Downloading',
      detail: 'downloading...',
    });
    this.pdfGeneratorDataService
      .DownloadPaymentAdvicePDF(this.paymentAdvice.id)
      .subscribe((blob: Blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'payment_advice.pdf';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        this.messageService.add({
          severity: 'success',
          summary: 'Downloaded',
          detail: 'Payment Advice has been downloaded.Please check your downloads.',
          life: 3000,
        });
      });
  }

}
