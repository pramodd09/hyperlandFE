import { Component, Inject, OnInit } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { ExpenseCategoryService } from "../../services/expenseCategory.service";

@Component({
    selector: 'dialog-delete-category',
    templateUrl: './delete-expense-category.component.html',
    //styleUrls: [ './create-firm.component.scss']
  })
  export class DeleteCategoryConfirmBoxDialog  implements OnInit {
  
    constructor(
      public dialogRef: MatDialogRef<DeleteCategoryConfirmBoxDialog>,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private categoryService: ExpenseCategoryService,
      private snackBar : MatSnackBar) {
      }
      
      ngOnInit() {
        
      }
  
      onNoClick(): void {
        this.dialogRef.close();
      }
  
      onYesClick(id : any) : void {
        console.log("Id is :"+this.data);
        this.categoryService.deleteCategory(this.data).subscribe(res => {  
          console.log("Result:"+res);
          this.openSnackBar('Category Deleted Successfully','');
          this.dialogRef.close();
      });
    }
  
      openSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
          duration: 2000,
        });
      }
  
  }