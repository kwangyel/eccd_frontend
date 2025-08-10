import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
    selector: 'app-maintenance-request-details',
    standalone: true,
    imports: [CommonModule, CardModule, ButtonModule, DividerModule, TagModule],
    template: `
        <div class="surface-ground p-4 border-round">
            <div class="surface-card p-4 shadow-2 border-round">
                <div
                    class="flex justify-content-between align-items-start mb-4"
                >
                    <div>
                        <p class="text-xl font-bold mb-2">
                            {{ request.category }}
                        </p>
                        <p-tag
                            [value]="request.status"
                            [severity]="getStatusSeverity(request.status)"
                            class="mr-2"
                        ></p-tag>
                        <p-tag
                            [value]="request.priority"
                            [severity]="getPrioritySeverity(request.priority)"
                        ></p-tag>
                    </div>
                    <p class="text-sm text-600">
                        Reported on {{ formatDate(request.reportedDate) }}
                    </p>
                </div>

                <p-divider></p-divider>

                <div class="grid">
                    <div class="col-12 md:col-6">
                        <h3 class="font-semibold mb-2">Property Details</h3>
                        <p class="mb-2">
                            <span class="font-semibold">Unit:</span>
                            {{ request.unit.floorLevel }}-{{
                                request.unit.unitNumber
                            }}
                        </p>
                        <p class="mb-2">
                            <span class="font-semibold">Building:</span>
                            {{ request.building.name }}
                        </p>
                    </div>

                    <div class="col-12 md:col-6">
                        <h3 class="font-semibold mb-2">Tenant Information</h3>
                        <p class="mb-2">
                            <span class="font-semibold">Name:</span>
                            {{ request.tenant.nameEnglish }}
                        </p>
                        <p class="mb-2">
                            <span class="font-semibold">Phone:</span>
                            {{ request.tenant.phoneNumber }}
                        </p>
                    </div>
                </div>

                <p-divider></p-divider>

                <div>
                    <h3 class="font-semibold mb-2">Issue Description</h3>
                    <p class="line-height-3">{{ request.description }}</p>
                </div>

                <p-divider></p-divider>

                <div class="flex justify-content-end gap-2">
                    <p-button
                        *ngIf="request.status === 'PENDING'"
                        label="Mark as Resolved"
                        icon="pi pi-check"
                        (onClick)="resolveRequest()"
                    ></p-button>
                    <p-button
                        label="Close"
                        severity="secondary"
                        (onClick)="close()"
                    ></p-button>
                </div>
            </div>
        </div>
    `,
})
export class MaintenanceRequestDetailsComponent implements OnInit {
    request: any;

    constructor(
        private config: DynamicDialogConfig,
        private ref: DynamicDialogRef
    ) {}

    ngOnInit() {
        this.request = this.config.data;
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
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    resolveRequest() {
        this.request.status = 'RESOLVED';
        this.ref.close({ updated: true });
    }

    close() {
        this.ref.close();
    }
}
