import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type BalanceClassification = 'current' | 'longTerm' | 'equity';

interface BalanceSheetLine {
  account: string;
  amount: number;
  note?: string;
}

interface BalanceSheetSection {
  label: string;
  classification: BalanceClassification;
  lines: BalanceSheetLine[];
}

@Component({
  selector: 'app-balance-sheet',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './balance-sheet.component.html',
  styleUrl: './balance-sheet.component.scss'
})
export class BalanceSheetComponent {
  asOfDate = this.formatDateForInput(new Date());

  readonly assets: BalanceSheetSection[] = [
    {
      label: 'Current Assets',
      classification: 'current',
      lines: [
        { account: 'Cash & Cash Equivalents', amount: 185_000 },
        { account: 'Accounts Receivable', amount: 96_500, note: 'Net of allowance' },
        { account: 'Inventory', amount: 72_300 },
        { account: 'Prepaid Expenses', amount: 14_250 }
      ]
    },
    {
      label: 'Non-current Assets',
      classification: 'longTerm',
      lines: [
        { account: 'Property, Plant & Equipment', amount: 540_000 },
        { account: 'Accumulated Depreciation', amount: -165_000 },
        { account: 'Intangible Assets', amount: 48_000 }
      ]
    }
  ];

  readonly liabilities: BalanceSheetSection[] = [
    {
      label: 'Current Liabilities',
      classification: 'current',
      lines: [
        { account: 'Accounts Payable', amount: 64_400 },
        { account: 'Accrued Expenses', amount: 32_150 },
        { account: 'Short-term Borrowings', amount: 45_000 },
        { account: 'Deferred Revenue', amount: 18_950 }
      ]
    },
    {
      label: 'Long-term Liabilities',
      classification: 'longTerm',
      lines: [
        { account: 'Long-term Debt', amount: 280_000 },
        { account: 'Deferred Tax Liabilities', amount: 23_600 }
      ]
    }
  ];

  readonly equity: BalanceSheetSection[] = [
    {
      label: 'Shareholder Equity',
      classification: 'equity',
      lines: [
        { account: 'Common Stock', amount: 350_000 },
        { account: 'Paid-in Capital', amount: 90_000 },
        { account: 'Retained Earnings', amount: 182_950 }
      ]
    }
  ];

  get totalAssets(): number {
    return this.getTotal(this.assets);
  }

  get totalLiabilities(): number {
    return this.getTotal(this.liabilities);
  }

  get totalEquity(): number {
    return this.getTotal(this.equity);
  }

  get totalLiabilitiesAndEquity(): number {
    return this.totalLiabilities + this.totalEquity;
  }

  get workingCapital(): number {
    return (
      this.getSectionTotal(this.assets, 'Current Assets') -
      this.getSectionTotal(this.liabilities, 'Current Liabilities')
    );
  }

  get debtToEquityRatio(): number {
    const denominator = this.totalEquity || 1;
    return this.totalLiabilities / denominator;
  }

  get balanceVariance(): number {
    return this.totalAssets - this.totalLiabilitiesAndEquity;
  }

  get asOfDateLabel(): Date {
    return new Date(this.asOfDate);
  }

  refreshBalanceSheet(): void {
    console.log('Balance sheet refreshed for', this.asOfDateLabel.toDateString());
  }

  trackByAccount = (_: number, line: BalanceSheetLine): string => line.account;

  sectionTotal(section: BalanceSheetSection): number {
    return section.lines.reduce((sum, line) => sum + line.amount, 0);
  }

  private getTotal(sections: BalanceSheetSection[]): number {
    return sections.reduce(
      (total, section) =>
        total +
        section.lines.reduce((sectionTotal, line) => sectionTotal + line.amount, 0),
      0
    );
  }

  private getSectionTotal(sections: BalanceSheetSection[], label: string): number {
    const section = sections.find((item) => item.label === label);
    if (!section) {
      return 0;
    }
    return section.lines.reduce((sum, line) => sum + line.amount, 0);
  }

  private formatDateForInput(date: Date): string {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
}
