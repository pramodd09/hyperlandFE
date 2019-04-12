import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { TransactionRouterModule } from './transaction.router';
import { AgmCoreModule } from '@agm/core';
import {MatRadioModule} from '@angular/material/radio';
import * as hljs from 'highlight.js';
import { HighlightJsModule, HIGHLIGHT_JS } from 'angular-highlight-js';
import * as hljsTypescript from 'highlight.js/lib/languages/typescript';
import { MatButtonModule, MatDialogModule, MatFormField, MatIconModule, MatTableModule, MatCardModule, MatPaginatorModule, MatSortModule, MatInputModule, MatGridListModule, MatSnackBarModule, MatOptionModule, MatSelectModule, MatProgressBarModule, MatAutocomplete, MatAutocompleteModule, MatProgressSpinnerModule, MatTabsModule, MatCheckboxModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BookingFormComponent } from './booking-form/booking-form.component';

//8import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { ViewtransactionComponent } from './viewtransaction/viewtransaction.component';
import { ExpensecategoryComponent } from './expensecategory/expensecategory.component';





export function highlightJsFactory(): any {
  hljs.registerLanguage('typescript', hljsTypescript);
  return hljs;
}

@NgModule({
  imports: [
  MatNativeDateModule,
  MatDatepickerModule,
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
    MatRadioModule,
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    MatOptionModule,
    MatSelectModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatTabsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAXTJwhYqJ6Pc7VXGRMTv40N1WRLqzuSNs'
    }),
    HighlightJsModule.forRoot({
      provide: HIGHLIGHT_JS,
      useFactory: highlightJsFactory
    }),
    TransactionRouterModule
  ],
  entryComponents: [


                    ],
  declarations: [

                          BookingFormComponent,

                          ViewtransactionComponent,

                          ExpensecategoryComponent
],

  exports: [
    ],
    
      
})
export class TransactionModule { }
