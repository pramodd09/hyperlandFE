import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource, MatSnackBar ,MatDatepickerModule} from '@angular/material';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { DeleteDailyExpenseConfirmBoxDialog } from './dailyexpense-delete-confirm-box.component';
import { DailyExpense } from '../../model/DailyExpense';
import { DailyExpenseService } from '../../services/dailyexpense.service';
import { Firm } from '../../model/Firm';
import { SelectorService } from '../../services/selector.service';
import { ExpenseCategory } from '../../model/ExpenseCategory';
import { Bank } from '../../model/Bank';

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './create-dailyexpense.component.html',
  styleUrls: [ './create-dailyexpense.component.scss']
})
export class DialogOverviewDailyExpenseDialog  implements OnInit {

  bankList : Bank[];
  firmList : Firm[];
  categoryList : ExpenseCategory[];


  constructor(
    public dialogRef: MatDialogRef<DialogOverviewDailyExpenseDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dailyExpenseService: DailyExpenseService,
    private snackBar : MatSnackBar) {
        this.dailyExpenseForm = this.fb.group({
        'firmId':[null],
        'expenseCategory':[null],
        'expenseName':[null],
        'amount':[null],
        'paidTo':[null],
        'paymentMode':[null],
        'bankName':[null],
        'chequeNo':[null],
        'chequeDate':[null],
        'expenseDate':[null],
        'narration' : [null]
      });
    }

    dailyExpenseForm: FormGroup;
    dailyExpense : DailyExpense;

    ngOnInit() {
    
      this.firmList = this.data.firmList;
      this.bankList = this.data.bankList;
      this.categoryList = this.data.categoryList;

     if(this.data.dailyExpense !=null || this.data.dailyExpense!==undefined)
      {
        this.dailyExpense = new DailyExpense();
        this.dailyExpense = this.data;
      }
      else{
        this.dailyExpense = new DailyExpense();
      }
    }

    onNoClick(): void {
      this.dialogRef.close();
    }

    closePopup() : void {
      this.dialogRef.close();
    }

    onFormSubmit(form: NgForm)
    {
      console.log(form);
    }

    openSnackBar(message: string, action: string) {
      this.snackBar.open(message, action, {
        duration: 2000,
      });
    }

    submitForm() {

      var code =  this.dailyExpense.firmId.split('|')[0];
      var value1 = this.dailyExpense.firmId.split('|')[1];
      this.dailyExpense.firmId = code;
      this.dailyExpense.firmName = value1;

      if(this.dailyExpense.id==undefined || this.dailyExpense.id==null) {
        // create new daily expense
        
        this.dailyExpenseService.createDailyExpense(this.dailyExpense).subscribe(
          res => {
            console.log(res);
            this.openSnackBar('Expense Created Successfully','');
            this.closePopup();
          },
          error => {
            this.openSnackBar('Error while creating expense, Please contact your adminstrator','');
          });
      }
      else {

        this.dailyExpenseService.updateDailyExpense(this.dailyExpense).subscribe(
          res => {
            console.log(res);
            this.openSnackBar('Expense Updated Successfully','');
            this.closePopup();
          },
          error => {
            this.openSnackBar('Error while updating Expense, Please contact your adminstrator','');
          });
      }
    }
}


@Component({
  selector: 'app-user-agent',
  templateUrl: './dailyexpense.component.html',
  styleUrls: ['./dailyexpense.component.scss']
})
export class MasterDailyExpenseComponent implements OnInit {
  constructor(public dialog: MatDialog,
    public dailyExpenseService : DailyExpenseService,
    public selectorService : SelectorService,
    private changeDetectorRefs: ChangeDetectorRef) {}

  expenseList : DailyExpense[];
  firmList : Firm[];
  categoryList : ExpenseCategory[];
  bankList : Bank[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: any;
  dailyExpenseDataSource: any;
  dailyExpenseData : DailyExpense;
  displayedColumns = ['id','firmName','categoryName','dateFrom','dateTo','expense','actions'];

  openDialog(): void {

    this.dailyExpenseData = new DailyExpense();
    const dialogRef = this.dialog.open(DialogOverviewDailyExpenseDialog, {
      width: '600px',
      disableClose: true,
      data: {
        'dailyExpenseData': this.dailyExpenseData,
        'firmList' : this.firmList,
        'categoryList' : this.categoryList,
        'bankList' : this.bankList,
        
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  ngOnInit() {

      this.selectorService.getData("firm").subscribe(
        res => {
          this.firmList=res.result;
        },
        error => {
          console.log('There was an error while retrieving Albums !!!' + error);
        }
      );
      this.selectorService.getData("expenseCategory").subscribe(
        res => {
          this.categoryList=res.result;
        },
        error => {
          console.log('There was an error while retrieving Albums !!!' + error);
        }
      );
      this.selectorService.getData("bank").subscribe(
        res => {
          this.bankList=res.result;
        },
        error => {
          console.log('There was an error while retrieving Albums !!!' + error);
        }
      );
       this.refresh();
  }

refresh() {
  this.dailyExpenseDataSource = new MatTableDataSource();
    //this.agentService.get();

    console.log("Getting all expense");
 this.dailyExpenseService.getAllDailyExpenses().subscribe(
      res => {
        this.expenseList = res.result;
        this.dailyExpenseDataSource.data = this.expenseList;
        this.dailyExpenseDataSource.paginator = this.paginator;
        this.dailyExpenseDataSource.sort = this.sort;
      },
      error => {
        console.log('There was an error while retrieving agent !!!' + error);
      });
}

  editExpenseDetails(id : any) {

      console.log('Expense Id:'+id);
      this.dailyExpenseService.getExpenseById(id).subscribe(res => {
      console.log("Result:"+res);
      this.dailyExpenseData =  res.result;
      const dialogRef = this.dialog.open(DialogOverviewDailyExpenseDialog, {
      width: '600px',
      data: {
        'dailyExpenseData': this.dailyExpenseData,
        'firmList' : this.firmList,
        }
     });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');

      });

    },
    error => {
      console.log('There was an error while retrieving Albums !!!' + error);
    });
  }

  openConfirmDeleteDialog(id : any): void {
    const confirmDeleteAgentDialog = this.dialog.open(DeleteDailyExpenseConfirmBoxDialog, {
      width: '400px',
      data : id
    });

    confirmDeleteAgentDialog.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
