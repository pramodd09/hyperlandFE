import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { UserRouterModule } from './user.router';
import { AgmCoreModule } from '@agm/core';

import * as hljs from 'highlight.js';
import { HighlightJsModule, HIGHLIGHT_JS } from 'angular-highlight-js';
import * as hljsTypescript from 'highlight.js/lib/languages/typescript';
import { MatButtonModule, MatDialogModule, MatFormField, MatIconModule, MatTableModule, MatCardModule, MatPaginatorModule, MatSortModule, MatInputModule, MatGridListModule, MatSnackBarModule, MatOptionModule, MatSelectModule, MatProgressBarModule, MatAutocompleteModule } from '@angular/material';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MasterAgentComponent, DialogOverviewAgentDialog } from './user-agent/user-agent.component';
import { DeleteAgentConfirmBoxDialog } from './user-agent/user-delete-confirm-box.component';
//8import { LeafletMapComponent } from './leaflet-map/leaflet-map.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material/expansion';
import { DeleteDailyExpenseConfirmBoxDialog } from './dailyexpense/dailyexpense-delete-confirm-box.component';
import { DialogOverviewDailyExpenseDialog, MasterDailyExpenseComponent } from './dailyexpense/dailyexpense.component';





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
    MatIconModule,
    MatInputModule,
    MatSnackBarModule,
    MatOptionModule,
    MatSelectModule,
    MatProgressBarModule,
    MatExpansionModule,
    MatAutocompleteModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAXTJwhYqJ6Pc7VXGRMTv40N1WRLqzuSNs'
    }),
    HighlightJsModule.forRoot({
      provide: HIGHLIGHT_JS,
      useFactory: highlightJsFactory
    }),
    UserRouterModule
  ],
  entryComponents: [

                      DeleteAgentConfirmBoxDialog,
                      DialogOverviewAgentDialog,
                      DialogOverviewDailyExpenseDialog,
                      DeleteDailyExpenseConfirmBoxDialog,
                    ],
  declarations: [
                          DeleteAgentConfirmBoxDialog,
                          DialogOverviewAgentDialog,
                          MasterAgentComponent,
                          DialogOverviewDailyExpenseDialog,
                          DeleteDailyExpenseConfirmBoxDialog,
                          MasterDailyExpenseComponent,
],

  exports: [
    ],
    
      
})
export class UserModule { }
