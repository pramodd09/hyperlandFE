import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { Firm } from "../../model/Firm";
import { FirmService } from "../../services/firm.service";
import { InvesterService } from "../../services/invester.service";

@Component({
    selector: 'dialog-delete-firm',
    templateUrl: './delete-investor.component.html',
    //styleUrls: [ './create-firm.component.scss']
  })
  export class DeleteInvestorMasterConfirmBoxDialog  implements OnInit {
  
    constructor(
      public dialogRef: MatDialogRef<DeleteInvestorMasterConfirmBoxDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private investorService: InvesterService,
      private snackBar : MatSnackBar) {
      }
      
      ngOnInit() {
        
      }
  
      onNoClick(): void {
        this.dialogRef.close();
      }
  
      onYesClick(id : any) : void {
        console.log("Id is :"+this.data);
        this.investorService.deleteInvester(this.data).subscribe(res => {  
          console.log("Result:"+res);
          this.openSnackBar('Investor Deleted Successfully','');
          this.dialogRef.close();
      });
    }
  
      openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 2000,
        });
      }
  
  }