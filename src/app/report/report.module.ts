import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookingReportComponent } from './booking-report/booking-report.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule, MatTableModule, MatCardModule, MatPaginatorModule, MatSortModule, MatGridListModule, MatFormFieldModule, MatIconModule, MatInputModule, MatSnackBarModule, MatOptionModule, MatSelectModule, MatDatepickerModule, MatNativeDateModule, MatProgressBarModule, MatAutocompleteModule } from '@angular/material';
import { ReportRouterModule } from './report.router';
import { CustomerReportComponent } from './customer-report/customer-report.component';
import { TransactionReportComponent } from './transaction-report/transaction-report.component';
import { CustomerTableComponent } from './customer-report/customer-report-table/customer-table.component';
import { TransactionTableComponent } from './transaction-report/transaction-report-table/transaction-table.component';
import { BookingTableComponent } from './booking-report/booking-report-table/booking-table.component';
import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { NetworkReport } from './network-leg-report/network-report.component';
import { OrgChartModule } from 'ng2-org-chart';

@NgModule({
  imports: [   
  
    CommonModule,
      FlexLayoutModule,
      ReactiveFormsModule,
      FormsModule,
      MatButtonModule,
      MatDialogModule,
      MatTableModule,
      MatCardModule,
      MatPaginatorModule,
      MatSortModule,
      MatGridListModule,
      MatFormFieldModule,
      MatIconModule,
      MatInputModule,
      MatSnackBarModule,
      MatOptionModule,
      MatSelectModule,
      ReportRouterModule,
      MatDatepickerModule,
      MatNativeDateModule ,
      MatProgressBarModule,
      Ng2GoogleChartsModule,
      OrgChartModule,
      MatAutocompleteModule
      
      
    ],
    entryComponents: [],
    declarations: [
      BookingReportComponent,
      BookingTableComponent,
      CustomerReportComponent,
      TransactionReportComponent,
      CustomerTableComponent,
      TransactionTableComponent,
      NetworkReport
      
     
  ],
  providers:[
    MatDatepickerModule
  ],
    exports: [
      ],  
})
export class ReportModule { }
