import { Component, OnInit } from '@angular/core';
import { FarmerPaymentDetails } from '../../model/FarmerPaymentDetails';
import { FarmerPaymentDetailsDialog } from './create-farmer-payment.component';
import { MatDialog } from '@angular/material';
import { LandService } from "../../services/land.service";
import { Land } from "../../model/land";
import { NgForm, FormGroup, FormBuilder } from '@angular/forms';
import { SelectorService } from '../../services/selector.service';
import { columnList } from '../report-column-list';
@Component({
  selector: 'app-farmer-payment-details',
  templateUrl: './farmer-payment-details.component.html',
  styleUrls: ['./farmer-payment-details.component.scss']
})
export class FarmerPaymentDetailsComponent implements OnInit {
  
  constructor(public dialog: MatDialog, private landService : LandService , private fb: FormBuilder,
   private selectorService: SelectorService){
   this.reportForm = this.fb.group({
      'id': [null]
    });
   }

  farmerPaymentData : FarmerPaymentDetails;
  landList : Land[];
  reportForm: FormGroup;
  reportData: any;
  columns=columnList["landPayment"];
  ngOnInit() {
        this.landService.getAllLands().subscribe(
          res => {
            this.landList = res.result;
          },
          error => {
            console.log('There was an error while retrieving Albums !!!' + error);
          }
        );
  }

  openDialog(): void {
    this.farmerPaymentData = new FarmerPaymentDetails();
    const dialogRef = this.dialog.open(FarmerPaymentDetailsDialog, {
      width: '400px',
      data : this.farmerPaymentData,
      disableClose: true 
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
 onFormSubmit(form: NgForm) {
    console.log(form);

    this.selectorService.getReportDataByType(form,'landPayment').subscribe(
      res => {
        console.log(res);
        this.reportData = res;
      },
      error => {
        console.log('There was an error while retrieving report data' + error);
      }
         )
// console.log(form)
    }
}
