import { Component, OnInit, ViewChild } from '@angular/core';
import { ViewtransactionService } from '../../services/viewtransaction.service';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';

@Component({
  selector: 'app-farmer-payment-details',
  templateUrl: './farmer-payment-details.component.html',
  styleUrls: ['./farmer-payment-details.component.scss']
})
export class FarmerPaymentDetailsComponent implements OnInit {

  constructor(private viewTransactionService : ViewtransactionService) { }

  details : any;
  paymentDetailDataSource : any;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  loading : Boolean =false;

  displayedColumns = ['select', 'farmerName','bankName','paymentAmount','khasraNumber','landAmount','paidAmount','actions'];

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
    this.getData();
  }

getData() {
  this.paymentDetailDataSource = new MatTableDataSource();
    this.loading = true;
    this.viewTransactionService.getData("farmerPaymentDetails").subscribe(  
      res => {  
        this.details = res.result;
        this.paymentDetailDataSource.data = res.result;
        this.paymentDetailDataSource.paginator = this.paginator;
        this.paymentDetailDataSource.sort = this.sort;
        this.loading = false;
      },  
      error => {  
        console.log('There was an error while retrieving !!!' + error);  
        this.loading= false;
      });
}

  acceptPaymentDetail(id:string) {
      
    this.viewTransactionService.approveTransaction(id,"farmerPayment").subscribe(  
      res => {  
        this.getData();
      },  
      error => {  
        console.log('There was an error while retrieving !!!' + error);  
      });
  }

  rejectPaymentDetail(id:string) {

  }
}
