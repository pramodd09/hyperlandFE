import { Component, OnInit } from '@angular/core';
import { AssociatePaymentDetails } from '../../model/AssociatePaymentDetails';
import { AssociatePaymentDetailsDialog } from './create-associate-payment.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-associate-payment-details',
  templateUrl: './associate-payment-details.component.html',
  styleUrls: ['./associate-payment-details.component.scss']
})
export class AssociatePaymentDetailsComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  associatePaymentData : AssociatePaymentDetails;

  ngOnInit() {
  }

  openDialog(): void {
    this.associatePaymentData = new AssociatePaymentDetails();
    const dialogRef = this.dialog.open(AssociatePaymentDetailsDialog, {
      width: '400px',
      data : this.associatePaymentData
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
