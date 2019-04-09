import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { AgmCoreModule } from '@agm/core';
import * as hljs from 'highlight.js';
import { HighlightJsModule, HIGHLIGHT_JS } from 'angular-highlight-js';
import * as hljsTypescript from 'highlight.js/lib/languages/typescript';
import { MatButtonModule, MatDialogModule, MatFormField, MatIconModule, MatTableModule, MatCardModule, MatPaginatorModule, MatSortModule, MatInputModule, MatGridListModule, MatSnackBarModule, MatOptionModule, MatSelectModule, MatNativeDateModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AccountsRouterModule } from './accounts.router';
import { FarmerPaymentDetailsComponent } from './farmer-payment-details/farmer-payment-details.component';
import { FarmerPaymentDetailsDialog } from './farmer-payment-details/create-farmer-payment.component';
import { AssociatePaymentDetailsComponent } from './associate-payment-details/associate-payment-details.component';
import { AssociatePaymentDetailsDialog } from './associate-payment-details/create-associate-payment.component';




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
    AssociatePaymentDetailsDialog
                    ],
  declarations: [
    FarmerPaymentDetailsComponent,
    FarmerPaymentDetailsDialog,
    AssociatePaymentDetailsComponent,
    AssociatePaymentDetailsDialog
   // LeafletMapComponent
],

  exports: [
    MatDatepickerModule
    ],
    
      
})
export class AccountsModule { }