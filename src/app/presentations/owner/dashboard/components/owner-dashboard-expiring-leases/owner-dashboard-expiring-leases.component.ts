import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { LeaseAgreementDataService } from 'src/app/core/dataservice/lease/lease-agreement.dataservice';
import { AuthService } from 'src/app/core/dataservice/users-and-auth/auth.service';
import { LEASESTATUS, LEASETYPE } from 'src/app/core/constants/enums';
import { LeaseAgreeementDTO } from 'src/app/core/dataservice/lease/lease-agreement.dto';

@Component({
    selector: 'app-owner-dashboard-expiring-leases',
    templateUrl: './owner-dashboard-expiring-leases.component.html',
    standalone: true,
    imports: [
        CommonModule,
        CardModule,
        TableModule,
        ButtonModule,
        TooltipModule,
        ProgressSpinnerModule,
    ],
})
export class OwnerDashboardExpiringLeasesComponent implements OnInit {
    expiringLeases: LeaseAgreeementDTO[] = [];
    loading: boolean = true;

    constructor(
        private leaseAgreementDataService: LeaseAgreementDataService,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit() {
        this.loadExpiringLeases();
    }

    loadExpiringLeases() {
        const queryParams = {
            pageNo: 0,
            pageSize: 5, // Show first 5 expiring leases
        };

        this.loading = true;
        // this.leaseAgreementDataService
        //     .GetAllUpcomingExpiryLeaseByAdminPaginated(
        //         this.authService.GetCurrentRole().adminId,
        //         queryParams
        //     )
        //     .subscribe({
        //         next: (response) => {
        //             this.expiringLeases = response.data;
        //             this.loading = false;
        //         },
        //         error: (error) => {
        //             console.error('Error fetching expiring leases:', error);
        //             this.loading = false;
        //         },
        //     });
    }

    computeMonthlyPayable(lease: LeaseAgreeementDTO): number {
        let total = lease.rent;
        if (lease.leaseSurcharges) {
            total += lease.leaseSurcharges.reduce(
                (sum, surcharge) => sum + surcharge.amount,
                0
            );
        }
        return total;
    }

    calculateDaysUntilExpiry(endDate: string): number {
        const end = new Date(endDate);
        const today = new Date();
        const diffTime = end.getTime() - today.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }

    formatDate(date: string): string {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    }

    getPropertyDetails(lease: LeaseAgreeementDTO): string {
        switch (lease.type) {
            case LEASETYPE.UNIT:
                return `Unit ${lease.unit?.floorLevel}-${lease.unit?.unitNumber}`;
            case LEASETYPE.BUILDING:
                return `Building ${lease.building?.buildingNumber}`;
            case LEASETYPE.LAND:
                return `Plot ${lease.plot?.id}`;
            default:
                return 'Unknown Property';
        }
    }

    getStatusClass(status: string): string {
        switch (status) {
            case LEASESTATUS.ACTIVE:
                return 'bg-green-100 text-green-700 px-1';
            case LEASESTATUS.UPCOMING_EXPIRATION:
                return 'bg-yellow-100 text-yellow-700 px-1';
            case LEASESTATUS.EXPIRED:
                return 'bg-red-100 text-red-700 px-1';
            default:
                return 'bg-gray-100 text-gray-700 px-1';
        }
    }

    getStatusText(status: string): string {
        switch (status) {
            case LEASESTATUS.ACTIVE:
                return 'Active';
            case LEASESTATUS.UPCOMING_EXPIRATION:
                return 'Expiring Soon';
            case LEASESTATUS.EXPIRED:
                return 'Expired';
            default:
                return status;
        }
    }

    viewLease(lease: LeaseAgreeementDTO) {
        this.router.navigate(['/lease', lease.id]);
    }

    renewLease(lease: LeaseAgreeementDTO) {
        // TODO: Implement lease renewal logic with proper dialog and confirmation
        this.router.navigate(['/lease/renew', lease.id]);
    }
}
