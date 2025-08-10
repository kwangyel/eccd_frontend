import { CommonModule } from '@angular/common';
import { AfterViewChecked, Component, OnInit } from '@angular/core';

// PrimeNG Modules
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { GalleriaModule } from 'primeng/galleria';
import { MeterGroupModule } from 'primeng/metergroup';
import { ProgressBarModule } from 'primeng/progressbar';
import { TabViewModule } from 'primeng/tabview';
import { TooltipModule } from 'primeng/tooltip';
import { TagModule } from 'primeng/tag';

// Services
import { AuthService } from 'src/app/core/dataservice/users-and-auth/auth.service';
import { StatsDataService } from 'src/app/core/dataservice/statistics/statistics.dataservice';

// Models/DTOs
import { AuthenticatedUserDTO } from 'src/app/core/dataservice/users-and-auth/dto/auth.dto';
import { PaymentAdviceSummaryDTO } from 'src/app/core/dto/payments/payment-advice.dto';
import { AdminSummaryStatisticsDTO } from 'src/app/core/dataservice/statistics/statistics.dto';

// Components
import { OwnerDashboardPendingPaymentsComponent } from './components/owner-dashboard-pending-payments/owner-dashboard-pending-payments.component';
import { OwnerDashboardExpiringLeasesComponent } from './components/owner-dashboard-expiring-leases/owner-dashboard-expiring-leases.component';
import { OwnerDashboardBroadcastSmsComponent } from './components/owner-dashboard-broadcast-sms/owner-dashboard-broadcast-sms.component';
import { OwnerDashboardMaintenanceComponent } from './components/owner-dashboard-maintenance/owner-dashboard-maintenance.component';
import { ThramDataService } from 'src/app/core/dataservice/land/thram.dataservice';
import { ThramDTO } from 'src/app/core/dataservice/land/dto/thram.dto';
import { PaymentAdviceDataService } from 'src/app/core/dataservice/payments/payment-advice.dataservice';
import { LeaseAgreeementDTO } from 'src/app/core/dataservice/lease/lease-agreement.dto';
import { LeaseAgreementDataService } from 'src/app/core/dataservice/lease/lease-agreement.dataservice';

@Component({
    selector: 'app-owner-dashbord',
    templateUrl: './owner-dashbord.component.html',
    styleUrls: ['./owner-dashbord.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        CardModule,
        ButtonModule,
        GalleriaModule,
        MeterGroupModule,
        DividerModule,
        TabViewModule,
        ProgressBarModule,
        TooltipModule,
        TagModule,
        OwnerDashboardPendingPaymentsComponent,
        OwnerDashboardExpiringLeasesComponent,
        OwnerDashboardMaintenanceComponent,
    ],
    providers: [DialogService, DialogService],
})
export class OwnerDashbordComponent implements OnInit, AfterViewChecked {
    ref: DynamicDialogRef;
    authenticatedUser: AuthenticatedUserDTO;
    isLoading: boolean = true;

    activeLeaseCount: number = 0;
    expiringLeaseCount: number = 0;

    today: Date = new Date();

    projectAnnualRevenue: number = 0;
    paymentSummaryStats: PaymentAdviceSummaryDTO = {
        totalMonthlyRentalIncome: 0,
        totalSecurityDepositAmount: 0,
        totalPendingRentalAmount: 0,
        totalMonthDueAmount: 0,
        totalPendingSecurityDepositAmount: 0,
    };

    summaryStats: AdminSummaryStatisticsDTO = {
        buildingCount: 0,
        unitCount: 0,
        activeLeaseCount: 0,
        totalRentalIncome: 0,
        pendingPaymentAmount: 0,
        thramCount: 0,
        plotCount: 0,
        pendingPaymentAdviceCount: 0,
        ownerCount: 0,
    };

    constructor(
        private authService: AuthService,
        private dialogService: DialogService,
        private statsService: StatsDataService,
        private thramDataService: ThramDataService,
        private paymentAdviceService: PaymentAdviceDataService,
        private leaseService: LeaseAgreementDataService
    ) {
        this.authenticatedUser = this.authService.GetAuthenticatedUser();
        this.statsService.GetTotalMonthlyRevenue().subscribe({
            next: (res) => {
                this.paymentSummaryStats.totalMonthlyRentalIncome = res;
                this.projectAnnualRevenue = res * 12; // Assuming this is the monthly revenue, multiply by 12 for annual projection
                this.isLoading = false;
            },
            error: (err) => {
                console.error('Error loading total monthly revenue:', err);
                this.isLoading = false;
            }
        });
        this.statsService.GetOccupancy().subscribe({
            next: (res) => {
                this.summaryStats.activeLeaseCount = res.occupiedUnits;
                this.summaryStats.unitCount = res.totalUnits;
                console.log('Occupancy data:', res);
            },
            error: (err) => {
                console.error('Error loading occupancy data:', err);
            }
        });
        this.statsService.GetDueAmount().subscribe({
            next: (res) => {
                this.paymentSummaryStats.totalPendingRentalAmount = res;
            },
            error: (err) => {
                console.error('Error loading due amount:', err);
            }
        });

        this.statsService.GetPropertyStatus().subscribe({
            next: (res) => {
                this.summaryStats.buildingCount = res.totalBuildings;
                this.summaryStats.plotCount = res.totalPlots;
                this.summaryStats.thramCount = res.totalThrams;
            },
            error: (err) => {
                console.error('Error loading property status:', err);
            }
        });
        this.paymentAdviceService.GetDueAmountForMonthOwner().subscribe({
            next: (res) => {
                this.paymentSummaryStats.totalMonthDueAmount = res;
            },
            error: (err) => {
                console.error('Error loading due amount for month:', err);
            }
        });

        this.getActiveLeases();
        this.getExpiringLeases();
    }

    getActiveLeases() {
        this.leaseService.GetAllActiveUnitLeaseByOwner().subscribe({
            next: (res) => {
                this.activeLeaseCount = res.count;
            },
            error: (err) => {
                console.error('Error loading active leases:', err);
            }
        });
    }

    getExpiringLeases() {
        this.leaseService.GetAllExpiringUnitLeaseByOwner().subscribe({
            next: (res) => {
                this.expiringLeaseCount = res.count;
            },
            error: (err) => {
                console.error('Error loading expiring leases:', err);
            }
        });
    }

    ngOnInit() {
        this.loadDashboardData();
    }

    ngAfterViewChecked() { }

    private async loadDashboardData() {
        // try {
        //     // Get owner's current role ID
        //     const currentRole = this.authService.GetCurrentRole();
        //     // Load summary statistics
        //     this.statsService
        //         .GetSummaryStatsByAdmin(currentRole.adminId)
        //         .subscribe({
        //             next: (res) => {
        //                 this.summaryStats = res;
        //                 this.isLoading = false;
        //             },
        //             error: (err) => {
        //                 console.error('Error loading summary stats:', err);
        //                 this.isLoading = false;
        //             },
        //         });
        // } catch (error) {
        //     console.error('Error in loadDashboardData:', error);
        //     this.isLoading = false;
        // }
    }

    roundUp(number: number): number {
        return Math.ceil(number);
    }

    calculateDueProgress(total: number, pending: number): number {
        if (!total || total <= 0) {
            return 0;
        }
        const progress = ((total - pending) / total) * 100;
        return Math.round(Math.min(progress, 100));
    }

    openBroadcastSmsModal(): void {
        this.ref = this.dialogService.open(
            OwnerDashboardBroadcastSmsComponent,
            {
                header: 'Broadcast SMS',
                width: '500px',
                data: {},
            }
        );
    }
}
