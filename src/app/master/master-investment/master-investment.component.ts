import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';


@Component({
  selector: 'dialog-overview-investment-dialog',
  templateUrl: './create-investment.component.html',
  styleUrls: [ './create-investment.component.scss']
})
export class DialogOverviewInvestmentDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewInvestmentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any) {

    }

  onNoClick(): void {
    this.dialogRef.close();
  }

}

@Component({
  selector: 'app-master-investment',
  templateUrl: './master-investment.component.html',
  styleUrls: ['./master-investment.component.scss']
})
export class MasterInvestmentComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  displayedColumns = ['investorName','projectName','productName','amount', 'investmentDate'];

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewInvestmentDialog, {
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  ngOnInit() {
  }

}
