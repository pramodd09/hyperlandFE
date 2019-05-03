import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { AgentService } from "../../services/agent.service";
import { DailyExpenseService } from "../../services/dailyexpense.service";

@Component({
    selector: 'dialog-delete-expense',
    templateUrl: './delete-dailyexpense.component.html'
  })
  export class DeleteDailyExpenseConfirmBoxDialog  implements OnInit {
  
    constructor(
      public dialogRef: MatDialogRef<DeleteDailyExpenseConfirmBoxDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private dailyExpenseService: DailyExpenseService,
      private snackBar : MatSnackBar) {
      }
      
      ngOnInit() {
        
      }
  
      onNoClick(): void {
        this.dialogRef.close();
      }
  
      onYesClick(id : any) : void {
        console.log("Id is :"+this.data);
        this.dailyExpenseService.deleteExpense(this.data).subscribe(res => {
          console.log("Result:"+res);
          this.openSnackBar('Expense Deleted Successfully','');
          this.dialogRef.close();
      });
    }
  
      openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 2000,
        });
      }
  
  }
