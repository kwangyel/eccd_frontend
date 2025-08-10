import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
  FormsModule,
    ButtonModule,
    CardModule,
    DividerModule,
    DialogModule,
    InputTextModule,
    InputTextareaModule,
    RippleModule,
    ToastModule,
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {
  demoVisible = false;
  submitting = false;
  year = new Date().getFullYear();
  demoForm = {
    name: '',
    email: '',
    center: '',
    phone: '',
    message: ''
  };

  constructor(private messages: MessageService) {}

  openDemo() {
    this.demoVisible = true;
  }

  submitDemo() {
    if (!this.demoForm.name || !this.demoForm.email) {
      this.messages.add({ severity: 'warn', summary: 'Missing info', detail: 'Please add your name and email.' });
      return;
    }
    this.submitting = true;
    // Simulate submit
    setTimeout(() => {
      this.submitting = false;
      this.demoVisible = false;
      this.messages.add({ severity: 'success', summary: 'Request sent', detail: 'We will reach out shortly.' });
      this.demoForm = { name: '', email: '', center: '', phone: '', message: '' };
    }, 800);
  }
}
