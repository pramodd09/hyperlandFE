import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { FormBuilder, Validators, FormGroup, NgForm } from "@angular/forms";
import { AssociatePaymentDetails } from "../../model/AssociatePaymentDetails";

@Component({
    selector: 'associate-payment-details-dialog',
    templateUrl: './create-associate-payment.component.html',
    styleUrls: [ './create-associate-payment.component.scss']
  })
  export class AssociatePaymentDetailsDialog  implements OnInit {
  
    constructor(
      public dialogRef: MatDialogRef<AssociatePaymentDetailsDialog>,
      @Inject(MAT_DIALOG_DATA) public data: AssociatePaymentDetails,
      private fb: FormBuilder,
      private snackBar : MatSnackBar) {
  
        this.associatePaymentDetailsForm= this.fb.group({
          'amtToPay' : [],
          'paidAmt': [],
          'paymentDate' : [],
          'mode' : [],
          'chequeNo': [],
          'chequeDate' : [],
          'bankDetail' : []
        });
      }
      associatePaymentDetailsForm: FormGroup;
      assocaitePayment : AssociatePaymentDetails;
  
      ngOnInit() {
        if(this.data!=null || this.data!==undefined)
        {
          this.assocaitePayment = new AssociatePaymentDetails();
          this.assocaitePayment = this.data;
        }
        else{
          this.assocaitePayment = new AssociatePaymentDetails();
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
  
     /*  submitForm() {
        if(this.city.id==undefined || this.city.id==null) {
          // create new city
          this.cityService.createCity(this.city).subscribe(  
            res => {  
              console.log(res);
              this.openSnackBar('City Created Successfully','');
              this.closePopup();
            },  
            error => {  
              console.log('There was an error while creating city !!!' + error);
              this.openSnackBar('Error while creating city, Please contact your adminstrator','');
            });
        }
        else {
          this.cityService.updateCity(this.city).subscribe(  
            res => {  
              console.log(res);
              this.openSnackBar('City Updated Successfully','');
              this.closePopup();
            },  
            error => {  
              console.log('There was an error while updating city !!!' + error);  
              this.openSnackBar('Error while updating city, Please contact your adminstrator','');
            });
        }
      } */
  }