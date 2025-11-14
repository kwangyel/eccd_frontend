import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type CashFlowActivity = 'operating' | 'investing' | 'financing';

interface CashFlowLine {
  account: string;
  amount: number;
  note?: string;
}

interface CashFlowSection {
  label: string;
  activity: CashFlowActivity;
  lines: CashFlowLine[];
}

@Component({
  selector: 'app-cash-flow-statement',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cash-flow-statement.component.html',
  styleUrl: './cash-flow-statement.component.scss'
})
export class CashFlowStatementComponent {
  readonly reportingPeriod = {
    start: this.formatDateForInput(new Date(new Date().getFullYear(), 0, 1)),
    end: this.formatDateForInput(new Date())
  };

  readonly sections: CashFlowSection[] = [
    {
      label: 'Operating Activities',
      activity: 'operating',
      lines: [
        { account: 'Net Income', amount: 158_000 },
        { account: 'Depreciation & Amortization', amount: 27_450 },
        { account: 'Accounts Receivable (Increase)', amount: -18_200 },
        { account: 'Inventory (Increase)', amount: -7_800 },
        { account: 'Accounts Payable Increase', amount: 9_650 },
        { account: 'Deferred Revenue Change', amount: 4_125 }
      ]
    },
    {
      label: 'Investing Activities',
      activity: 'investing',
      lines: [
        { account: 'Capital Expenditures', amount: -96_500 },
        { account: 'Curriculum Development', amount: -24_000 },
        { account: 'Sale of Equipment', amount: 11_750 }
      ]
    },
    {
      label: 'Financing Activities',
      activity: 'financing',
      lines: [
        { account: 'New Debt Issuance', amount: 140_000 },
        { account: 'Debt Repayments', amount: -85_000 },
        { account: 'Grant Drawdowns', amount: 32_500 },
        { account: 'Dividend / Distribution', amount: -12_000 }
      ]
    }
  ];

  openingCashBalance = 210_000;

  get operatingCashFlow(): number {
    return this.sectionTotalByActivity('operating');
  }

  get investingCashFlow(): number {
    return this.sectionTotalByActivity('investing');
  }

  get financingCashFlow(): number {
    return this.sectionTotalByActivity('financing');
  }

  get netCashFlow(): number {
    return this.operatingCashFlow + this.investingCashFlow + this.financingCashFlow;
  }

  get endingCashBalance(): number {
    return this.openingCashBalance + this.netCashFlow;
  }

  get cashCoverageRatio(): number {
    const annualExpenses = 680_000;
    const monthlyExpenses = annualExpenses / 12;
    return this.endingCashBalance / (monthlyExpenses || 1);
  }

  get periodLabel(): string {
    const start = new Date(this.reportingPeriod.start).toLocaleDateString();
    const end = new Date(this.reportingPeriod.end).toLocaleDateString();
    return `${start} – ${end}`;
  }

  refreshStatement(): void {
    console.log(
      'Cash-flow statement refreshed for period',
      this.reportingPeriod.start,
      this.reportingPeriod.end
    );
  }

  trackByAccount = (_: number, line: CashFlowLine): string => line.account;

  sectionTotal(section: CashFlowSection): number {
    return section.lines.reduce((sum, line) => sum + line.amount, 0);
  }

  private sectionTotalByActivity(activity: CashFlowActivity): number {
    return this.sections
      .filter((section) => section.activity === activity)
      .reduce((total, section) => total + this.sectionTotal(section), 0);
  }

  private formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
