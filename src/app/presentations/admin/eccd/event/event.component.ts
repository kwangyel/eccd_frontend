import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, CalendarModule],
  templateUrl: './event.component.html',
  styleUrl: './event.component.scss'
})
export class EventComponent {
  readonly today = new Date();
  selectedDate = new Date(this.today);
  editingEventId: number | null = null;

  readonly eventForm: FormGroup;
  events: CalendarEvent[] = [
    {
      id: 1,
      title: 'Volunteer orientation',
      date: this.toDateString(this.today),
      startTime: '09:00',
      endTime: '10:30',
      description: 'Welcome session for new volunteer cohort.'
    },
    {
      id: 2,
      title: 'Fundraising call',
      date: this.toDateString(this.addDays(this.today, 2)),
      startTime: '15:00',
      endTime: '16:00',
      description: 'Quarterly donor update with ECCD partners.'
    }
  ];

  constructor(private readonly fb: FormBuilder) {
    this.eventForm = this.fb.group({
      title: ['', Validators.required],
      date: [new Date(this.selectedDate), Validators.required],
      startTime: [''],
      endTime: [''],
      description: ['']
    });
    this.startCreate();
  }

  get eventsForSelectedDate(): CalendarEvent[] {
    return this.events
      .filter(event => this.isSameDay(event.date, this.selectedDate))
      .sort((a, b) => (a.startTime || '').localeCompare(b.startTime || ''));
  }

  onDateChange(date: Date | undefined): void {
    if (!date) {
      return;
    }
    this.selectedDate = date;
    if (!this.editingEventId) {
      this.eventForm.patchValue({ date: new Date(date) });
    }
  }

  startCreate(): void {
    this.editingEventId = null;
    this.eventForm.reset({
      title: '',
      date: new Date(this.selectedDate),
      startTime: '',
      endTime: '',
      description: ''
    });
  }

  startEdit(event: CalendarEvent): void {
    this.editingEventId = event.id;
    this.eventForm.patchValue({
      title: event.title,
      date: new Date(event.date),
      startTime: event.startTime ?? '',
      endTime: event.endTime ?? '',
      description: event.description ?? ''
    });
  }

  deleteEvent(id: number): void {
    this.events = this.events.filter(event => event.id !== id);
    if (this.editingEventId === id) {
      this.startCreate();
    }
  }

  submit(): void {
    if (this.eventForm.invalid) {
      this.eventForm.markAllAsTouched();
      return;
    }

    const formValue = this.eventForm.value;
    const normalizedDate = this.toDateString(formValue.date as Date);
    const payload: CalendarEvent = {
      id: this.editingEventId ?? this.generateId(),
      title: formValue.title,
      date: normalizedDate,
      startTime: formValue.startTime || '',
      endTime: formValue.endTime || '',
      description: formValue.description || ''
    };

    if (this.editingEventId) {
      this.events = this.events.map(event =>
        event.id === this.editingEventId ? payload : event
      );
    } else {
      this.events = [...this.events, payload];
    }

    this.selectedDate = new Date(payload.date);
    this.startCreate();
  }

  private generateId(): number {
    return this.events.length ? Math.max(...this.events.map(event => event.id)) + 1 : 1;
  }

  private toDateString(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private isSameDay(dateString: string, date: Date): boolean {
    return dateString === this.toDateString(date);
  }

  private addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  eventsOn(date: Date): CalendarEvent[] {
    const key = this.toISODateString(date);
    return this.events.filter(e => e.date === key);
  }

  private toISODateString(date: Date): string {
    const y = date.getFullYear();
    const m = (date.getMonth() + 1).toString().padStart(2, '0');
    const d = date.getDate().toString().padStart(2, '0');
    return `${y}-${m}-${d}`;
  }

  hasEvents(date: Date): boolean {
    return this.eventsOn(date).length > 0;
  }

}

export interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  startTime?: string;
  endTime?: string;
  description?: string;
}
