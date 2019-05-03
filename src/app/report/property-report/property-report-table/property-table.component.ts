import { Component, Inject, ViewChild, Input, OnChanges, ViewEncapsulation, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { SelectorService } from '../../../services/selector.service';
import * as XLSX from 'xlsx';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas'; 
import { columnList } from '../../report-column-list';


@Component({
  selector: 'app-property-table',
  templateUrl: './property-table.component.html',
  styleUrls: ['./property-table.component.scss'],
  // encapsulation:ViewEncapsulation.None
})
export class PropertyTableComponent implements OnChanges {
  @ViewChild('TABLE') table: ElementRef;
  reportDataSource: any;
  displayedColumns: string[];
  @Input() reportData;
  @Input() bookingStatus;  
  showFacing:boolean=false;
  showBooked:boolean=false;
  showHold:boolean=false;
  constructor(private selectorService: SelectorService,
  ) { }

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit() {
    // this.displayedColumns = this.columns;
    this.reportDataSource = new MatTableDataSource();
    // this.reportDataSource.data = ELEMENT_DATA;
    this.reportDataSource.paginator = this.paginator;
    this.reportDataSource.sort = this.sort;
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
      console.log(this.bookingStatus);
      if(this.bookingStatus=="Available") {this.showFacing=true;this.displayedColumns = columnList["propertyAvailable"];}
      if(this.bookingStatus=="Hold") {this.showHold=true;this.displayedColumns = columnList["propertyHold"];}
      if(this.bookingStatus=="Booked") {this.showBooked=true;this.displayedColumns = columnList["propertyBooked"];}
      this.reportDataSource.data = this.reportData.result;
    }
  }
}
