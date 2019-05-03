import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { FormBuilder, Validators, FormGroup, NgForm } from "@angular/forms";
import { Farmer } from './../../model/Farmer';
import { FarmerService } from "../../services/farmer.service";

@Component({
    selector: 'farmer-dialog',
    templateUrl: './create-farmer.component.html',
    styleUrls: [ './create-farmer.component.scss']
  })
  export class FarmerDialog  implements OnInit {
  
    constructor(
      public dialogRef: MatDialogRef<FarmerDialog>,
      @Inject(MAT_DIALOG_DATA) public data: Farmer,
      private fb: FormBuilder,
      private farmerService: FarmerService,
      private snackBar : MatSnackBar) {
  
        this.farmerForm= this.fb.group({
          'farmerName': [null , Validators.required ],
          'adhaarNo':[],
          'panNumber':[],
           'bank':[],
          'branch':[],
          'ifscCode':[]
        });
      }
      
      farmerForm: FormGroup;
  
      farmer : Farmer;
  
      ngOnInit() {
        if(this.data!=null || this.data!==undefined)
        {
          this.farmer = new Farmer();
          this.farmer = this.data;
        }
        else{
          this.farmer = new Farmer();
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
  
      submitForm() {
        if(this.farmer.id==undefined || this.farmer.id==null) {
          // create new farmer
          this.farmerService.createFarmer(this.farmer).subscribe(  
            res => {  
              console.log(res);
              this.openSnackBar('Farmer Created Successfully','');
              this.closePopup();
            },  
            error => {  
              console.log('There was an error while creating Farmer !!!' + error);
              this.openSnackBar('Error while creating Farmer, Please contact your adminstrator','');
            });
        }
        else {
          this.farmerService.updateFarmer(this.farmer).subscribe(  
            res => {  
              console.log(res);
              this.openSnackBar('farmer Updated Successfully','');
              this.closePopup();
            },  
            error => {  
              console.log('There was an error while updating farmer !!!' + error);  
              this.openSnackBar('Error while updating farmer, Please contact your adminstrator','');
            });
        }
      }
  }