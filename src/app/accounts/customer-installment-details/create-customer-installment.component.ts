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
      @Inject(MAT_DIALOG_DATA) 
      public data: CustomerInstallmentDetails,
      private fb: FormBuilder,      
      private customerInstallmentDetailsService: CustomerInstallmentDetailsService,
      private selectorService : SelectorService,
      private snackBar : MatSnackBar
      ) {
  
        this.customerInstallmentDetailsForm= this.fb.group({
          'installmentAmount': [null,Validators.required],
          'totalPayment' : [],                   
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
        //fetch receipt number
        //calculate interest
        if(this.data!=null || this.data!==undefined)
        {
          this.customerInstallment = new CustomerInstallmentDetails();
          this.customerInstallment = this.data;
          this.customerInstallment.paymentDate = new Date();
          this.customerInstallment.receiptNo = 12345;
          this.customerInstallment.interestWaiveOff = 0.00;
          this.customerInstallment.interest = 0.00;
         if(this.customerInstallment.pendingAmount > 0.00)
         {
          this.customerInstallment.totalAmount = this.customerInstallment.interest + this.customerInstallment.pendingAmount
         }
         else{
          this.customerInstallment.totalAmount = this.customerInstallment.interest + this.customerInstallment.installmentAmount;
         }
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
        
        this.customerInstallment.interestPaid = this.customerInstallment.interest - this.customerInstallment.interestWaiveOff;
        this.customerInstallment.pendingAmount = this.customerInstallment.totalAmount - this.customerInstallment.totalAmountPaid;
        if(this.customerInstallment.pendingAmount>0)
        {
            this.customerInstallment.status = 'Pending';
        }
        else
        {
            this.customerInstallment.status = 'Completed';
        }
        this.customerInstallmentDetailsService.updateCustomerInstallmentDetails(this.customerInstallment).subscribe(
          
          res => {
            console.log(res);
            this.openSnackBar('Associate Payment Details Created Successfully','');
            this.closePopup();
          },
          error => {
            console.log('There was an error while creating Farmer Payment Details !!!' + error);
            this.openSnackBar('Error while creating Farmer Payment Details, Please contact your adminstrator','');
          });
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
  }
