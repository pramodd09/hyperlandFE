import { Component, OnInit } from '@angular/core';
import { FarmerPaymentDetails } from '../../model/FarmerPaymentDetails';
import { FarmerPaymentDetailsDialog } from './create-farmer-payment.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-farmer-payment-details',
  templateUrl: './farmer-payment-details.component.html',
  styleUrls: ['./farmer-payment-details.component.scss']
})
export class FarmerPaymentDetailsComponent implements OnInit {
  
  constructor(public dialog: MatDialog) { }

  farmerPaymentData : FarmerPaymentDetails;

  ngOnInit() {
  }

  openDialog(): void {
    this.farmerPaymentData = new FarmerPaymentDetails();
    const dialogRef = this.dialog.open(FarmerPaymentDetailsDialog, {
      width: '400px',
      data : this.farmerPaymentData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
