import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from "@angular/material";
import { FormBuilder, Validators, FormGroup, NgForm } from "@angular/forms";
import { Land } from "../../model/Land";
import { LandService } from "../../services/land.service";
import { Farmer } from "../../model/Farmer";
import { FarmerService } from './../../services/farmer.service';

@Component({
    selector: 'land-dialog',
    templateUrl: './create-land.component.html',
    styleUrls: [ './create-land.component.scss']
  })
  export class LandDialog  implements OnInit {
  
    constructor(
      public dialogRef: MatDialogRef<LandDialog>,
      @Inject(MAT_DIALOG_DATA) public data: Land,
      private fb: FormBuilder,
      private landService: LandService,
      private snackBar : MatSnackBar,
      private farmerService : FarmerService) {
  
        this.landForm= this.fb.group({
          'khasraNumber': [null , Validators.required ],
          'landAmount' : [null ,Validators.required ]
        });
      }
      
      landForm: FormGroup;
      farmerList : Farmer[];
  
      land : Land;
  
      ngOnInit() {

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
  
      submitForm() {
        if(this.land.id==undefined || this.land.id==null) {
          // create new city
          this.landService.createLand(this.land).subscribe(  
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