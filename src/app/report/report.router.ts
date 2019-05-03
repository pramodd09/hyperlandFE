import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingReportComponent } from './booking-report/booking-report.component';
import { CustomerReportComponent } from './customer-report/customer-report.component';
import { TransactionReportComponent } from './transaction-report/transaction-report.component';
import { NetworkReport } from './network-leg-report/network-report.component';

const reportRoutes: Routes = [
    {path: 'bookingreport', component: BookingReportComponent , data: { animation: 'masterfirm' }},
    {path: 'customerreport', component: CustomerReportComponent , data: { animation: 'masterfirm' }},
    {path: 'transactionreport', component: TransactionReportComponent , data: { animation: 'masterfirm' }},
    {path: 'networkreport', component: NetworkReport , data: { animation: 'networkreport' }}

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