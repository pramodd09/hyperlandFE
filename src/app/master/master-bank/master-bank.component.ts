import { Component, OnInit, ViewChild, Inject, ChangeDetectorRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { BankService } from '../../services/bank.service';
import { Bank } from '../../model/Bank';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
import { DeleteBankConfirmBoxDialog } from './master-delete-confirm-box.component';

@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './create-bank.component.html',
  styleUrls: [ './create-bank.component.scss']
})
export class DialogOverviewBankDialog  implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewBankDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Bank,
    private fb: FormBuilder,
    private bankService: BankService,
    private snackBar : MatSnackBar) {

      this.bankForm= this.fb.group({
        'bankName': [null , Validators.required ],
        'branch': [null , Validators.required ],
        'accountNumber': [null , Validators.required ],
        'ifscCode': [null , Validators.required ],
      });
    }

    bankForm: FormGroup;

    bank : Bank;

    ngOnInit() {
      if(this.data!=null || this.data!==undefined)
      {
        this.bank = new Bank();
        this.bank = this.data;
      }
      else{
        this.bank = new Bank();
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
      if(this.bank.id==undefined || this.bank.id==null) {
        // create new bank
        this.bankService.createBank(this.bank).subscribe(
          res => {
            console.log(res);
            this.openSnackBar('Bank Created Successfully','');
            this.closePopup();
          },
          error => {
            console.log('There was an error while retrieving Albums !!!' + error);
            this.openSnackBar('Error while creating bank, Please contact your adminstrator','');
          });
      }
      else {
        this.bankService.updateBank(this.bank).subscribe(
          res => {
            console.log(res);
            this.openSnackBar('Bank Updated Successfully','');
            this.closePopup();
          },
          error => {
            console.log('There was an error while retrieving Albums !!!' + error);
            this.openSnackBar('Error while updating bank, Please contact your adminstrator','');
          });
      }
    }
}


@Component({
  selector: 'app-master-bank',
  templateUrl: './master-bank.component.html',
  styleUrls: ['./master-bank.component.scss']
})
export class MasterBankComponent implements OnInit {
  constructor(public dialog: MatDialog,public bankService : BankService,
    private changeDetectorRefs: ChangeDetectorRef) {}

  bankList : Bank[];
  loading : boolean =false;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: any;

  bankDataSource: any;

  bankData : Bank;

  displayedColumns = ['bankName','branch','accountNumber','ifscCode','actions'];

  openDialog(): void {
    this.bankData = new Bank();
    const dialogRef = this.dialog.open(DialogOverviewBankDialog, {
      width: '400px',
      data : this.bankData,
      disableClose: true 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.refresh();
    });
  }

  ngOnInit() {
      this.refresh();
  }

refresh() {
  this.bankDataSource = new MatTableDataSource();
  this.loading = true;
 this.bankService.getAllBanks().subscribe(
      res => {
        this.bankList = res.result;
        this.bankDataSource.data = this.bankList;
        this.bankDataSource.paginator = this.paginator;
        this.bankDataSource.sort = this.sort;
        this.loading = false;
      },
      error => {
        console.log('There was an error while retrieving bank !!!' + error);
        this.loading = false;
      });
}

  editBankDetails(bankId : any) {

    console.log('Bank Id:'+bankId);

    this.bankService.getBankById(bankId).subscribe(res => {  
      console.log("Result:"+res);
      this.bankData =  res.result;
      const dialogRef = this.dialog.open(DialogOverviewBankDialog, {
        width: '350px',
        data : this.bankData,
        disableClose: true 
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        this.refresh();
      });

    },  
    error => {  
      console.log('There was an error while retrieving Albums !!!' + error);  
    });
  }

  openConfirmDeleteDialog(bankId : any): void {
    const confirmDeleteBankDialog = this.dialog.open(DeleteBankConfirmBoxDialog, {
      width: '400px',
      data : bankId,
      disableClose: true ,
    });

    confirmDeleteBankDialog.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
