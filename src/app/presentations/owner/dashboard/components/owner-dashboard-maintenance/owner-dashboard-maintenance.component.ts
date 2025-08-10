import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { TooltipModule } from 'primeng/tooltip';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TagModule } from 'primeng/tag';
import { TableModule } from 'primeng/table';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { MessageService } from 'primeng/api';
import { MaintenanceRequestDetailsComponent } from '../maintenance-request-details/maintenance-request-details.component';

@Component({
    selector: 'app-owner-dashboard-maintenance',
    standalone: true,
    imports: [
        CommonModule,
        CardModule,
        ButtonModule,
        TooltipModule,
        TagModule,
        TableModule,
        ProgressSpinnerModule,
    ],
    providers: [DialogService, MessageService],
    template: `
        <div>
            <p-card>
                <div class="mb-4">
                    <p class="text-xl font-semibold">Maintenance Requests</p>
                    <p class="text-sm" *ngIf="maintenanceRequests.length">
                        {{ maintenanceRequests.length }} maintenance request(s)
                    </p>
                </div>

                <div *ngIf="loading" class="flex justify-content-center">
                    <p-progressSpinner
                        styleClass="w-4rem h-4rem"
                        strokeWidth="4"
                    />
                </div>

                <div *ngIf="!loading">
                    <p-table
                        [value]="maintenanceRequests"
                        *ngIf="maintenanceRequests.length"
                        styleClass="p-datatable-striped mb-2"
                    >
                        <ng-template pTemplate="header">
                            <tr>
                                <th>Status</th>
                                <th>Property</th>
                                <th>Issue</th>
                                <th>Reported By</th>
                                <th>Date</th>
                                <th>Priority</th>
                                <th></th>
                            </tr>
                        </ng-template>
                        <ng-template pTemplate="body" let-item>
                            <tr>
                                <td>
                                    <p-tag
                                        [value]="item.status"
                                        [severity]="
                                            getStatusSeverity(item.status)
                                        "
                                    ></p-tag>
                                </td>
                                <td>
                                    <div *ngIf="item.unit">
                                        <p class="font-semibold">
                                            {{ item.unit.floorLevel }}-{{
                                                item.unit.unitNumber
                                            }}
                                        </p>
                                        <p
                                            class="text-sm"
                                            *ngIf="item.building"
                                        >
                                            {{ item.building.name }}
                                        </p>
                                    </div>
                                </td>
                                <td>
                                    <p class="font-semibold">
                                        {{ item.category }}
                                    </p>
                                    <p class="text-sm">
                                        {{ truncateText(item.description, 50) }}
                                    </p>
                                </td>
                                <td>
                                    <p class="font-semibold">
                                        {{ item.tenant.nameEnglish }}
                                    </p>
                                    <p class="text-sm">
                                        {{ item.tenant.phoneNumber }}
                                    </p>
                                </td>
                                <td>
                                    {{ formatDate(item.reportedDate) }}
                                </td>
                                <td>
                                    <p-tag
                                        [value]="item.priority"
                                        [severity]="
                                            getPrioritySeverity(item.priority)
                                        "
                                    ></p-tag>
                                </td>
                                <td>
                                    <div class="flex gap-2">
                                        <p-button
                                            size="small"
                                            icon="pi pi-eye"
                                            label="View"
                                            severity="secondary"
                                            pTooltip="View details"
                                            (click)="viewRequest(item)"
                                        ></p-button>
                                        <p-button
                                            *ngIf="item.status === 'PENDING'"
                                            size="small"
                                            icon="pi pi-check"
                                            label="Resolve"
                                            pTooltip="Mark as resolved"
                                            (click)="resolveRequest(item)"
                                        ></p-button>
                                    </div>
                                </td>
                            </tr>
                        </ng-template>
                    </p-table>

                    <div
                        *ngIf="!maintenanceRequests.length"
                        class="text-center p-4"
                    >
                        <p class="font-semibold">No maintenance requests</p>
                    </div>
                </div>
            </p-card>
        </div>
    `,
})
export class OwnerDashboardMaintenanceComponent implements OnInit {
    loading: boolean = true;
    maintenanceRequests: any[] = [];

    // Dummy data for demonstration
    dummyRequests = [
        {
            id: 1,
            status: 'PENDING',
            unit: { floorLevel: '3', unitNumber: 'A' },
            building: { name: 'Rose Apartments' },
            category: 'Plumbing',
            description: 'Water leakage from bathroom ceiling',
            tenant: { nameEnglish: 'John Doe', phoneNumber: '17123456' },
            reportedDate: new Date('2025-06-01'),
            priority: 'HIGH',
        },
        {
            id: 2,
            status: 'IN_PROGRESS',
            unit: { floorLevel: '2', unitNumber: 'B' },
            building: { name: 'Rose Apartments' },
            category: 'Electrical',
            description: 'Power fluctuation in living room',
            tenant: { nameEnglish: 'Jane Smith', phoneNumber: '17789012' },
            reportedDate: new Date('2025-06-02'),
            priority: 'MEDIUM',
        },
        {
            id: 3,
            status: 'RESOLVED',
            unit: { floorLevel: '4', unitNumber: 'C' },
            building: { name: 'Rose Apartments' },
            category: 'HVAC',
            description: 'AC not cooling properly',
            tenant: { nameEnglish: 'Bob Wilson', phoneNumber: '17345678' },
            reportedDate: new Date('2025-06-01'),
            priority: 'LOW',
        },
    ];

    constructor(
        private router: Router,
        private dialogService: DialogService,
        private messageService: MessageService
    ) {}

    ngOnInit() {
        this.loadMaintenanceRequests();
    }

    getStatusSeverity(status: string): string {
        switch (status) {
            case 'PENDING':
                return 'warning';
            case 'IN_PROGRESS':
                return 'info';
            case 'RESOLVED':
                return 'success';
            default:
                return 'info';
        }
    }

    getPrioritySeverity(priority: string): string {
        switch (priority) {
            case 'HIGH':
                return 'danger';
            case 'MEDIUM':
                return 'warning';
            case 'LOW':
                return 'info';
            default:
                return 'info';
        }
    }

    formatDate(date: Date): string {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    }

    truncateText(text: string, maxLength: number): string {
        return text.length > maxLength
            ? text.slice(0, maxLength) + '...'
            : text;
    }

    viewRequest(request: any) {
        const ref = this.dialogService.open(
            MaintenanceRequestDetailsComponent,
            {
                header: 'Maintenance Request Details',
                width: '70%',
                data: request,
            }
        );

        ref.onClose.subscribe((result) => {
            if (result?.updated) {
                this.loadMaintenanceRequests();
            }
        });
    }

    resolveRequest(request: any) {
        request.status = 'RESOLVED';
        this.messageService.add({
            severity: 'success',
            summary: 'Request Resolved',
            detail: `Maintenance request #${request.id} has been marked as resolved.`,
        });
        this.loadMaintenanceRequests();
    }

    private loadMaintenanceRequests() {
        this.loading = true;
        // In real implementation, this would call an API
        setTimeout(() => {
            this.maintenanceRequests = this.dummyRequests;
            this.loading = false;
        }, 1000);
    }
}
