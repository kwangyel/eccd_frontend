import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SliderModule } from 'primeng/slider';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DividerModule } from 'primeng/divider';
import { KnobModule } from 'primeng/knob';
import { Subscription } from 'rxjs';
import { FirebaseValveService, ValveData, ValveConnectionStatus } from '../../../../core/services/firebase-valve.service';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-valve-detail',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SliderModule,
    ButtonModule,
    CardModule,
    ConfirmDialogModule,
    ToastModule,
    DividerModule,
    KnobModule,
    TagModule
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './valve-detail.component.html',
  styleUrl: './valve-detail.component.scss'
})
export class ValveDetailComponent implements OnInit, OnDestroy {
  currentValvePosition: number = 0;
  targetValvePosition: number = 0;
  isValveAdjusting: boolean = false;
  connectionStatus: ValveConnectionStatus = { connected: false, message: 'Not Connected' };
  valveData: ValveData | null = null;
  lastUpdated: string = '--';

  private subscriptions: Subscription[] = [];

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private firebaseValveService: FirebaseValveService
  ) {}

  ngOnInit(): void {
    // Subscribe to valve data updates
    const valveDataSub = this.firebaseValveService.valveData$.subscribe(data => {
      if (data) {
        this.valveData = data;
        this.currentValvePosition = data.position || 0;
        this.targetValvePosition = this.currentValvePosition;
        this.lastUpdated = data.last_updated || new Date().toLocaleString();
        
        if (data.error && data.error !== "NA") {
          this.showError(data.error);
        }
      }
    });

    // Subscribe to connection status updates
    const connectionSub = this.firebaseValveService.connectionStatus$.subscribe(status => {
      this.connectionStatus = status;
      if (!status.connected) {
        this.messageService.add({
          severity: 'warn',
          summary: 'Connection Issue',
          detail: status.message
        });
      }
    });

    this.subscriptions.push(valveDataSub, connectionSub);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onSliderChange(event: any) {
    this.targetValvePosition = event.value;
  }

  confirmValveAdjustment() {
    if (!this.firebaseValveService.isConnected()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Connection Error',
        detail: 'Please wait for Firebase connection to be established'
      });
      return;
    }

    this.confirmationService.confirm({
      message: `Are you sure you want to set the valve to ${this.targetValvePosition}% open?`,
      header: 'Confirm Valve Adjustment',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Yes, Apply',
      rejectLabel: 'Cancel',
      accept: () => {
        this.applyValveSettings();
      },
      reject: () => {
        // Reset slider to current position if cancelled
        this.targetValvePosition = this.currentValvePosition;
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelled',
          detail: 'Valve adjustment was cancelled'
        });
      }
    });
  }

  private async applyValveSettings() {
    this.isValveAdjusting = true;
    
    this.messageService.add({
      severity: 'info',
      summary: 'Adjusting Valve',
      detail: `Setting valve to ${this.targetValvePosition}% open...`
    });

    try {
      await this.firebaseValveService.setValvePosition(this.targetValvePosition);
      
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: `Valve command sent successfully. Position: ${this.targetValvePosition}% open`
      });
    } catch (error: any) {
      console.error('Error setting valve position:', error);
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: `Failed to set valve position: ${error.message}`
      });
      // Reset slider to current position on error
      this.targetValvePosition = this.currentValvePosition;
    } finally {
      this.isValveAdjusting = false;
    }
  }

  setPresetPosition(position: number) {
    if (!this.firebaseValveService.isConnected()) {
      this.messageService.add({
        severity: 'error',
        summary: 'Connection Error',
        detail: 'Please wait for Firebase connection to be established'
      });
      return;
    }

    this.targetValvePosition = position;
    this.confirmValveAdjustment();
  }

  private showError(message: string) {
    this.messageService.add({
      severity: 'error',
      summary: 'Valve Error',
      detail: message
    });
  }

  getValveStatusColor(): string {
    if (this.currentValvePosition === 0) return '#27ae60'; // Green for open
    if (this.currentValvePosition === 90) return '#e74c3c'; // Red for closed
    if (this.currentValvePosition < 25) return '#27ae60'; // Green for mostly open
    if (this.currentValvePosition < 75) return '#f1c40f'; // Yellow for medium
    return '#f39c12'; // Orange for mostly closed
  }

  getValveStatusText(): string {
    if (this.currentValvePosition === 0) return 'Fully Open';
    if (this.currentValvePosition === 90) return 'Fully Closed';
    return `${this.currentValvePosition}% Closed`;
  }
}
