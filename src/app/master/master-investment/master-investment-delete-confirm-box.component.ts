import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { Firm } from "../../model/Firm";
import { FirmService } from "../../services/firm.service";
import { InvestmentService } from "../../services/investment.service";

@Component({
    selector: 'dialog-delete-firm',
    templateUrl: './delete-investment.component.html',
    //styleUrls: [ './create-firm.component.scss']
  })
  export class DeleteInvestmentMasterConfirmBoxDialog  implements OnInit {
  
    constructor(
      public dialogRef: MatDialogRef<DeleteInvestmentMasterConfirmBoxDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private investmentService : InvestmentService,
      private snackBar : MatSnackBar) {
      }
      
      ngOnInit() {
        
      }
  
      onNoClick(): void {
        this.dialogRef.close();
      }
  
      onYesClick(id : any) : void {
        console.log("Id is :"+this.data);
        this.investmentService.deleteInvestment(this.data).subscribe(res => {  
          console.log("Result:"+res);
          this.openSnackBar('Investment Deleted Successfully','');
          this.dialogRef.close();
      });
    }
  
      openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 2000,
        });
      }
  
  }