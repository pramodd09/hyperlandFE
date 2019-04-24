import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { AgmCoreModule } from '@agm/core';
import * as hljs from 'highlight.js';
import { HighlightJsModule, HIGHLIGHT_JS } from 'angular-highlight-js';
import * as hljsTypescript from 'highlight.js/lib/languages/typescript';
import { MatButtonModule, MatCheckboxModule , MatDialogModule, MatFormField, MatIconModule, MatTableModule, MatCardModule, MatPaginatorModule, MatSortModule, MatInputModule, MatGridListModule, MatSnackBarModule, MatOptionModule, MatSelectModule, MatNativeDateModule,  MatAutocompleteModule, MatRadioButton, MatRadioModule, } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AccountsRouterModule } from './accounts.router';
import { FarmerPaymentDetailsComponent } from './farmer-payment-details/farmer-payment-details.component';
import { FarmerPaymentDetailsDialog } from './farmer-payment-details/create-farmer-payment.component';
import { AssociatePaymentDetailsComponent } from './associate-payment-details/associate-payment-details.component';
import { AssociatePaymentDetailsDialog } from './associate-payment-details/create-associate-payment.component';
import { FarmerPaymentTableComponent } from './farmer-payment-details/farmer-payment-table/farmer-payment-table.component';
import { AgentPaymentTableComponent } from './associate-payment-details/agent-payment-table/agent-payment-table.component';

import { CustomerInstallmentDetailsComponent } from './customer-installment-details/customer-installment-details.component';
import { CustomerInstallmentDetailsDialog } from './customer-installment-details/create-customer-installment.component';
import { CustomerInstallmentTableComponent } from './customer-installment-details/customer-payment-table/customer-installment-table.component';


export function highlightJsFactory(): any {
  hljs.registerLanguage('typescript', hljsTypescript);
  return hljs;
}

@NgModule({
  imports: [
  
  CommonModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatCheckboxModule,
    MatRadioModule, 
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
    MatDatepickerModule,
    MatNativeDateModule,
  MatAutocompleteModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAXTJwhYqJ6Pc7VXGRMTv40N1WRLqzuSNs'
    }),
    HighlightJsModule.forRoot({
      provide: HIGHLIGHT_JS,
      useFactory: highlightJsFactory
    }),
    AccountsRouterModule
  ],
  entryComponents: [
    FarmerPaymentDetailsDialog,
    AssociatePaymentDetailsDialog,
    CustomerInstallmentDetailsDialog,
                    ],
  declarations: [
    FarmerPaymentDetailsComponent,
    FarmerPaymentDetailsDialog,
    AssociatePaymentDetailsComponent,
    AssociatePaymentDetailsDialog,
    FarmerPaymentTableComponent,
    AgentPaymentTableComponent,
    CustomerInstallmentDetailsDialog,
    CustomerInstallmentDetailsComponent,
    CustomerInstallmentTableComponent

],

  exports: [
    MatDatepickerModule
    ],
    
      
})
export class AccountsModule { }
