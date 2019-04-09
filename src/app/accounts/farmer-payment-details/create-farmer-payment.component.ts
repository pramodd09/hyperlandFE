import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { City } from "../../model/City";
import { FormBuilder, Validators, FormGroup, NgForm } from "@angular/forms";
import { CityService } from "../../services/city.service";
import { FarmerPaymentDetails } from "../../model/FarmerPaymentDetails";
import { FarmerService } from "../../services/farmer.service";
import { Farmer } from "../../model/Farmer";
import { LandService } from "../../services/land.service";
import { Land } from "../../model/land";
import { FarmerPaymentDetailsService } from "../../services/farmer-payment-details.service";

@Component({
    selector: 'farmer-payment-details-dialog',
    templateUrl: './create-farmer-payment.component.html',
    styleUrls: [ './create-farmer-payment.component.scss']
  })
  export class FarmerPaymentDetailsDialog  implements OnInit {
  
    constructor(
      public dialogRef: MatDialogRef<FarmerPaymentDetailsDialog>,
      @Inject(MAT_DIALOG_DATA) public data: FarmerPaymentDetails,
      private fb: FormBuilder,
      private farmerService : FarmerService,
      private farmerPaymentDetailsService: FarmerPaymentDetailsService,
      private landService : LandService,
      private snackBar : MatSnackBar) {
  
        this.farmerPaymentDetailsForm= this.fb.group({
          'farmerName': [],
          'landId' : [],
          'villageName' : [],
          'paymentAmt': [null , Validators.required],
          'date' : [],
          'paymentMode': [],
          'transId' : [],
          'bankDetail' : [],
          'chequeDate': [],
          /* 'chequeNo' : [], */
        });
      }
      farmerList : Farmer[];
      landList : Land[];
      farmerPaymentDetailsForm: FormGroup;
      farmerPayment : FarmerPaymentDetails;
  
      ngOnInit() {
        if(this.data!=null || this.data!==undefined)
        {
          this.farmerPayment = new FarmerPaymentDetails();
          this.farmerPayment = this.data;
        }
        else{
          this.farmerPayment = new FarmerPaymentDetails();
        }

        this.farmerService.getAllFarmers().subscribe(
          res => {  
            this.farmerList = res.result;
            console.log(this.farmerList);
          },  
          error => {  
            console.log('There was an error while retrieving Albums !!!' + error);  
          }
        );

        this.landService.getAllLands().subscribe(
          res => {  
            this.landList = res.result;
          },  
          error => {  
            console.log('There was an error while retrieving Albums !!!' + error);  
          }
        );
        
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
  
      submitForm() {

        var farmerId =  this.farmerPayment.farmerId.split('|')[0];
        var farmerName = this.farmerPayment.farmerId.split('|')[1];

        this.farmerPayment.farmerId = farmerId;
        this.farmerPayment.farmerName = farmerName;


        if(this.farmerPayment.id==undefined || this.farmerPayment.id==null) {
          // create new Farmer Payment Details
          this.farmerPaymentDetailsService.createFarmerPaymentDetails(this.farmerPayment).subscribe(  
            res => {  
              console.log(res);
              this.openSnackBar('Farmer Payment Details Created Successfully','');
              this.closePopup();
            },  
            error => {  
              console.log('There was an error while creating Farmer Payment Details !!!' + error);
              this.openSnackBar('Error while creating Farmer Payment Details, Please contact your adminstrator','');
            });
        }
        else {

          var farmerId =  this.farmerPayment.farmerId.split('|')[0];
          var farmerName = this.farmerPayment.farmerId.split('|')[1];

          this.farmerPayment.farmerId = farmerId;
          this.farmerPayment.farmerName = farmerName;

          this.farmerPaymentDetailsService.updateFarmerPaymentDetails(this.farmerPayment).subscribe(  
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
  }