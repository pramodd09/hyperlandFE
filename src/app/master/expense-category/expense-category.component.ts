import { Component, OnInit, ViewChild } from '@angular/core';
import { ExpenseCategory } from '../../model/ExpenseCategory';
import { ExpenseCategoryService } from '../../services/expenseCategory.service';
import { MatDialog, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { ExpenseCategoryDialog } from './create-expense-category.component';
import { DeleteCategoryConfirmBoxDialog } from './master-delete-confirm-box.component';

@Component({
  selector: 'app-expense-category',
  templateUrl: './expense-category.component.html',
  styleUrls: ['./expense-category.component.scss']
})
export class ExpenseCategoryComponent implements OnInit {

  categoryList : ExpenseCategory[];
  categoryData : ExpenseCategory;
  categoryDataSource: any;
  constructor(private categoryService : ExpenseCategoryService,
    public dialog: MatDialog) { }


    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    displayedColumns = ['id', 'categoryName','actions'];

  ngOnInit() {

    this.categoryService.getAllCategories().subscribe(
      res => {  
        this.categoryList = res.result;

        this.categoryDataSource = new MatTableDataSource();  
        this.categoryDataSource.data = res.result;
        this.categoryDataSource.paginator = this.paginator;
        this.categoryDataSource.sort = this.sort;
      },  
      error => {  
        console.log('There was an error while retrieving Albums !!!' + error);  
      }
    );
  }

  openDialog(): void {
    this.categoryData = new ExpenseCategory();
    const dialogRef = this.dialog.open(ExpenseCategoryDialog, {
      width: '400px',
      data : this.categoryData,
      disableClose: true 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  editCategoryDetails(categoryId : any) {

    console.log('Category Id:'+categoryId);

    this.categoryService.getCategoryById(categoryId).subscribe(res => {  
      console.log("Result:"+res);
      this.categoryData =  res.result;
      const dialogRef = this.dialog.open(ExpenseCategoryDialog, {
        width: '350px',
        data : this.categoryData,
        disableClose: true 
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
      });

    },  
    error => {  
      console.log('There was an error while retrieving Albums !!!' + error);  
    });
  }

  openConfirmDeleteDialog(categoryId : any): void {
    const confirmDeleteCategoryDialog = this.dialog.open(DeleteCategoryConfirmBoxDialog, {
      width: '400px',
      data : categoryId
    });

    confirmDeleteCategoryDialog.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
