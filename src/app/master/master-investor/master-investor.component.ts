import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';




@Component({
  selector: 'dialog-overview-block-dialog',
  templateUrl: './create-investor.component.html',
  styleUrls: [ './create-investor.component.scss']
})
export class DialogOverviewInvestorDialog {
  firmList : any;
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewInvestorDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}


@Component({
  selector: 'app-master-investor',
  templateUrl: './master-investor.component.html',
  styleUrls: ['./master-investor.component.scss']
})
export class MasterInvestorComponent implements OnInit {

  investorDataSource: any;

  constructor(public dialog: MatDialog) { }

   displayedColumns = ['investorName','conatct','address'];
   
   
   openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewInvestorDialog, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  ngOnInit() {
  }

}
