import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatSnackBar, MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { InvesterService } from '../../services/invester.service';
import { Investor } from '../../model/Investor';
import { DeleteInvestorMasterConfirmBoxDialog } from './master-delete-investor-confirm-box.component';

@Component({
  selector: 'dialog-overview-block-dialog',
  templateUrl: './create-investor.component.html',
  styleUrls: [ './create-investor.component.scss']
})
export class DialogOverviewInvestorDialog  implements OnInit{
  
  invester : Investor;

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewInvestorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar : MatSnackBar,private investerService : InvesterService,
    private fb : FormBuilder) {
      this.investerForm= this.fb.group({
        'investorName': [null , Validators.required ],
        'phoneNumber': [null , Validators.required ],
        'address' : [null ,Validators.required ]
      });
    }
    
    investerForm: FormGroup;

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  closePopup() : void {
    this.dialogRef.close();
  }

  ngOnInit() {
    if(this.data!=null || this.data!==undefined)
    {
      this.invester = new Investor();
      this.invester = this.data;
    }
    else{
      this.invester = new Investor();
    }
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
      if(this.invester.id==undefined || this.invester.id==null) {
        
        this.investerService.createInvester(this.invester).subscribe(  
          res => {  
            console.log(res);
            this.openSnackBar('Investor Created Successfully','');
            this.closePopup();
          },  
          error => {  
            console.log('There was an error while retrieving investor !!!' + error);
            this.openSnackBar('Error while creating investor, Please contact your adminstrator','');
          });
      }
      else {
        this.investerService.updateInvester(this.invester).subscribe(  
          res => {  
            console.log(res);
            this.openSnackBar('Investor Updated Successfully','');
            this.closePopup();
          },  
          error => {  
            console.log('There was an error while retrieving investor !!!' + error);  
            this.openSnackBar('Error while updating investor, Please contact your adminstrator','');
          });
      }
    }

}


@Component({
  selector: 'app-master-investor',
  templateUrl: './master-investor.component.html',
  styleUrls: ['./master-investor.component.scss']
})
export class MasterInvestorComponent implements OnInit {

  investorDataSource: any;

  inverstorData : Investor;

  loading : Boolean =false;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public dialog: MatDialog,private investorService : InvesterService) { }

   displayedColumns = ['investorName','conatct','address','actions'];
   
   
   openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewInvestorDialog, {
      width: '350px',
      data : this.inverstorData,
      disableClose: true 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.refresh();
    });
  }



  ngOnInit() {
    this.refresh();
    this.inverstorData = new Investor();
  }

  refresh() {
    
    this.investorDataSource = new MatTableDataSource();
    this.loading = true;
    this.investorService.getAllInvester().subscribe(  
      res => {  
        this.investorDataSource.data = res.result;
        this.investorDataSource.paginator = this.paginator;
        this.investorDataSource.sort = this.sort;
        this.loading = false;
      },  
      error => {  
        console.log('There was an error while retrieving Investor !!!' + error);  
        this.loading= false;
      });
  }

  editFirmDetails(investorId : any) {

    console.log('investorId Id:'+investorId);

    this.investorService.getInvesterById(investorId).subscribe(res => {  
      console.log("Result:"+res);
      this.inverstorData =  res.result;
      const dialogRef = this.dialog.open(DialogOverviewInvestorDialog, {
        width: '350px',
        data : this.inverstorData
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

  openConfirmDeleteDialog(investorId : any): void {
    const confirmDeleteFirmDialog = this.dialog.open(DeleteInvestorMasterConfirmBoxDialog, {
      width: '400px',
      data : investorId
    });

    confirmDeleteFirmDialog.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
