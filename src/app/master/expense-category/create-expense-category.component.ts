import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { FormBuilder, Validators, FormGroup, NgForm } from "@angular/forms";
import { ExpenseCategory } from "../../model/ExpenseCategory";
import { ExpenseCategoryService } from "../../services/expenseCategory.service";

@Component({
    selector: 'expense-category-dialog',
    templateUrl: './create-expense-category.component.html',
    styleUrls: [ './create-expense-category.component.scss']
  })
  export class ExpenseCategoryDialog  implements OnInit {
  
    constructor(
      public dialogRef: MatDialogRef<ExpenseCategoryDialog>,
      @Inject(MAT_DIALOG_DATA) public data: ExpenseCategory,
      private fb: FormBuilder,
      private categoryService: ExpenseCategoryService,
      private snackBar : MatSnackBar) {
  
        this.categoryForm= this.fb.group({
          'category': [null , Validators.required ],
          //'address' : [null ,Validators.required ]
        });
      }
      
      categoryForm: FormGroup;
  
      category : ExpenseCategory;
  
      ngOnInit() {
        if(this.data!=null || this.data!==undefined)
        {
          this.category = new ExpenseCategory();
          this.category  = this.data;
        }
        else{
          this.category = new ExpenseCategory();
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
        if(this.category.id==undefined || this.category.id==null) {
          // create new city
          this.categoryService.createCategory(this.category).subscribe(  
            res => {  
              console.log(res);
              this.openSnackBar('Category Created Successfully','');
              this.closePopup();
            },  
            error => {  
              console.log('There was an error while creating Category !!!' + error);
              this.openSnackBar('Error while creating Category, Please contact your adminstrator','');
            });
        }
        else {
          this.categoryService.updateCategory(this.category).subscribe(  
            res => {  
              console.log(res);
              this.openSnackBar('Category Updated Successfully','');
              this.closePopup();
            },  
            error => {  
              console.log('There was an error while updating Category !!!' + error);  
              this.openSnackBar('Error while updating Category, Please contact your adminstrator','');
            });
        }
      } 
  }