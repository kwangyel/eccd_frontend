import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type StatusState = 'current' | 'overdue' | 'processing';
type ComplianceState = 'pending' | 'completed' | 'overdue';
type StaffStatus = 'onSite' | 'leave' | 'remote';
type EventType = 'tour' | 'training' | 'parentMeeting';

interface KpiCard {
  label: string;
  value: number;
  unit?: string;
  subtitle: string;
  trend?: number;
}

interface ClassroomSnapshot {
  name: string;
  capacity: number;
  enrolled: number;
  waitlist: number;
  leadTeacher: string;
  nextRatioCheck: string;
}

interface BillingSummary {
  family: string;
  plan: string;
  dueDate: string;
  balance: number;
  status: StatusState;
  note?: string;
}

interface StaffShift {
  name: string;
  role: string;
  shift: string;
  room: string;
  status: StaffStatus;
}

interface ComplianceItem {
  title: string;
  category: string;
  dueDate: string;
  status: ComplianceState;
  owner: string;
}

interface EventItem {
  title: string;
  date: string;
  time: string;
  classroom: string;
  type: EventType;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  readonly centers = ['Taba Campus', 'Babesa Campus', 'City Satellite Center'];
  selectedCenter = this.centers[0];
  reportingDate = this.formatDateForInput(new Date());

  readonly kpiCards: KpiCard[] = [
    {
      label: 'Enrolled Children',
      value: 186,
      unit: 'kids',
      subtitle: 'Licensed capacity 220',
      trend: 4.2
    },
    {
      label: 'Average Attendance',
      value: 92,
      unit: '%',
      subtitle: 'Rolling 30 days',
      trend: 1.3
    },
    {
      label: 'Monthly Revenue',
      value: 436_500,
      subtitle: 'Billing secured',
      trend: 5.8
    },
    {
      label: 'Waitlist',
      value: 38,
      unit: 'families',
      subtitle: 'Most demand: Infant',
      trend: -2.1
    }
  ];

  readonly classrooms: ClassroomSnapshot[] = [
    {
      name: 'Infant (0-12m)',
      capacity: 24,
      enrolled: 22,
      waitlist: 12,
      leadTeacher: 'Tshering Choden',
      nextRatioCheck: '2025-06-14T09:15:00'
    },
    {
      name: 'Toddler (1-2y)',
      capacity: 36,
      enrolled: 34,
      waitlist: 9,
      leadTeacher: 'Pema Lhamo',
      nextRatioCheck: '2025-06-14T10:30:00'
    },
    {
      name: 'Preschool (3-4y)',
      capacity: 48,
      enrolled: 45,
      waitlist: 7,
      leadTeacher: 'Karma Dema',
      nextRatioCheck: '2025-06-14T11:00:00'
    },
    {
      name: 'Pre-K (4-5y)',
      capacity: 48,
      enrolled: 42,
      waitlist: 6,
      leadTeacher: 'Sonam Wangmo',
      nextRatioCheck: '2025-06-14T13:00:00'
    }
  ];

  readonly billingSummary: BillingSummary[] = [
    {
      family: 'Dorji / Infant Program',
      plan: 'Full-time',
      dueDate: '2025-06-20',
      balance: 24_800,
      status: 'current'
    },
    {
      family: 'Lhendup / Toddler Program',
      plan: 'Part-time',
      dueDate: '2025-06-10',
      balance: 8_600,
      status: 'overdue',
      note: 'Auto-pay attempt failed'
    },
    {
      family: 'Choden / Preschool Program',
      plan: 'Extended care',
      dueDate: '2025-06-25',
      balance: 17_200,
      status: 'processing'
    }
  ];

  readonly staffShifts: StaffShift[] = [
    { name: 'Kezang Lham', role: 'Director', shift: '7:30a – 4:00p', room: 'Office', status: 'onSite' },
    { name: 'Namgay Zam', role: 'Infant Lead', shift: '7:00a – 3:30p', room: 'Infant', status: 'onSite' },
    { name: 'Kinley Pelzang', role: 'Toddler Assistant', shift: '9:00a – 6:00p', room: 'Toddler', status: 'remote' },
    { name: 'Ugyen Dolma', role: 'Floater', shift: '10:00a – 7:00p', room: 'All Rooms', status: 'onSite' },
    { name: 'Tandin Wangchuk', role: 'Nutritionist', shift: '6:30a – 3:00p', room: 'Kitchen', status: 'leave' }
  ];

  readonly complianceItems: ComplianceItem[] = [
    {
      title: 'Ratio Audit - Infant Room',
      category: 'Licensing',
      dueDate: '2025-06-15',
      status: 'pending',
      owner: 'Operations'
    },
    {
      title: 'Fire Drill Documentation',
      category: 'Safety',
      dueDate: '2025-06-10',
      status: 'completed',
      owner: 'Facilities'
    },
    {
      title: 'Food Handling Permit Renewal',
      category: 'Nutrition',
      dueDate: '2025-06-05',
      status: 'overdue',
      owner: 'Admin'
    }
  ];

  readonly upcomingEvents: EventItem[] = [
    {
      title: 'Infant Sensory Parent Visit',
      date: '2025-06-16',
      time: '09:30',
      classroom: 'Infant',
      type: 'parentMeeting'
    },
    {
      title: 'New Family Campus Tour',
      date: '2025-06-17',
      time: '11:00',
      classroom: 'Lobby',
      type: 'tour'
    },
    {
      title: 'Mandated Reporter Training',
      date: '2025-06-18',
      time: '14:00',
      classroom: 'Multipurpose',
      type: 'training'
    }
  ];

  refreshDashboard(): void {
    console.log('Dashboard refreshed for', this.selectedCenter, this.reportingDate);
  }

  get utilization(): number {
    const totalCapacity = this.classrooms.reduce((sum, room) => sum + room.capacity, 0);
    const totalEnrolled = this.classrooms.reduce((sum, room) => sum + room.enrolled, 0);
    return this.safeDivide(totalEnrolled, totalCapacity) * 100;
  }

  get waitlistTotal(): number {
    return this.classrooms.reduce((sum, room) => sum + room.waitlist, 0);
  }

  get staffOnsite(): number {
    return this.staffShifts.filter((staff) => staff.status === 'onSite').length;
  }

  get complianceCompletion(): number {
    const completed = this.complianceItems.filter((item) => item.status === 'completed').length;
    return this.safeDivide(completed, this.complianceItems.length) * 100;
  }

  get overdueInvoices(): number {
    return this.billingSummary.filter((bill) => bill.status === 'overdue').length;
  }

  occupancyPercent(classroom: ClassroomSnapshot): number {
    return Math.round(this.safeDivide(classroom.enrolled, classroom.capacity) * 100);
  }

  nextInspectionDate(item: ComplianceItem): Date {
    return new Date(item.dueDate);
  }

  trackByRoom = (_: number, classroom: ClassroomSnapshot): string => classroom.name;
  trackByBill = (_: number, bill: BillingSummary): string => bill.family;
  trackByStaff = (_: number, staff: StaffShift): string => staff.name;
  trackByEvent = (_: number, event: EventItem): string => event.title;
  trackByCompliance = (_: number, item: ComplianceItem): string => item.title;

  private formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  private safeDivide(numerator: number, denominator: number): number {
    if (!denominator) {
      return 0;
    }
    return numerator / denominator;
  }
}
