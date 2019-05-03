import { Component, OnInit, ViewChild } from '@angular/core';
import { ExpenseCategoryService } from '../../services/expenseCategory.service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-expensecategory',
  templateUrl: './expensecategory.component.html',
  styleUrls: ['./expensecategory.component.scss']
})
export class ExpensecategoryComponent implements OnInit {

  constructor(private expenseCategoryService : ExpenseCategoryService) { }
  loading : Boolean =false;
  paymentDetailDataSource : any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  expenseCategoryList : any;
  displayedColumns = ['select','farmerName', 'paymentMode','bankName','paymentAmount','transactionDate','khasraNumber','landAmount','paidAmount','actions'];

  selection = new SelectionModel<any>(true, []);

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.paymentDetailDataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.paymentDetailDataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: any): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  ngOnInit() {

    this.paymentDetailDataSource = new MatTableDataSource();
    this.loading = true;
    this.expenseCategoryService.getAllCategories().subscribe(  
      res => {  
        this.expenseCategoryList = res.result;
        this.paymentDetailDataSource.data = this.expenseCategoryList;
        this.paymentDetailDataSource.paginator = this.paginator;
        this.paymentDetailDataSource.sort = this.sort;
        this.loading = false;
      },  
      error => {  
        console.log('There was an error while retrieving Expense categoreis !!!' + error);  
        this.loading= false;
      });
  }

}
