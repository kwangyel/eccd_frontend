import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BalanceSheetComponent } from './balance-sheet/balance-sheet.component';
import { PlStatementComponent } from './pl-statement/pl-statement.component';
import { TaxReportComponent } from './tax-report/tax-report.component';

const routes: Routes = [
    {
        path: 'balance-sheet',
        component: BalanceSheetComponent
    },
    {
        path: 'profit-and-loss',
        component:PlStatementComponent
    },
    {
        path: 'tax-reports',
        component: TaxReportComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminReportRoutingModule {}
