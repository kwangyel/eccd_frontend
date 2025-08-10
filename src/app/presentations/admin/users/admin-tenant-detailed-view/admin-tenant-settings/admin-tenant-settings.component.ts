import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { AuthService } from 'src/app/core/dataservice/users-and-auth/auth.service';

@Component({
  selector: 'app-admin-tenant-settings',
  standalone: true,
  imports: [
    CommonModule,
    ConfirmDialogModule,
    ButtonModule,
  ],
  providers: [ConfirmationService],
  templateUrl: './admin-tenant-settings.component.html',
  styleUrl: './admin-tenant-settings.component.scss'
})
export class AdminTenantSettingsComponent implements OnInit {
  @Input({ required: true }) tenantId: number;

  constructor(
    private confirmationService: ConfirmationService,
    private messageService: MessageService,
    private authService: AuthService,
  ) { }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }


  resetLogin() {
    console.log('Resetting login for tenant:', this.tenantId);

    this.authService
      .ResetLoginForUser(this.tenantId)
      .subscribe({
        next: (res) => {
          if (res) {
            this.messageService.add({
              severity: 'success',
              summary: 'Login Reset',
              detail:
                'Login reset for tenant'
            });
          }
        },
        error: (err) => {
          this.messageService.add({
            severity: 'info',
            summary: 'Error',
            detail: err.error.message,
          });
        },
      });
  }
}
