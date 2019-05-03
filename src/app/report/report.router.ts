import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookingReportComponent } from './booking-report/booking-report.component';
import { CustomerReportComponent } from './customer-report/customer-report.component';
import { TransactionReportComponent } from './transaction-report/transaction-report.component';
import { PropertyReportComponent } from './property-report/property-report.component';
import { HoldReportComponent } from './hold-report/hold-report.component';
import { NetworkReport } from './network-leg-report/network-report.component';

const reportRoutes: Routes = [
    {path: 'bookingreport', component: BookingReportComponent , data: { animation: 'masterfirm' }},
    {path: 'customerreport', component: CustomerReportComponent , data: { animation: 'masterfirm' }},
    {path: 'transactionreport', component: TransactionReportComponent , data: { animation: 'masterfirm' }},
    {path: 'networkreport', component: NetworkReport , data: { animation: 'networkreport' }},
    {path: 'propertyreport', component: PropertyReportComponent , data: { animation: 'masterfirm' }},
    {path: 'holdreport', component: HoldReportComponent , data: { animation: 'masterfirm' }}

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
