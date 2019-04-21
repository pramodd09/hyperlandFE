import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { City } from "../../model/City";
import { FormBuilder, Validators, FormGroup, NgForm } from "@angular/forms";
import { CityService } from "../../services/city.service";
import { CustomerInstallmentDetails } from "../../model/CustomerInstallmentDetails";
import { Bank } from "../../model/Bank";
import { LandService } from "../../services/land.service";
import { SelectorService } from "../../services/selector.service";
import { Land } from "../../model/land";
import { CustomerInstallmentDetailsService } from "../../services/customer-installment-details.service";

@Component({
    selector: 'customer-installment-details-dialog',
    templateUrl: './create-customer-installment.component.html',
    styleUrls: [ './create-customer-installment.component.scss']
  })
  export class CustomerInstallmentDetailsDialog  implements OnInit {
  
    constructor(
      public dialogRef: MatDialogRef<CustomerInstallmentDetailsDialog>,
      @Inject(MAT_DIALOG_DATA) public data: CustomerInstallmentDetails,
      private fb: FormBuilder,      
      private farmerPaymentDetailsService: CustomerInstallmentDetailsService,
      private selectorService : SelectorService,
      private snackBar : MatSnackBar) {
  
        this.customerInstallmentDetailsForm= this.fb.group({
          'installmentAmount': [null,Validators.required],
          'totalPayment' : [],         
          'amountPaid': [null , Validators.required],
          'interest' : [],
          'waiveOff':[],
          'interestPaid':[],
          'totalAmountPaid':[],
          'pendingAmount':[],
          'receiptNo':[],
          'bankName':[],
          'paymentMode': [],
          'transId' : [],
          'bankDetail' : [],
          'transactionDate': [],
          'transactionId': [],
          'paymentDate':[null],
        
          /* 'chequeNo' : [], */
        });
      }
    
      customerInstallmentDetailsForm: FormGroup;
      customerInstallment : CustomerInstallmentDetails;
      bankList: Bank[];
  
      ngOnInit() {

        if(this.data!=null || this.data!==undefined)
        {
          this.customerInstallment = new CustomerInstallmentDetails();
          this.customerInstallment = this.data;
        }
        else{
          this.customerInstallment = new CustomerInstallmentDetails();
          
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
  onChange(event,type){
        //get all Farmers of that Land.
      if(event)
        {
  
      }
    }
      submitForm() {

           this.farmerPaymentDetailsService.updateCustomerInstallmentDetails(this.customerInstallment).subscribe(  
            res => {  
              console.log(res);
              this.openSnackBar('Farmer Payment Details Updated Successfully','');
              this.closePopup();
            },  
            error => {  
              console.log('There was an error while updating Farmer Payment Details !!!' + error);  
              this.openSnackBar('Error while updating Farmer Payment Details, Please contact your adminstrator','');
            });
          }
      
  }
