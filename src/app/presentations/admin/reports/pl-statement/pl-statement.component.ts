import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

type RevenueClassification = 'operating' | 'nonOperating';
type ExpenseClassification = 'cogs' | 'operating' | 'nonOperating';

interface StatementLine {
  account: string;
  amount: number;
  note?: string;
}

interface RevenueSection {
  label: string;
  classification: RevenueClassification;
  lines: StatementLine[];
}

interface ExpenseSection {
  label: string;
  classification: ExpenseClassification;
  lines: StatementLine[];
}

@Component({
  selector: 'app-pl-statement',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pl-statement.component.html',
  styleUrl: './pl-statement.component.scss'
})
export class PlStatementComponent {
  readonly reportingPeriod = {
    start: this.formatDateForInput(new Date(new Date().getFullYear(), 0, 1)),
    end: this.formatDateForInput(new Date())
  };

  readonly revenueSections: RevenueSection[] = [
    {
      label: 'Operating Revenue',
      classification: 'operating',
      lines: [
        { account: 'Tuition & Program Fees', amount: 620_000 },
        { account: 'Enrollment Subsidies', amount: 185_250 },
        { account: 'Curriculum Services', amount: 82_400 }
      ]
    },
    {
      label: 'Other Income',
      classification: 'nonOperating',
      lines: [
        { account: 'Grant Income', amount: 45_000, note: 'Restricted fund release' },
        { account: 'Interest Income', amount: 6_750 }
      ]
    }
  ];

  readonly expenseSections: ExpenseSection[] = [
    {
      label: 'Cost of Goods Sold',
      classification: 'cogs',
      lines: [
        { account: 'Instructional Materials', amount: 164_800 },
        { account: 'Program Delivery', amount: 142_500 },
        { account: 'Meals & Transportation', amount: 95_300 }
      ]
    },
    {
      label: 'Operating Expenses',
      classification: 'operating',
      lines: [
        { account: 'Salaries & Benefits', amount: 215_400 },
        { account: 'Facility Operations', amount: 68_250 },
        { account: 'Technology & Licenses', amount: 34_900 },
        { account: 'Professional Development', amount: 18_600 },
        { account: 'Depreciation & Amortization', amount: 27_450 }
      ]
    },
    {
      label: 'Non-operating Expenses',
      classification: 'nonOperating',
      lines: [
        { account: 'Interest Expense', amount: 22_175 },
        { account: 'Community Programs', amount: 12_500 }
      ]
    }
  ];

  get totalRevenue(): number {
    return this.sumSections(this.revenueSections);
  }

  get totalExpenses(): number {
    return this.sumSections(this.expenseSections);
  }

  get operatingRevenue(): number {
    return this.getRevenueClassificationTotal('operating');
  }

  get otherIncome(): number {
    return this.getRevenueClassificationTotal('nonOperating');
  }

  get costOfGoodsSold(): number {
    return this.getSectionTotal(this.expenseSections, 'Cost of Goods Sold');
  }

  get grossProfit(): number {
    return this.operatingRevenue - this.costOfGoodsSold;
  }

  get grossMargin(): number {
    return this.safeDivide(this.grossProfit, this.operatingRevenue);
  }

  get operatingExpenses(): number {
    return this.getExpenseClassificationTotal('operating');
  }

  get operatingIncome(): number {
    return this.grossProfit - this.operatingExpenses;
  }

  get ebitda(): number {
    const depreciation = this.getLineAmount(
      this.expenseSections,
      'Depreciation & Amortization'
    );
    return this.operatingIncome + depreciation;
  }

  get otherExpense(): number {
    return this.getExpenseClassificationTotal('nonOperating');
  }

  get netOtherIncome(): number {
    return this.otherIncome - this.otherExpense;
  }

  get netIncome(): number {
    return this.operatingIncome + this.netOtherIncome;
  }

  get netMargin(): number {
    return this.safeDivide(this.netIncome, this.totalRevenue);
  }

  get periodLabel(): string {
    const start = new Date(this.reportingPeriod.start).toLocaleDateString();
    const end = new Date(this.reportingPeriod.end).toLocaleDateString();
    return `${start} – ${end}`;
  }

  refreshStatement(): void {
    console.log(
      'P/L statement refreshed for period',
      this.reportingPeriod.start,
      this.reportingPeriod.end
    );
  }

  trackByAccount = (_: number, line: StatementLine): string => line.account;

  sectionTotal(section: RevenueSection | ExpenseSection): number {
    return section.lines.reduce((sum, line) => sum + line.amount, 0);
  }

  private sumSections<T extends { lines: StatementLine[] }>(sections: T[]): number {
    return sections.reduce(
      (total, section) =>
        total + section.lines.reduce((sectionTotal, line) => sectionTotal + line.amount, 0),
      0
    );
  }

  private getRevenueClassificationTotal(classification: RevenueClassification): number {
    return this.revenueSections
      .filter((section) => section.classification === classification)
      .reduce((total, section) => total + this.sectionTotal(section), 0);
  }

  private getExpenseClassificationTotal(classification: ExpenseClassification): number {
    return this.expenseSections
      .filter((section) => section.classification === classification)
      .reduce((total, section) => total + this.sectionTotal(section), 0);
  }

  private getSectionTotal(
    sections: Array<RevenueSection | ExpenseSection>,
    label: string
  ): number {
    const section = sections.find((item) => item.label === label);
    if (!section) {
      return 0;
    }
    return this.sectionTotal(section);
  }

  private getLineAmount(
    sections: Array<RevenueSection | ExpenseSection>,
    account: string
  ): number {
    for (const section of sections) {
      const line = section.lines.find((item) => item.account === account);
      if (line) {
        return line.amount;
      }
    }
    return 0;
  }

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
