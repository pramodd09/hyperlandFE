import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { FormBuilder,FormArray, Validators, FormGroup, NgForm } from "@angular/forms";
import { Land } from "../../model/Land";
import { LandService } from "../../services/land.service";
import { Farmer } from "../../model/Farmer";
import { FarmerService } from './../../services/farmer.service';

@Component({
    selector: 'land-dialog',
    templateUrl: './create-land.component.html',
    styleUrls: ['./create-land.component.scss']
  })
  export class LandDialog  implements OnInit {
  
    constructor(
      public dialogRef: MatDialogRef<LandDialog>,
      @Inject(MAT_DIALOG_DATA) public data: Land,
      private fb: FormBuilder,
      private landService: LandService,
      private snackBar : MatSnackBar,
      private farmerService : FarmerService) {
  

      }

      
      landForm: FormGroup;
      farmerList : Farmer[];
      land : Land;
      ngOnInit() {
        this.land = new Land();
        this.landForm= this.fb.group({
          'khasraNumber': [null , Validators.required ],
          'landAmount' : [null ,Validators.required ],
          farmers : this.fb.array([])
        });
        this.farmerService.getAllFarmers().subscribe(
          res => {
            this.farmerList = res.result;
          },  
          error => {  
            console.log('There was an error while retrieving Albums !!!' + error);  
          }
        );



        if(this.data!=null || this.data!==undefined)
        {
          this.land = new Land();
          this.land = this.data;
        }
        else{
          this.land = new Land();
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
get farmerForm() {
   return this.landForm.get('farmers') as FormArray
}
  addNewFarmer(){

    const farmer = this.landForm.get('farmers') as FormArray;
    console.dir(farmer);
    farmer.push(this.fb.group({
        'farmerName':[null],
        'panNumber':[null],
        'adhaarNo':[null]

  }));

 }
      submitForm() {
        var landDetails = this.landForm.value;
        if(landDetails.id==undefined || landDetails.id==null) {
          // create new city
          this.landService.createLand(landDetails).subscribe(
            res => {  
              console.log(res);
              this.openSnackBar('land Created Successfully','');
              this.closePopup();
            },  
            error => {  
              console.log('There was an error while creating land !!!' + error);
              this.openSnackBar('Error while creating land, Please contact your adminstrator','');
            });
        }
        else {
          this.landService.updateLand(this.land).subscribe(  
            res => {  
              console.log(res);
              this.openSnackBar('land Updated Successfully','');
              this.closePopup();
            },  
            error => {  
              console.log('There was an error while updating land !!!' + error);  
              this.openSnackBar('Error while updating land, Please contact your adminstrator','');
            });
        }
      }
  }
