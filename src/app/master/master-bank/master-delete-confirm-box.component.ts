import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { Bank } from "../../model/Bank";
import { BankService } from "../../services/bank.service";

@Component({
    selector: 'dialog-delete-bank',
    templateUrl: './delete-bank.component.html',
    //styleUrls: [ './create-bank.component.scss']
  })
  export class DeleteBankConfirmBoxDialog  implements OnInit {
  
    constructor(
      public dialogRef: MatDialogRef<DeleteBankConfirmBoxDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private bankService: BankService,
      private snackBar : MatSnackBar) {
      }
      
      ngOnInit() {
        
      }
  
      onNoClick(): void {
        this.dialogRef.close();
      }
  
      onYesClick(id : any) : void {
        console.log("Id is :"+this.data);
        this.bankService.deleteBank(this.data).subscribe(res => {  
          console.log("Result:"+res);
          this.openSnackBar('Bank Deleted Successfully','');
          this.dialogRef.close();
      });
    }
  
      openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 2000,
        });
      }
  
  }