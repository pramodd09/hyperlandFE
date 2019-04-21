import { Component, Inject, ViewChild, Input, OnChanges, ViewEncapsulation, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectorService } from '../../../services/selector.service';
import * as XLSX from 'xlsx';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas'; 



@Component({
  selector: 'app-customer-installment-table',
  templateUrl: './customer-installment-table.component.html',
  styleUrls: ['./customer-installment-table.component.scss'],
  // encapsulation:ViewEncapsulation.None
})
export class CustomerInstallmentTableComponent implements OnChanges {
  @ViewChild('TABLE') table: ElementRef;
  reportDataSource: any;
  displayedColumns: string[];
  @Input() reportData;
  @Input() columns;

  constructor(private selectorService: SelectorService,
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  
  ngOnInit() {
    this.displayedColumns = this.columns;
    this.reportDataSource = new MatTableDataSource();
    // this.reportDataSource.data = ELEMENT_DATA;
    this.reportDataSource.paginator = this.paginator;
    this.reportDataSource.sort = this.sort;
  }

 cellClicked(element) {
    console.dir(element);
    console.log(element.id + ' cell clicked');
    // fetch farmers payment
  }

  exportAsExcel() {
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    /* save to file */
    XLSX.writeFile(wb, 'SheetJS.xlsx');
  }

  applyFilter(filterValue: string) {
    this.reportDataSource.filter = filterValue.trim().toLowerCase();
  }

  generatePDF() {
    var myTable = document.getElementById('toPDF');  
    var doc = new jspdf(); 
    html2canvas(myTable).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF 

      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('MYPdf.pdf'); // Generated PDF   
    });   
  }

  ngOnChanges(): void {
    if (this.reportData) {
      console.log('ngOnchanges in child');
      console.log(this.reportData);
      this.reportDataSource.data = this.reportData.result;

    }
  }
  /*masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.reportDataSource.data.forEach(row => this.selection.select(row));
  }

  
  checkboxLabel(row) {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.reportDataSource.data.length;
    return numSelected === numRows;
  }*/
}

