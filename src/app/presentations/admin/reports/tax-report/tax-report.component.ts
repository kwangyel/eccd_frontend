import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type TaxCategory = 'corporate' | 'withholding' | 'sales';
type FilingStatus = 'onTime' | 'submitted' | 'pending';

interface TaxLiability {
  jurisdiction: string;
  taxType: TaxCategory;
  period: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue';
  note?: string;
}

interface TaxPayment {
  reference: string;
  taxType: TaxCategory;
  amount: number;
  paymentDate: string;
  method: 'ACH' | 'Wire' | 'Check';
  confirmationId: string;
}

interface FilingSchedule {
  form: string;
  taxType: TaxCategory;
  frequency: 'Monthly' | 'Quarterly' | 'Annual';
  nextDueDate: string;
  status: FilingStatus;
}

@Component({
  selector: 'app-tax-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tax-report.component.html',
  styleUrl: './tax-report.component.scss'
})
export class TaxReportComponent {
  reportingYear = new Date().getFullYear();
  jurisdictionFilter = 'All';

  readonly jurisdictions = ['All', 'Thimphu', 'Paro', 'Sarpang', 'Punakha'];

  readonly taxLiabilities: TaxLiability[] = [
    {
      jurisdiction: 'Thimphu',
      taxType: 'corporate',
      period: 'FY Q2',
      amount: 142_500,
      dueDate: '2025-07-15',
      status: 'pending',
      note: 'Estimated installment'
    },
    {
      jurisdiction: 'Paro',
      taxType: 'withholding',
      period: 'May 2025',
      amount: 28_600,
      dueDate: '2025-06-10',
      status: 'paid'
    },
    {
      jurisdiction: 'Sarpang',
      taxType: 'sales',
      period: 'May 2025',
      amount: 18_950,
      dueDate: '2025-06-20',
      status: 'pending'
    },
    {
      jurisdiction: 'Thimphu',
      taxType: 'withholding',
      period: 'Apr 2025',
      amount: 27_300,
      dueDate: '2025-05-10',
      status: 'overdue',
      note: 'Late filing surcharge applied'
    }
  ];

  readonly taxPayments: TaxPayment[] = [
    {
      reference: 'BTN-PL-9821',
      taxType: 'withholding',
      amount: 27_300,
      paymentDate: '2025-05-18',
      method: 'ACH',
      confirmationId: 'ACH220984'
    },
    {
      reference: 'BTN-CIT-4492',
      taxType: 'corporate',
      amount: 135_000,
      paymentDate: '2025-04-15',
      method: 'Wire',
      confirmationId: 'WIRE889123'
    },
    {
      reference: 'BTN-ST-2210',
      taxType: 'sales',
      amount: 17_640,
      paymentDate: '2025-05-25',
      method: 'ACH',
      confirmationId: 'ACH220115'
    }
  ];

  readonly filingSchedules: FilingSchedule[] = [
    {
      form: 'BIT/CIT 300',
      taxType: 'corporate',
      frequency: 'Quarterly',
      nextDueDate: '2025-07-15',
      status: 'pending'
    },
    {
      form: 'PIT-WH 1099',
      taxType: 'withholding',
      frequency: 'Monthly',
      nextDueDate: '2025-06-10',
      status: 'onTime'
    },
    {
      form: 'BOS/ST 402',
      taxType: 'sales',
      frequency: 'Monthly',
      nextDueDate: '2025-06-20',
      status: 'submitted'
    }
  ];

  get filteredLiabilities(): TaxLiability[] {
    if (this.jurisdictionFilter === 'All') {
      return this.taxLiabilities;
    }
    return this.taxLiabilities.filter(
      (liability) => liability.jurisdiction === this.jurisdictionFilter
    );
  }

  get totalLiabilities(): number {
    return this.sumAmounts(this.filteredLiabilities);
  }

  get outstandingBalance(): number {
    return this.sumAmounts(this.filteredLiabilities.filter((item) => item.status !== 'paid'));
  }

  get totalPayments(): number {
    return this.sumAmounts(this.taxPayments);
  }

  get netTaxDue(): number {
    return Math.max(this.totalLiabilities - this.totalPayments, 0);
  }

  get overdueExposure(): number {
    return this.sumAmounts(this.filteredLiabilities.filter((item) => item.status === 'overdue'));
  }

  get complianceScore(): number {
    const filed = this.filingSchedules.filter((item) => item.status !== 'pending').length;
    return this.safeDivide(filed, this.filingSchedules.length);
  }

  get payoutCoverage(): number {
    const averageMonthlyExpense = 580_000 / 12;
    return this.safeDivide(this.totalPayments, averageMonthlyExpense);
  }

  refreshReport(): void {
    console.log(
      'Tax report refreshed for year',
      this.reportingYear,
      'jurisdiction',
      this.jurisdictionFilter
    );
  }

  trackByLiability = (_: number, liability: TaxLiability): string =>
    `${liability.taxType}-${liability.period}-${liability.jurisdiction}`;

  trackByPayment = (_: number, payment: TaxPayment): string => payment.reference;

  trackBySchedule = (_: number, schedule: FilingSchedule): string => schedule.form;

  private sumAmounts<T extends { amount: number }>(items: T[]): number {
    return items.reduce((total, item) => total + item.amount, 0);
  }

  private safeDivide(numerator: number, denominator: number): number {
    if (!denominator) {
      return 0;
    }
    return numerator / denominator;
  }
}
