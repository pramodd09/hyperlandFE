import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingReportComponent } from './booking-report/booking-report.component';
import { CustomerReportComponent } from './customer-report/customer-report.component';
import { TransactionReportComponent } from './transaction-report/transaction-report.component';

const reportRoutes: Routes = [
    {path: 'bookingreport', component: BookingReportComponent , data: { animation: 'masterfirm' }},
    {path: 'customerreport', component: CustomerReportComponent , data: { animation: 'masterfirm' }},
    {path: 'transactionreport', component: TransactionReportComponent , data: { animation: 'masterfirm' }}

]
@NgModule({
  imports: [
    RouterModule.forChild(reportRoutes)
  	],
  exports: [
    RouterModule
  ]
})
export class ReportRouterModule {}